import {createEffect, createEvent, createStore, forward, sample} from 'effector'
import {
  adminChangeSubjectActivity,
  adminChangeThemeActivity,
  adminDeleteQuestion,
  adminDeleteSubject,
  adminDeleteTest,
  adminDeleteTheme,
  getAdminTestsList,
} from 'src/api'
import type {AdminSubject} from 'src/types'
import {enqueueAlert} from 'src/shared/ui/Alerts'

// idk why it's called Test, clearly it is Subjects
export const fetchAdminTestListFx = createEffect<void, AdminSubject[]>(async () => {
  // but to be consistent with BE, will call it here as tests
  const res = await (await getAdminTestsList()).json()
  return res
})

const changeSubjectVisibilityFx = createEffect(async (id: number) => {
  const res = await (await adminChangeSubjectActivity({SubjId: id})).json()

  enqueueAlert({message: 'Видимость дисциплины успешно изменена'})
  return res
})
const changeThemeVisibilityFx = createEffect(async (id: number) => {
  const res = await (await adminChangeThemeActivity({ThemeId: id})).json()

  enqueueAlert({message: 'Видимость темы успешно изменена'})
  return res
})

const deleteSubjectFx = createEffect(async (id: number) => {
  if (!confirm('Подтвердите удаление дисциплины')) return
  const res = await (await adminDeleteSubject({SubjId: id})).json()
  enqueueAlert({message: 'Дисциплина успешно удалена'})
  return res
})

const deleteThemeFx = createEffect(async (id: number) => {
  if (!confirm('Подтвердите удаление темы')) return
  const res = await (await adminDeleteTheme({ThemeId: id})).json()
  enqueueAlert({message: 'Тема успешно удалена'})
  return res
})

const deleteTestFx = createEffect(async (id: number) => {
  if (!confirm('Подтвердите удаление теста')) return
  const res = await (await adminDeleteTest({TestId: id})).json()
  enqueueAlert({message: 'Тест успешно удалена'})
  return res
})

export const changeSubjectVisibilityClicked = createEvent<number>()
export const changeThemeVisibilityClicked = createEvent<number>()
export const deleteSubjectClicked = createEvent<number>()
export const deleteThemeClicked = createEvent<number>()
export const deleteTestClicked = createEvent<number>()

export const $subjectsList = createStore<AdminSubject[]>([])
export const $listLoading = fetchAdminTestListFx.pending

$subjectsList.on(fetchAdminTestListFx.doneData, (_, list) => list)

sample({
  clock: changeSubjectVisibilityClicked,
  filter: (id) => Boolean(id),
  target: changeSubjectVisibilityFx,
})
sample({
  clock: changeThemeVisibilityClicked,
  filter: (id) => Boolean(id),
  target: changeThemeVisibilityFx,
})
sample({
  clock: deleteSubjectClicked,
  filter: (id) => Boolean(id),
  target: deleteSubjectFx,
})
sample({
  clock: deleteThemeClicked,
  filter: (id) => Boolean(id),
  target: deleteThemeFx,
})
sample({
  clock: deleteTestClicked,
  filter: (id) => Boolean(id),
  target: deleteTestFx,
})

forward({
  from: [
    changeSubjectVisibilityFx.doneData,
    deleteSubjectFx.doneData,
    changeThemeVisibilityFx.doneData,
    deleteThemeFx.doneData,
    deleteTestFx.doneData,
  ],
  to: fetchAdminTestListFx,
})
