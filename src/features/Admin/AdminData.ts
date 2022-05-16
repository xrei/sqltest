import {createEffect} from 'effector'
import {GroupModel} from 'src/entities/Group'
import {SubjectsModel} from 'src/entities/Subject'

export const fetchAdminDataFx = createEffect(async () => {
  GroupModel.fetchAdminGroupsFx()
  SubjectsModel.fetchSubjectsFx()
  return
})
