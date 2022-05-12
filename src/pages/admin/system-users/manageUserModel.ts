import {ChangeEvent} from 'react'
import {SelectChangeEvent} from '@mui/material/Select'
import {createEffect, createEvent, createStore, sample} from 'effector'
import {SystemUser, SystemUserDto} from 'src/types'
import {postAddSystemUser, postEditSystemUser} from 'src/api'
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

export const isEditingToggled = createEvent()
export const dialogToggled = createEvent()
export const editUserClicked = createEvent<SystemUser>()
export const addUserClicked = createEvent()
export const actualEditUserClicked = createEvent()
export const formResetted = createEvent()

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
$userDto.on(editUserClicked, (state, user) => user)

$manageDialog.on(dialogToggled, (open) => !open)
$isEditing.on(isEditingToggled, (s) => !s)

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

export const editUserFx = createEffect<
  {groupIds: number[]; subjectIds: number[]; user: SystemUserDto},
  string
>(async (params) => {
  const groups = params.groupIds.map((id) => ({register: true, GroupValue: id}))
  const subjects = params.subjectIds.map((id) => ({UserId: true, SubjectId: id}))

  const res = await (await postEditSystemUser({user: params.user, groups, subjects})).json()

  enqueueAlert({
    message: `Пользователь ${params.user.login} успешно отредактирован!`,
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
  clock: editUserClicked,
  filter: (user) => Boolean(user.id),
  target: [dialogToggled, isEditingToggled],
})

sample({
  source: {user: $userDto, groups: $userGroups, subjects: $userSubjects},
  clock: addUserClicked,
  filter: $allFieldsFilled,
  fn: ({user, groups, subjects}) => ({user, groupIds: groups, subjectIds: subjects}),
  target: createUserFx,
})

sample({
  source: {user: $userDto, groups: $userGroups, subjects: $userSubjects},
  clock: actualEditUserClicked,
  filter: $allFieldsFilled,
  fn: ({user, groups, subjects}) => ({user, groupIds: groups, subjectIds: subjects}),
  target: editUserFx,
})

sample({
  clock: [createUserFx.done, editUserFx.doneData],
  target: dialogToggled,
})

$userDto.reset([createUserFx.done, formResetted])
$userGroups.reset([createUserFx.done, formResetted])
$userSubjects.reset([createUserFx.done, formResetted])

$manageDialog.watch((state) => {
  if (!state) {
    formResetted()
  }
})

function isFilled(s?: string) {
  return typeof s === 'string' && s.length > 0
}
