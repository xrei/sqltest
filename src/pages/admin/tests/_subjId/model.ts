import {combine, sample} from 'effector'
import {createGate} from 'effector-react'
import {AdminSubjectsModel} from 'src/features/AdminSubjects'

export const AdminSubjectIdPageGate = createGate<{SubjId: number | string}>()

sample({
  clock: AdminSubjectIdPageGate.open,
  filter: ({SubjId}) => Number.isInteger(SubjId),
  target: AdminSubjectsModel.fetchAdminTestListFx,
})

export const $subject = combine(
  AdminSubjectsModel.$subjectsList,
  AdminSubjectIdPageGate.state,
  (list, gateState) => list.find((v) => v.SubjId === Number(gateState.SubjId))
)
export const $themes = $subject.map((subj) => subj?.ThemesList || [])

$subject.watch((v) => {
  console.log(v)
})
