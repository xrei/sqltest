import {createEffect, sample, createEvent, restore} from 'effector'
import {createGate} from 'effector-react'
import {
  adminGetQuestionsByTheme,
  adminDeleteQuestion,
  adminGetQuestionsWithWrongAnswers,
  adminGetQuestionsWithWrongAnswersMongoDB,
} from 'src/api'
import {enqueueAlert} from 'src/shared/ui/Alerts'

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

export const checkWrongSqlQuestionsFx = createEffect(async (ThemeId: number) => {
  try {
    const res = await (await adminGetQuestionsWithWrongAnswers({ThemeId})).json()
    if (Array.isArray(res)) {
      return res
    }
  } catch (e) {
    //
  }

  enqueueAlert({message: 'Все задания корректны!'})
  return true
})

export const checkWrongMongoQuestionsFx = createEffect(async (ThemeId: number) => {
  const res = await (await adminGetQuestionsWithWrongAnswersMongoDB({ThemeId})).json()

  if (Array.isArray(res) && Boolean(res.length)) {
    return res
  }

  enqueueAlert({message: 'Все задания корректны!'})
  return true
})

export const $isLoading = fetchQuestionsFx.pending
export const $questions = restore(fetchQuestionsFx.doneData, [])
export const $themeName = $questions.map((xs) => xs[0]?.ThemeName || '')

export const $wrongSqlQuestions = restore(checkWrongSqlQuestionsFx.doneData, null)
export const $wrongMongoQuestions = restore(checkWrongMongoQuestionsFx.doneData, null)

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

$questions.reset([AdminQsnByThemePageGate.close])
$wrongSqlQuestions.reset([AdminQsnByThemePageGate.close])
$wrongMongoQuestions.reset([AdminQsnByThemePageGate.close])
