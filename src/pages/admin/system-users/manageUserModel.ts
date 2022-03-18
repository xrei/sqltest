import {ChangeEvent} from 'react'
import {SelectChangeEvent} from '@mui/material/Select'
import {createEffect, createEvent, createStore, sample} from 'effector'
import type {SystemUserDto} from 'src/types'
import {postAddSystemUser} from 'src/api'
import {enqueueAlert} from 'src/features/Alerts'

export const $manageDialog = createStore(false)
export const $isEditing = createStore(false)

export const $userDto = createStore<SystemUserDto>({
  user_name: '',
  login: '',
  password: '',
  repeat_password: '',
  role: 0,
})
export const $isSamePassword = $userDto.map((u) => u.password === u.repeat_password)
export const $availableGroupsShown = $userDto.map((u) => u.role === 0 || u.role === 1)
export const $availableSubjectsShown = $userDto.map((u) => u.role === 1)

// only ids (GroupValue)
export const $userGroups = createStore<number[]>([])
export const $userSubjects = createStore<number[]>([])

export const dialogToggled = createEvent()
export const editUserClicked = createEvent()
export const addUserClicked = createEvent()

export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const loginChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const pwdChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const repPwdChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const roleChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const groupSelected = createEvent<SelectChangeEvent<number[]>>()
export const subjectSelected = createEvent<SelectChangeEvent<number[]>>()

// fukin bullshit
$userGroups.on(groupSelected, (state, e) => e.target.value as unknown as number[])
$userSubjects.on(subjectSelected, (state, e) => e.target.value as unknown as number[])

$userDto.on(nameChanged, (state, e) => ({...state, user_name: e.target.value}))
$userDto.on(loginChanged, (state, e) => ({...state, login: e.target.value}))
$userDto.on(pwdChanged, (state, e) => ({...state, password: e.target.value}))
$userDto.on(repPwdChanged, (state, e) => ({...state, repeat_password: e.target.value}))
$userDto.on(roleChanged, (state, e) => ({...state, role: Number(e.target.value)}))

$manageDialog.on(dialogToggled, (open) => !open)

export const createUserFx = createEffect<
  {groupIds: number[]; subjectIds: number[]; user: SystemUserDto},
  string
>(async (params) => {
  const groups = params.groupIds.map((id) => ({register: true, GroupValue: id}))
  const subjects = params.subjectIds.map((id) => ({UserId: true, SubjectId: id}))

  const res = await (await postAddSystemUser({user: params.user, groups, subjects})).json()

  enqueueAlert({
    message: `Новый пользователь ${params.user.login} успешно создан!`,
  })
  return res
})

export const $allFieldsFilled = $userDto.map((u) => {
  return (
    isFilled(u.login) &&
    isFilled(u.user_name) &&
    isFilled(u.password) &&
    isFilled(u.repeat_password)
  )
})

sample({
  source: {user: $userDto, groups: $userGroups, subjects: $userSubjects},
  clock: addUserClicked,
  filter: $allFieldsFilled,
  fn: ({user, groups, subjects}) => ({user, groupIds: groups, subjectIds: subjects}),
  target: createUserFx,
})

sample({
  clock: createUserFx.done,
  target: dialogToggled,
})

$userDto.reset([createUserFx.done])
$userGroups.reset([createUserFx.done])
$userSubjects.reset([createUserFx.done])

function isFilled(s?: string) {
  return typeof s === 'string' && s.length > 0
}
