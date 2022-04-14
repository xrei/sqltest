import {attach, combine, createEffect, createEvent, createStore, forward, sample} from 'effector'
import {getTestContent, saveTestResult} from 'src/api'
import {reset} from 'src/lib/reset'
import {Test, Theme, Question} from 'src/types'
import {history} from 'src/router/history'
import {routesPaths} from 'src/router/paths'
import type {
  TestResultStore,
  ChangeAnswerGenericPayload,
  ChangeAnswerCheckboxPayload,
} from './types'
import {mapCheckboxAnswer, mapAnswer} from './helpers'
import {createCountdown} from './timer'

const startTimer = createEvent<number>()
const abortTimer = createEvent()
const timer = createCountdown('TestTimer', {start: startTimer, abort: abortTimer, timeout: 1000})

//#region Stores
export const $testResults = createStore<TestResultStore | null>(null)
export const $resultTaskWithErrors = $testResults.map((test) => {
  if (test && test.testResult) {
    // [[id, question]]
    return test.testResult.ErrorQsn.map((val) => val.split('-').map((v) => v.trim()))
  }
  return null
})
export const $currentTheme = createStore<Theme | null>(null)
export const $test = createStore<Test | null>(null)
export const $hasTestAndTheme = combine(
  [$currentTheme, $test],
  ([theme, test]) => Boolean(theme) && Boolean(test)
)

export const $currentQestionId = createStore<number>(0)
const defaultQsn: Question = {
  Answers: [],
  Category: 0,
  Content: '',
  DatabaseId: 0,
  Difficulty: 0,
  Id: 0,
  NumInTest: 0,
  Type: 0,
  UserAnswer: null,
  ThemeName: null,
}
export const $currQuestion = combine(
  $test,
  $currentQestionId,
  (test, qsnId) => test?.Questions.find((t) => t.Id === qsnId) || defaultQsn
)
export const $isQuestionForEditor = $currQuestion.map((q: Question) =>
  // these nums is Question types for editor
  // check Question type for reference
  [4, 5, 6, 7, 8].some((v) => v === q.Type)
)
//#endregion

export const $timeFormatted = createStore('')
export const $ticks = createStore(0)
$ticks.on(timer.tick, (_, tick) => tick)

const timeTickFx = createEffect<number, string>((tick) => {
  // if more than hour
  if (tick >= 3600) {
    return new Date(tick * 1000).toISOString().slice(11, 19)
  } else {
    return new Date(tick * 1000).toISOString().slice(14, 19)
  }
})

$timeFormatted.on(timeTickFx.doneData, (_, time) => time)
$timeFormatted.on(abortTimer, () => '')

sample({
  clock: timer.tick,
  filter: (tick) => tick >= 0,
  target: timeTickFx,
})

//#region Events
export const setCurrentTheme = createEvent<Theme>()
export const resetCurrentTest = createEvent()
export const changeCurrentQuestionId = createEvent<number>()
export const setTestResults = createEvent<TestResultStore>()
export const changeTypeGenericAnswer = createEvent<ChangeAnswerGenericPayload>()
export const changeTypeCheckboxAnswer = createEvent<ChangeAnswerCheckboxPayload>()
//#endregion

export const fetchTestContentFx = createEffect<Theme, Test>(async (theme) => {
  const res = await (await getTestContent(theme)).json()

  // initially set first question in test
  changeCurrentQuestionId(res.Questions[0].Id)

  if (res.TestTimeFromDB > 0) {
    const ticks = res.TestTimeFromDB * 60
    startTimer(ticks)
  }

  return res
})

export const finishTestFx = attach({
  source: [$test, $currentTheme],
  async effect([test, theme]) {
    if (!test || !theme) {
      throw Error('test is null')
    }

    const res = await (await saveTestResult(test)).json()
    console.log('test result: ', res)
    // stop timer
    abortTimer()

    history.push(routesPaths.tasksResult)

    return {
      testResult: res,
      completedTest: test,
      completedTheme: theme,
    }
  },
})

//#region On handlers
$currentTheme.on(setCurrentTheme, (_, theme) => theme)
$currentQestionId.on(changeCurrentQuestionId, (_, qsnId) => qsnId)
$testResults.on(setTestResults, (_, p) => p)

$test.on(changeTypeGenericAnswer, (test, payload) => {
  if (!test) return null
  return mapAnswer(test, payload)
})

$test.on(changeTypeCheckboxAnswer, (test, payload) => {
  if (!test) return null
  return mapCheckboxAnswer(test, payload)
})

$test.on(fetchTestContentFx.doneData, (_, test) => test)

export const changeTypeEditorAnswer = attach({
  source: $currentQestionId,
  effect(qsnId, value: string) {
    return {qId: qsnId, value}
  },
})
$test.on(changeTypeEditorAnswer.doneData, (test, payload) => {
  if (!test) return null
  return mapAnswer(test, payload)
})

export const startTestAgainFx = attach({
  source: $testResults,
  async effect(tr) {
    const theme = tr?.completedTheme
    if (!theme) return false

    setCurrentTheme(theme)
    await fetchTestContentFx(theme)

    return theme
  },
})

// if time ran out, end test
forward({
  from: timer.finished,
  to: finishTestFx,
})

forward({
  from: finishTestFx.doneData,
  to: setTestResults,
})

forward({
  from: finishTestFx.doneData,
  to: resetCurrentTest,
})

//#region Resets
$testResults.reset(fetchTestContentFx.doneData)

reset({
  stores: [$test, $currentTheme, $currentQestionId],
  trigger: resetCurrentTest,
})

//#endregion

// $test.watch((t) => {
//   console.log('test:', t)
// })
// $currQuestion.watch((qsn) => {
//   console.log('curr qsn:', qsn)
// })
// setTestResults.watch((v) => {
//   console.log(v)
// })
