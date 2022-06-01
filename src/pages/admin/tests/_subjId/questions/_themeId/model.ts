import {createEffect, createStore, sample, createEvent} from 'effector'
import {createGate} from 'effector-react'
import {adminGetQuestionsByTheme, adminDeleteQuestion} from 'src/api'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import type {Question} from 'src/types'

export const AdminQsnByThemePageGate = createGate<{themeId: number}>()

export const deleteTaskByIdFx = createEffect(async (id: number) => {
  if (!confirm(`Подтвердите удаление задания № ${id}`)) return
  const res = await (await adminDeleteQuestion({Id: id})).json()

  enqueueAlert({message: `Задание № ${id} успешно удалено`})
  return res
})
export const deleteTaskClicked = createEvent<number>()

const fetchQuestionsFx = createEffect(async (id: number) => {
  const res = await (await adminGetQuestionsByTheme({ThemeId: id})).json()
  return res
})

export const $isLoading = fetchQuestionsFx.pending
export const $questions = createStore<Question[]>([])
export const $themeName = $questions.map((xs) => xs[1]?.ThemeName || '')

$questions.on(fetchQuestionsFx.doneData, (_, data) => data)

sample({
  clock: AdminQsnByThemePageGate.open,
  filter: ({themeId}) => Number.isInteger(themeId),
  fn: ({themeId}) => themeId,
  target: fetchQuestionsFx,
})

sample({
  clock: deleteTaskClicked,
  filter: (id) => Boolean(id),
  target: deleteTaskByIdFx,
})

sample({
  clock: deleteTaskByIdFx.doneData,
  source: AdminQsnByThemePageGate.state,
  filter: ({themeId}) => Number.isInteger(themeId),
  fn: ({themeId}) => themeId,
  target: fetchQuestionsFx,
})
