import {createEffect, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {
  getQueryPresets,
  postAddQueryPreset,
  postDeleteQueryPreset,
  postExecQueryPresets,
} from 'src/api'
import {DBTableContent, QueryPreset} from 'src/types'
import type {ChangeEvent} from 'react'

export const SystemQueryPageGate = createGate()

export const $systemQueries = createStore<QueryPreset[]>([])
export const $executedQuery = createStore<DBTableContent[]>([])
export const $resultDialogOpen = createStore(false)
export const $queryDto = createStore<QueryPreset>({Name: '', Query: ''})

export const $saveBtnInactive = $queryDto.map((qp) => !qp.Name && !qp.Query)

export const dialogToggled = createEvent()
export const queryExecuted = createEvent<QueryPreset>()
const resetExecQuery = createEvent()
const resetQueryDto = createEvent()
export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const QueryChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const saveQueryPresetClicked = createEvent()
export const editQueryPresetClicked = createEvent<QueryPreset>()
export const deleteQueryPresetClicked = createEvent<QueryPreset>()

$queryDto.on(nameChanged, (state, e) => ({...state, Name: e.target.value}))
$queryDto.on(QueryChanged, (state, e) => ({...state, Query: e.target.value}))
$queryDto.on(editQueryPresetClicked, (state, qp) => qp)

$resultDialogOpen.on(dialogToggled, (s) => !s)

const fetchSystemQueriesFx = createEffect(async () => {
  const res = await (await getQueryPresets()).json()
  return res
})
$systemQueries.on(fetchSystemQueriesFx.doneData, (_, p) => p)

const executeQueryFx = createEffect<QueryPreset, DBTableContent[]>(async (params) => {
  const res = await (await postExecQueryPresets(params)).json()
  return res
})

$executedQuery.on(executeQueryFx.doneData, (_, p) => p)

const saveQueryPresetFx = createEffect<QueryPreset, string>(async (qp) => {
  const res = await (await postAddQueryPreset(qp)).json()
  return res
})

const deleteQueryPresetFx = createEffect<QueryPreset, string>(async (qp) => {
  const res = await (await postDeleteQueryPreset(qp)).json()
  return res
})

sample({
  source: $queryDto,
  clock: saveQueryPresetClicked,
  filter: (qp) => Boolean(qp.Name) && Boolean(qp.Query),
  target: saveQueryPresetFx,
})
sample({
  clock: deleteQueryPresetClicked,
  filter: (qp) => Boolean(qp.Name) && Boolean(qp.Query) && Boolean(qp.ID),
  target: deleteQueryPresetFx,
})

forward({
  from: saveQueryPresetFx.doneData,
  to: resetQueryDto,
})

sample({
  clock: queryExecuted,
  filter: (qp) => Boolean(qp.Query),
  target: executeQueryFx,
})

forward({
  from: executeQueryFx.doneData,
  to: dialogToggled,
})

forward({
  from: [SystemQueryPageGate.open, saveQueryPresetFx.doneData, deleteQueryPresetFx.doneData],
  to: fetchSystemQueriesFx,
})

$executedQuery.reset(resetExecQuery)
$queryDto.reset(resetQueryDto)

$resultDialogOpen.watch((v) => {
  if (!v) {
    resetExecQuery()
  }
})

$systemQueries.reset([SystemQueryPageGate.close])
