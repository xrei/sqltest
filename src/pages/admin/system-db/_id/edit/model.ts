import {ChangeEvent} from 'react'
import {createStore, createEvent, createEffect, sample, combine} from 'effector'
import {createGate} from 'effector-react'
import type {EditDbDto} from 'src/types'
import {addDbToEditClicked, $dbs, fetchDatabasesFx} from '../../model'
import {postEditDatabase} from 'src/api'
import {enqueueAlert} from 'src/features/Alerts'

export const SysDbEditPageGate = createGate<{id: number}>()

// load databases if came from direct link to edit page
// that is because there is no api to get just one entity by id..
sample({
  source: $dbs,
  clock: SysDbEditPageGate.open,
  filter: (dbs) => !dbs.length,
  target: fetchDatabasesFx,
})

// Gate remembers our route param
// then after DBs are loaded, find ours
const getDbById = sample({
  source: SysDbEditPageGate.open,
  clock: $dbs,
  fn: ({id}, dbs) => dbs.find((v) => v.id === id),
})

export const $editDbDto = createStore<EditDbDto>({
  id: 0,
  connection_string: '',
  name: '',
  creation_script: '',
  description: '',
})

export const $isDbsLoading = fetchDatabasesFx.pending

export const $nameErr = $editDbDto.map((db) => !db.name)
export const $connStrErr = $editDbDto.map((db) => !db.connection_string)
export const $editDisabled = combine($nameErr, $connStrErr, (a, b) => a || b)

$editDbDto.on(addDbToEditClicked, (_, db) => db)
$editDbDto.on(getDbById, (_, db) => db)

export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const connStrChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const descriptionChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const creationScriptChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const editDbClicked = createEvent()

$editDbDto.on(nameChanged, (state, e) => ({...state, name: e.target.value}))
$editDbDto.on(connStrChanged, (state, e) => ({...state, connection_string: e.target.value}))
$editDbDto.on(descriptionChanged, (state, e) => ({...state, description: e.target.value}))
$editDbDto.on(creationScriptChanged, (state, e) => ({...state, creation_script: e.target.value}))

const editDbFx = createEffect<EditDbDto, string>(async (db) => {
  const res = await (await postEditDatabase(db)).json()

  enqueueAlert({
    message: 'База данных успешно отредактирована',
  })
  return res
})

sample({
  source: $editDbDto,
  clock: editDbClicked,
  filter: (db) => Boolean(db.id) && Boolean(db.connection_string) && Boolean(db.name),
  target: editDbFx,
})

// $editDbDto.reset(editDbFx.doneData)
