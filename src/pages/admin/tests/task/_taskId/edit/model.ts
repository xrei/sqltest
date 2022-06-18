import {createEffect, createStore, sample} from 'effector'
import {createGate} from 'effector-react'
import {Question} from 'src/types'
import {adminGetQuestion} from 'src/api'

export const TaskIdPageGate = createGate<{taskId: number}>()

const $task = createStore<Question | null>(null)

const getTaskByIdFx = createEffect(async (id: number) => {
  try {
    const res = await (await adminGetQuestion({QsnId: id})).json()
    console.log(res)

    return res
  } catch (err) {
    console.log(err)
  }
})

sample({
  clock: TaskIdPageGate.open,
  fn: ({taskId}) => taskId,
  target: getTaskByIdFx,
})

$task.on(getTaskByIdFx.doneData, (_, res) => res)
