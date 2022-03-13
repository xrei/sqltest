import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {fetchRegRules} from 'src/features/Auth/registerModel'
import {SubjectsModel} from 'src/features/Test'
import {fetchUser} from 'src/features/User/model'

export const AppGate = createGate()

AppGate.open.watch(() => console.log('init app'))

export const $appLoading = createStore(true)

export const initAppFx = createEffect<void, void>(async () => {
  // wait for user before render
  const user = await fetchUser()

  // rest run in parallel
  if (!user) {
    fetchRegRules()
  }
  SubjectsModel.fetchSubjectsFx()
})

forward({
  from: AppGate.open,
  to: initAppFx,
})

$appLoading.on(initAppFx.doneData, () => false)
$appLoading.on(initAppFx.fail, () => false)

initAppFx.fail.watch(({error}) => {
  console.error('initAppFx  fail, ', error)
})
