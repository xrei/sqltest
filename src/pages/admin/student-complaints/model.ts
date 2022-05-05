import {createEffect, createEvent, createStore, sample} from 'effector'
import {ChangeEvent} from 'react'
import {getTaskErrors} from 'src/api'
import {DBTableContent} from 'src/types'

export const $complaintsData = createStore<DBTableContent[]>([])

export const $date = createStore('')
export const dateChanged = createEvent<ChangeEvent<HTMLInputElement>>()
$date.on(dateChanged, (_, e) => e.target.value)

export const getComplaintsFx = createEffect(async (date: string) => {
  console.log(date)
  const res = await (await getTaskErrors({Query: date})).json()
  console.log(res)
  return res
})

$complaintsData.on(getComplaintsFx.doneData, (_, data) => data)

getComplaintsFx.failData.watch(console.log)

export const viewBtnClicked = createEvent()

sample({
  clock: viewBtnClicked,
  source: $date,
  filter: (date) => Boolean(date),
  target: getComplaintsFx,
})
