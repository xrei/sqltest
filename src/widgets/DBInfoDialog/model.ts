import {createEffect, createEvent, createStore, sample} from 'effector'
import {getDBInfos} from 'src/api'
import type {DBInfo} from 'src/types'

export const $dbInfosList = createStore<DBInfo[]>([])

export const fetchDbInfo = createEffect<void, DBInfo[]>(async () => {
  const res = await (await getDBInfos()).json()

  return res
})

$dbInfosList.on(fetchDbInfo.doneData, (_, list) => list)

export const $isOpen = createStore(false)
export const toggleDialog = createEvent()

$isOpen.on(toggleDialog, (s) => !s)

// load data if it is not already loaded, otherwise no
sample({
  clock: toggleDialog,
  source: $dbInfosList,
  target: fetchDbInfo,
})
