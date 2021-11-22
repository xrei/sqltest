import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {fetchUser} from 'src/features/User/model'

export const AppGate = createGate()

AppGate.open.watch(() => console.log('init app'))

export const $appLoading = createStore(true)

export const initAppFx = createEffect<void, void>(async () => {
  await fetchUser()
})

forward({
  from: AppGate.open,
  to: initAppFx,
})

$appLoading.on(initAppFx.doneData, () => false)
