import {createEffect, createStore, forward, combine} from 'effector'
import {getGroupList} from 'src/api'
import {StudentGroup} from 'src/types'
import {$user, fetchUser} from '../model'

export const $studGroups = createStore<StudentGroup[]>([])
export const $currentGroup = combine($user, $studGroups, (u, groups) =>
  groups.find((v) => v.GroupValue === u?.Group)
)

export const fetchGroupsFx = createEffect<void, StudentGroup[]>(async () => {
  const res = await (await getGroupList()).json()
  return res
})

$studGroups.on(fetchGroupsFx.doneData, (_, p) => p)

forward({
  from: fetchUser.done,
  to: fetchGroupsFx,
})
