import {attach, createEffect, createEvent, createStore, forward} from 'effector'
import {getDBContent} from 'src/api'
import {DBTableContent} from 'src/types'
import * as TestContentModel from '../../model'

export const $dbContent = createStore<DBTableContent[]>([])
export const $isOpen = createStore(false)

export const toggle = createEvent()

$isOpen.on(toggle, (s) => !s)

const fetchDBContent = createEffect<number, DBTableContent[]>(async (id) => {
  const res = await (await getDBContent({Id: id})).json()

  return res
})

// get db content with current question
export const fetchDBContentFx = attach({
  source: TestContentModel.$currentQestionId,
  effect: fetchDBContent,
})

$dbContent.on(fetchDBContentFx.doneData, (_, p) => p)

// open dialog after data is successfully loaded
forward({
  from: fetchDBContentFx.doneData,
  to: toggle,
})

$dbContent.reset([TestContentModel.finishTestFx.doneData])
$isOpen.reset([TestContentModel.finishTestFx.doneData])
