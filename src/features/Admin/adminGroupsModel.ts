import {createStore, createEffect, sample} from 'effector'
import {getAdminGroups} from 'src/api'
import {StudentGroup} from 'src/types'
import {UserModel} from '../User'

export const $adminGroups = createStore<StudentGroup[]>([])

export const fetchGroupsFx = createEffect(async () => {
  const res = await (await getAdminGroups()).json()
  return res
})

$adminGroups.on(fetchGroupsFx.doneData, (_, p) => p)

sample({
  source: UserModel.$user,
  clock: UserModel.fetchUser.done,
  filter: (user) => (user ? user.Role !== 0 : false),
  target: fetchGroupsFx,
})
