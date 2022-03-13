import {createStore, createEffect} from 'effector'
import {getAdminGroups} from 'src/api'
import {StudentGroup} from 'src/types'

export const $adminGroups = createStore<StudentGroup[]>([])

export const fetchGroupsFx = createEffect(async () => {
  const res = await (await getAdminGroups()).json()
  return res
})

$adminGroups.on(fetchGroupsFx.doneData, (_, p) => p)
