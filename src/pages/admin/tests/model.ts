import {sample} from 'effector'
import {createGate} from 'effector-react'
import {SubjectsModel} from 'src/entities/Subject'
import {AdminSubjectsModel} from 'src/features/AdminSubjects'

export const AdminTestsPageGate = createGate()

sample({
  clock: AdminTestsPageGate.open,
  target: [AdminSubjectsModel.fetchAdminTestListFx, SubjectsModel.fetchSubjectsFx],
})
