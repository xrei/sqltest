import {createEffect, createEvent, createStore, sample} from 'effector'
import {adminGetQsnStats} from 'src/api'
import type {QuestionStats} from 'src/types'

export const $qsnStats = createStore<QuestionStats | null>(null)
export const $statsIsEmpty = $qsnStats.map((v) => v === null)
export const $dialogOpen = createStore(false)
export const openStatisticsDialog = createEvent<number>()
export const closeStatisticsDialog = createEvent()

const fetchQsnStatsFx = createEffect(async (id: number) => {
  const res = await (await adminGetQsnStats({Id: id})).json()

  return res
})

$qsnStats.on(fetchQsnStatsFx.doneData, (_, stats) => stats)
$dialogOpen.on(openStatisticsDialog, () => true)
$dialogOpen.on(closeStatisticsDialog, () => false)

sample({
  clock: openStatisticsDialog,
  filter: (id) => Boolean(id),
  target: fetchQsnStatsFx,
})

$qsnStats.reset([closeStatisticsDialog])
