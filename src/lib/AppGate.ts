import {createGate} from 'effector-react'

export const AppGate = createGate()

AppGate.open.watch(() => console.log('app open'))
