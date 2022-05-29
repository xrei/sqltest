import {createEffect, createEvent, createStore, sample} from 'effector'
import {getCompleteBasicQuery} from 'src/api'
import type {DBTableContent} from 'src/types'

const fetchReferenceQueryFx = createEffect(async (id: number) => {
  const result = await (await getCompleteBasicQuery({Id: id})).json()
  return result
})

export const $isLoading = fetchReferenceQueryFx.pending
export const $queryResult = createStore<DBTableContent[]>([])
export const $queryDialogOpen = createStore(false)
export const queryDialogOpened = createEvent<number>()
export const queryDialogClosed = createEvent()

$queryDialogOpen.on(queryDialogOpened, () => true)
$queryDialogOpen.on(queryDialogClosed, () => false)

$queryResult.on(fetchReferenceQueryFx.doneData, (_, res) => res)

sample({
  clock: queryDialogOpened,
  filter: (id) => Boolean(id),
  target: fetchReferenceQueryFx,
})

$queryResult.reset([queryDialogClosed])
