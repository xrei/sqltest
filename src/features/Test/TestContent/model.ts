import {createStore} from 'effector'
import {Test} from 'src/types'

export const $test = createStore<Test | null>(null)
