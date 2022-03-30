import {createEffect, createEvent, createStore, sample} from 'effector'
import {getDBInfos} from 'src/api'
import type {DBInfo} from 'src/types'

export const $dbInfosList = createStore<DBInfo[]>([])

export const fetchDbInfo = createEffect<void, DBInfo[]>(async () => {
  const res = await getDBInfos()
  const list = await res.json()

  const mapped = list.map((v) => {
    return {
      ...v,
      creation_script: v.creation_script.replaceAll(/style="[^"]*"/g, ''),
    }
  })

  return mapped
})

$dbInfosList.on(fetchDbInfo.doneData, (_, list) => list)

export const $isOpen = createStore(false)
export const toggleDialog = createEvent()

$isOpen.on(toggleDialog, (s) => !s)

// load data if it is not already loaded, otherwise no
sample({
  clock: toggleDialog,
  source: $dbInfosList,
  filter(list) {
    return !list.length
  },
  target: fetchDbInfo,
})
