import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {fetchRegRules} from 'src/features/Auth/registerModel'
import {fetchSubjectsFx} from 'src/features/Subjects/model'
import {fetchUser} from 'src/features/User/model'

export const AppGate = createGate()

AppGate.open.watch(() => console.log('init app'))

export const $appLoading = createStore(true)

export const initAppFx = createEffect<void, void>(async () => {
  // wait for user before render
  await fetchUser()

  // rest run in parallel
  fetchRegRules()
  fetchSubjectsFx()
})

forward({
  from: AppGate.open,
  to: initAppFx,
})

$appLoading.on(initAppFx.doneData, () => false)
