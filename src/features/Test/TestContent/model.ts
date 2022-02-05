import {attach, combine, createEffect, createEvent, createStore} from 'effector'
import {getTestContent} from 'src/api'
import {Test, Theme, Question} from 'src/types'

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
export const $isQuestionForEditor = $currQuestion.map((q) =>
  [4, 5, 6, 7, 8].some((v) => v === q.Type)
)

export const setCurrentTheme = createEvent<Theme>()
export const changeCurrentQuestionId = createEvent<number>()

$currentTheme.on(setCurrentTheme, (_, theme) => theme)
$currentQestionId.on(changeCurrentQuestionId, (_, qsnId) => qsnId)

export const fetchTestContentFx = createEffect<Theme, Test>(async (theme) => {
  const res = await (await getTestContent(theme)).json()
  console.log(res)

  // initially set first question in test
  changeCurrentQuestionId(res.Questions[0].Id)
  return res
})

$test.on(fetchTestContentFx.doneData, (_, test) => test)

$test.watch((t) => {
  console.log(t)
})
$currQuestion.watch((qsn) => {
  console.log(qsn)
})

type ChangeAnswerGenericPayload = {
  qId: number
  value: string
}
export const changeTypeGenericAnswer = createEvent<ChangeAnswerGenericPayload>()
$test.on(changeTypeGenericAnswer, (test, payload) => {
  if (!test) return null
  return {
    ...test,
    Questions: test.Questions.map((q) =>
      q.Id === payload.qId ? {...q, UserAnswer: payload.value} : q
    ),
  }
})

type ChangeAnswerCheckboxPayload = {
  qId: number
  value: boolean
  answId: number
}
export const changeTypeCheckboxAnswer = createEvent<ChangeAnswerCheckboxPayload>()
$test.on(changeTypeCheckboxAnswer, (test, payload) => {
  if (!test) return null

  return {
    ...test,
    Questions: test.Questions.map((q) => {
      if (q.Id === payload.qId) {
        const answs = q.Answers.map((a) =>
          a.Id === payload.answId ? {...a, Correct: payload.value} : a
        )
        return {
          ...q,
          Answers: answs,
          UserAnswer: true,
        }
      } else return q
    }),
  }
})

export const changeTypeEditorAnswer = attach({
  source: $currentQestionId,
  effect(qsnId, value: string) {
    console.log(qsnId)
    console.log(value)
    return {qId: qsnId, value}
  },
})
$test.on(changeTypeEditorAnswer.doneData, (test, payload) => {
  if (!test) return null
  return {
    ...test,
    Questions: test.Questions.map((q) =>
      q.Id === payload.qId ? {...q, UserAnswer: payload.value} : q
    ),
  }
})
