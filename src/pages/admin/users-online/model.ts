import {createEffect, createEvent, createStore, sample} from 'effector'
import {createGate} from 'effector-react'
import {adminDeleteUserOnline, adminGetAllUsersOnline} from 'src/api'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import type {UserOnline} from 'src/types'

export const AdminUsersOnlinePage = createGate()

export const $result = createStore<UserOnline[]>([])

const fetchOnlineUsersFx = createEffect(async () => {
  const res = await (await adminGetAllUsersOnline()).json()
  return res
})

$result.on(fetchOnlineUsersFx.doneData, (_, data) => data)

export const $isLoading = fetchOnlineUsersFx.pending

sample({
  clock: AdminUsersOnlinePage.open,
  target: fetchOnlineUsersFx,
})

export const clearOnlineClicked = createEvent()

const clearOnlineFx = createEffect(async () => {
  const res = await (await adminDeleteUserOnline()).json()

  enqueueAlert({message: 'Таблица успешно очищена'})
  return res
})

sample({
  clock: clearOnlineClicked,
  target: clearOnlineFx,
})
