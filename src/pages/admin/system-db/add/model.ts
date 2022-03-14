import {ChangeEvent} from 'react'
import {createStore, createEvent, createEffect, sample, combine} from 'effector'
import {postAddDatabase} from 'src/api'
import type {AddDbDto} from 'src/types'

export const $dbDto = createStore<AddDbDto>({
  connection_string: '',
  name: '',
  creation_script: '',
  description: '',
})

export const $nameErr = $dbDto.map((db) => !db.name)
export const $connStrErr = $dbDto.map((db) => !db.connection_string)
export const $createDisabled = combine($nameErr, $connStrErr, (a, b) => a || b)
export const $createSuccess = createStore(false)

export const createDbClicked = createEvent()
export const createSuccessChanged = createEvent<boolean>()
export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const connStrChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const descriptionChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const creationScriptChanged = createEvent<ChangeEvent<HTMLInputElement>>()

$dbDto.on(nameChanged, (state, e) => ({...state, name: e.target.value}))
$dbDto.on(connStrChanged, (state, e) => ({...state, connection_string: e.target.value}))
$dbDto.on(descriptionChanged, (state, e) => ({...state, description: e.target.value}))
$dbDto.on(creationScriptChanged, (state, e) => ({...state, creation_script: e.target.value}))

const createDbFx = createEffect<AddDbDto, string>(async (db) => {
  const res = await (await postAddDatabase(db)).json()
  return res
})

$createSuccess.on(createDbFx.doneData, () => true)
$createSuccess.on(createSuccessChanged, (s, p) => p)

sample({
  source: $dbDto,
  clock: createDbClicked,
  filter: (db) => Boolean(db.connection_string) && Boolean(db.name),
  target: createDbFx,
})

$dbDto.reset(createDbFx.doneData)
