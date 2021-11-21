import {forward} from 'effector'
import {createGate} from 'effector-react'
import {fetchUser} from 'src/features/User/model'

export const AppGate = createGate()

AppGate.open.watch(() => console.log('init app'))

forward({
  from: AppGate.open,
  to: fetchUser,
})
