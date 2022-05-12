import {ChangeEvent} from 'react'
import {createStore, createEvent, createEffect, sample, combine} from 'effector'
import {postAddDatabase} from 'src/api'
import type {AddDbDto} from 'src/types'

export const $dbDto = createStore<AddDbDto>({
  connection_string: '',
  name: '',
})
export const $dbDescr = createStore('')
export const $dbCreationScript = createStore('')

export const $nameErr = $dbDto.map((db) => !db.name)
export const $connStrErr = $dbDto.map((db) => !db.connection_string)
export const $createDisabled = combine($nameErr, $connStrErr, (a, b) => a || b)
export const $createSuccess = createStore(false)

export const createDbClicked = createEvent()
export const createSuccessChanged = createEvent<boolean>()
export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const connStrChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const descriptionChanged = createEvent<string>()
export const creationScriptChanged = createEvent<string>()

$dbDto.on(nameChanged, (state, e) => ({...state, name: e.target.value}))
$dbDto.on(connStrChanged, (state, e) => ({...state, connection_string: e.target.value}))
$dbDescr.on(descriptionChanged, (state, e) => e)
$dbCreationScript.on(creationScriptChanged, (state, e) => e)

const createDbFx = createEffect<{db: AddDbDto; description: string; script: string}, string>(
  async ({db, description, script}) => {
    const payload = {
      ...db,
      description,
      creation_script: script,
    }
    const res = await (await postAddDatabase(payload)).json()
    return res
  }
)

$createSuccess.on(createDbFx.doneData, () => true)
$createSuccess.on(createSuccessChanged, (s, p) => p)

sample({
  source: {
    db: $dbDto,
    description: $dbDescr,
    script: $dbCreationScript,
  },
  clock: createDbClicked,
  filter: ({db}) => Boolean(db.connection_string) && Boolean(db.name),
  target: createDbFx,
})

$dbDto.reset(createDbFx.doneData)
