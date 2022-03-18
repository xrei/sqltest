import {createEffect, createEvent, createStore, sample} from 'effector'
import {createGate} from 'effector-react'
import {getSystemUsers, postDeleteSystemUser} from 'src/api'
import {enqueueAlert} from 'src/features/Alerts'
import type {SystemUsers, SystemUser} from 'src/types'
import {createUserFx} from './manageUserModel'

export const SystemUsersPageGate = createGate()

export const $sysUsers = createStore<SystemUsers>({
  administrators: [],
  groups: [],
  students: [],
  subjects: [],
  teachers: [],
})

export const fetchSystemUsersFx = createEffect<void, SystemUsers>(async () => {
  const res = await (await getSystemUsers()).json()
  return res
})

$sysUsers.on(fetchSystemUsersFx.doneData, (_, data) => data)

export const deleteUserClicked = createEvent<SystemUser>()

const deleteSystemUserFx = createEffect<SystemUser, string>(async (u) => {
  const res = await (await postDeleteSystemUser({user: {id: u.id}})).json()

  enqueueAlert({
    message: `Пользователь ${u.user_name} успешно удален`,
  })
  return res
})

sample({
  clock: deleteUserClicked,
  target: deleteSystemUserFx,
})

sample({
  clock: [SystemUsersPageGate.open, deleteSystemUserFx.done, createUserFx.done],
  target: fetchSystemUsersFx,
})
