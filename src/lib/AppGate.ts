import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {fetchRegRules} from 'src/features/Auth/registerModel'
import {fetchUser} from 'src/features/User/model'

export const AppGate = createGate()

AppGate.open.watch(() => console.log('init app'))

export const $appLoading = createStore(true)

export const initAppFx = createEffect<void, void>(async () => {
  // wait for user before render
  await fetchUser()

  // rest run in parallel
  fetchRegRules()
})

forward({
  from: AppGate.open,
  to: initAppFx,
})

$appLoading.on(initAppFx.doneData, () => false)
