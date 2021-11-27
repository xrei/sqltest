import {createEffect, createStore, guard} from 'effector'
import {getGroupList} from 'src/api'
import {StudentGroup} from 'src/types'
import {$hasUser, $user, fetchUser} from '../model'

export const $studGroups = createStore<StudentGroup[]>([])
export const $currentGroup = $studGroups.map((groups) =>
  groups.find((x) => x.GroupValue === $user.getState()?.Group)
)

$currentGroup.watch(console.log)

export const fetchGroupsFx = createEffect<void, StudentGroup[]>(async () => {
  const res = await (await getGroupList()).json()
  return res
})

$studGroups.on(fetchGroupsFx.doneData, (_, p) => p)

guard({
  clock: fetchUser.done,
  filter: $hasUser,
  target: fetchGroupsFx,
})
