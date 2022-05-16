import {createStore, createEffect} from 'effector'
import type {StudentGroup} from 'src/types'
import {getAdminGroups, getGroupList} from 'src/api'

// Admin groups
export const $adminGroups = createStore<StudentGroup[]>([])

export const fetchAdminGroupsFx = createEffect(async () => {
  const res = await (await getAdminGroups()).json()
  return res
})

$adminGroups.on(fetchAdminGroupsFx.doneData, (_, p) => p)

export const $studGroups = createStore<StudentGroup[]>([])

export const fetchStudentGroupsFx = createEffect<void, StudentGroup[]>(async () => {
  const res = await (await getGroupList()).json()
  return res
})

$studGroups.on(fetchStudentGroupsFx.doneData, (_, p) => p)
