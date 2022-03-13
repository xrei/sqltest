import {createEffect, createEvent, createStore, sample} from 'effector'
import {createGate} from 'effector-react'
import {getAdminDBContent, getDBInfos, postDeleteDatabase} from 'src/api'
import {AddDbDto, DBInfo, DBTableContent} from 'src/types'

export const SystemDbPageGate = createGate()

type DbContentState = {
  name: string
  tables: DBTableContent[]
}

export const $dbs = createStore<DBInfo[]>([])
export const $dbContent = createStore<DbContentState>({name: '', tables: []})
export const $dbContentDialog = createStore(false)

export const $dbDto = createStore<AddDbDto>({
  connection_string: '',
  name: '',
  creation_script: '',
  description: '',
})

export const addDbToEditClicked = createEvent<DBInfo>()
export const deleteDbClicked = createEvent<DBInfo>()
export const openDbContentClicked = createEvent<DBInfo>()
export const dialogToggled = createEvent()

const fetchDatabasesFx = createEffect(async () => {
  const res = await (await getDBInfos()).json()
  return res
})

const deleteDatabaseFx = createEffect<DBInfo, string>(async (db) => {
  const res = await (await postDeleteDatabase({id: db.id})).json()
  return res
})

const fetchAdminDbContentFx = createEffect<DBInfo, DbContentState>(async (db) => {
  const res = await (await getAdminDBContent({id: db.id})).json()
  return {name: db.name, tables: res}
})

$dbs.on(fetchDatabasesFx.doneData, (_, p) => p)
$dbContent.on(fetchAdminDbContentFx.doneData, (_, p) => p)
$dbContentDialog.on(dialogToggled, (s) => !s)
$dbContentDialog.on(openDbContentClicked, () => true)

$dbContent.reset(openDbContentClicked)

sample({
  clock: [SystemDbPageGate.open, deleteDatabaseFx.done],
  target: fetchDatabasesFx,
})

sample({
  clock: deleteDbClicked,
  filter: (db) => Boolean(db.id),
  target: deleteDatabaseFx,
})

sample({
  clock: openDbContentClicked,
  filter: (db) => Boolean(db.id),
  target: fetchAdminDbContentFx,
})
