import {sample} from 'effector'
import {createGate} from 'effector-react'
import {AdminSubjectsModel} from 'src/features/AdminSubjects'

export const AdminTestsPageGate = createGate()

sample({
  clock: AdminTestsPageGate.open,
  target: AdminSubjectsModel.fetchAdminTestListFx,
})
