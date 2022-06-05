import {createEffect, createStore} from 'effector'
import {createGate} from 'effector-react'
import {Question} from 'src/types'

export const TaskIdPageGate = createGate<{taskId: number}>()

const $task = createStore<Question | null>(null)

const getTaskByIdFx = createEffect(async (id: number) => {
  // ok
})
