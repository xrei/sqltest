import {createEffect, createEvent, createStore, sample} from 'effector'
import {adminGetResultForTaskToAdd} from 'src/api'
import type {DBTableContent} from 'src/types'

type Params = {DatabaseId: string; Type: string; UserAnswer: string}

const fetchTaskAnswerQueryFx = createEffect<Params, DBTableContent[]>(async (params) => {
  const result = await (await adminGetResultForTaskToAdd(params)).json()
  return result
})

export const $isLoading = fetchTaskAnswerQueryFx.pending
export const $queryResult = createStore<DBTableContent[]>([])
export const $queryDialogOpen = createStore(false)
export const taskFormQueryDialogOpened = createEvent<Params>()
export const taskFormQueryDialogClosed = createEvent()

$queryDialogOpen.on(taskFormQueryDialogOpened, () => true)
$queryDialogOpen.on(taskFormQueryDialogClosed, () => false)

$queryResult.on(fetchTaskAnswerQueryFx.doneData, (_, res) => res)

sample({
  clock: taskFormQueryDialogOpened,
  filter: (id) => Boolean(id),
  target: fetchTaskAnswerQueryFx,
})

$queryResult.reset([taskFormQueryDialogClosed])
