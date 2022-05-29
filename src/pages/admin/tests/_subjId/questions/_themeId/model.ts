import {createEffect, createStore, sample} from 'effector'
import {createGate} from 'effector-react'
import {adminGetQuestionsByTheme} from 'src/api'
import type {Question} from 'src/types'

export const AdminQsnByThemePageGate = createGate<{themeId: number}>()

const fetchQuestionsFx = createEffect(async (id: number) => {
  const res = await (await adminGetQuestionsByTheme({ThemeId: id})).json()
  return res
})

export const $isLoading = fetchQuestionsFx.pending
export const $questions = createStore<Question[]>([])
export const $themeName = $questions.map((xs) => xs[1]?.ThemeName || '')
// export const $subjId = $questions.map((xs) => xs[1]?. || '')

$questions.on(fetchQuestionsFx.doneData, (_, data) => data)

sample({
  clock: AdminQsnByThemePageGate.open,
  filter: ({themeId}) => Number.isInteger(themeId),
  fn: ({themeId}) => themeId,
  target: fetchQuestionsFx,
})
