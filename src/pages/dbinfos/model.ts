import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {getDBInfos} from 'src/api'
import type {DBInfo} from 'src/types'

export const DbInfoPage = createGate('DbInfoPage')
export const $dbInfosList = createStore<DBInfo[]>([])

export const fetchDbInfo = createEffect<void, DBInfo[]>(async () => {
  const res = await getDBInfos()
  const list = await res.json()
  return list
})

$dbInfosList.on(fetchDbInfo.doneData, (_, list) => list)

forward({
  from: DbInfoPage.open,
  to: fetchDbInfo,
})
