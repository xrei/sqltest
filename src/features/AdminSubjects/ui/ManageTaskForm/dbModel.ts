import {createEffect, createStore} from 'effector'
import {getDBInfos} from 'src/api'
import {DBInfo} from 'src/types'

export const $databases = createStore<DBInfo[]>([])

export const fetchDatabasesFx = createEffect(async () => {
  const res = await (await getDBInfos()).json()
  return res
})

$databases.on(fetchDatabasesFx.doneData, (_, res) => res)
