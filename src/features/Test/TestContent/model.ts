import {attach, combine, createEffect, createEvent, createStore, forward} from 'effector'
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

//#region Stores
export const $testResults = createStore<TestResultStore | null>(null)
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

$test.watch((t) => {
  console.log('test:', t)
})
$currQuestion.watch((qsn) => {
  console.log('curr qsn:', qsn)
})
setTestResults.watch((v) => {
  console.log(v)
})
