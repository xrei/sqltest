import {combine, createEffect, createEvent, createStore} from 'effector'
import {getTestContent} from 'src/api'
import {Test, Theme, Question} from 'src/types'

export const $currentTheme = createStore<Theme | null>(null)
export const $test = createStore<Test | null>(null)
export const $hasTestAndTheme = combine(
  [$currentTheme, $test],
  ([theme, test]) => Boolean(theme) && Boolean(test)
)

export const $currentQestionId = createStore<number>(0)
export const $currQuestion = combine(
  $test,
  $currentQestionId,
  (test, qsnId) => test?.Questions.find((t) => t.Id === qsnId) || {Content: '', Type: 0}
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
