import {ChangeEvent} from 'react'
import {createEffect, createEvent, createStore, sample} from 'effector'
import type {DBTableContent} from 'src/types'
import {getTaskErrors} from 'src/api'

export const $complaintsData = createStore<DBTableContent[]>([])
export const $date = createStore('')

export const dateChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const viewBtnClicked = createEvent()

export const getComplaintsFx = createEffect(async (date: string) => {
  const res = await (await getTaskErrors({Query: date})).json()
  return res
})

$date.on(dateChanged, (_, e) => e.target.value)

$complaintsData.on(getComplaintsFx.doneData, (_, data) => data)

sample({
  clock: viewBtnClicked,
  source: $date,
  filter: (date) => Boolean(date),
  target: getComplaintsFx,
})
