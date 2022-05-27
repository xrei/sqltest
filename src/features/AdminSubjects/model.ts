import {createEffect, createStore} from 'effector'
import {getAdminTestsList} from 'src/api'
import type {AdminSubject} from 'src/types'

// idk why it's called Test, clearly it is Subjects
const fetchAdminTestListFx = createEffect<void, AdminSubject[]>(async () => {
  // but to be consistent with BE, will call it here as tests
  const res = await (await getAdminTestsList()).json()
  return res
})

export const $subjectsList = createStore<AdminSubject[]>([])
export const $listLoading = fetchAdminTestListFx.pending

$subjectsList.on(fetchAdminTestListFx.doneData, (_, list) => list)
