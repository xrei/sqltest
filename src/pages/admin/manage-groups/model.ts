import {createEffect, createStore, createEvent, sample, forward} from 'effector'
import type {ChangeEvent} from 'react'
import {createGate} from 'effector-react'
import {postAddGroup, postDeleteGroup, postEditGroup} from 'src/api'
import {StudentGroup, NewGroupDto} from 'src/types'
import {AdminGroupsModel} from 'src/features/User/Admin'

export const AdminGroupsPageGate = createGate()

export const $groupDto = createStore<NewGroupDto>({GroupNumber: '', register: false})
export const $isEdit = $groupDto.map((group) => Boolean(group.GroupValue))

export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const autoRegChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const addGroupClicked = createEvent()
export const deleteGroupClicked = createEvent<StudentGroup>()
export const editGroupClicked = createEvent()
export const addGroupToEditClicked = createEvent<StudentGroup>()
export const resetNewGroup = createEvent()

$groupDto.on(addGroupToEditClicked, (state, group) => group)
$groupDto.on(nameChanged, (state, e) => ({...state, GroupNumber: e.target.value}))
$groupDto.on(autoRegChanged, (state, e) => ({...state, register: e.target.checked}))

const saveGroupFx = createEffect<NewGroupDto, string>(async (params) => {
  const res = await (await postAddGroup(params)).json()
  return res
})

const deleteGroupFx = createEffect<StudentGroup, string>(async (group) => {
  const res = await (await postDeleteGroup({GroupValue: group.GroupValue})).json()
  return res
})

const editGroupFx = createEffect<NewGroupDto, string>(async (params) => {
  const res = await (await postEditGroup(params)).json()
  return res
})

$groupDto.reset(resetNewGroup)

sample({
  source: $groupDto,
  clock: addGroupClicked,
  filter: (params) => Boolean(params.GroupNumber),
  target: saveGroupFx,
})

sample({
  clock: deleteGroupClicked,
  filter: (group) => Boolean(group.GroupValue),
  target: deleteGroupFx,
})

sample({
  source: $groupDto,
  clock: editGroupClicked,
  filter: (group) => Boolean(group.GroupValue) && Boolean(group.GroupNumber),
  target: editGroupFx,
})

forward({
  from: [saveGroupFx.doneData, editGroupFx.doneData],
  to: resetNewGroup,
})

forward({
  from: [
    saveGroupFx.doneData,
    AdminGroupsPageGate.open,
    deleteGroupFx.doneData,
    editGroupFx.doneData,
  ],
  to: AdminGroupsModel.fetchGroupsFx,
})
