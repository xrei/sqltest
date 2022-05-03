import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {getSystemInfos} from 'src/api'
import {SystemInfo} from 'src/types'

export const SystemInfosGate = createGate()

export const $systemInfos = createStore<SystemInfo[]>([])

export const fetchSystemInfos = createEffect(async () => {
  const res = await (await getSystemInfos()).json()
  return res
})

$systemInfos.on(fetchSystemInfos.doneData, (_, p) => p)

forward({
  from: SystemInfosGate.open,
  to: fetchSystemInfos,
})
