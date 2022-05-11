import {createEffect} from 'effector'
import {SubjectsModel} from 'src/features/Test'
import {AdminGroupsModel} from '.'

export const fetchAdminDataFx = createEffect(async () => {
  AdminGroupsModel.fetchGroupsFx()
  SubjectsModel.fetchSubjectsFx()
  return
})
