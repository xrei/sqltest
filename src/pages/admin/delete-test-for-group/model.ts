import {SelectChangeEvent} from '@mui/material'
import {attach, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {adminDeleteGroupForTest} from 'src/api'
import {ThemesModel} from 'src/entities/Theme'
import {reset} from 'src/shared/lib/reset'
import {fetchAdminDataFx} from 'src/features/Admin/AdminData'
import {enqueueAlert} from 'src/shared/ui/Alerts'

export const AdminDeleteTestForGroupPageGate = createGate()

forward({
  from: AdminDeleteTestForGroupPageGate.open,
  to: fetchAdminDataFx,
})

export const $groupId = createStore('')
export const $subjId = createStore('')
export const $themeId = createStore('')

export const groupSelected = createEvent<SelectChangeEvent<string>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()

export const deleteTestForGroupClicked = createEvent()

const deleteTestForGroupFx = attach({
  source: {
    groupId: $groupId,
    themeId: $themeId,
  },
  async effect({groupId, themeId}) {
    const res = await (await adminDeleteGroupForTest({themeId, groupId})).json()

    enqueueAlert({message: 'Назначение теста у группы успешно удалено!'})
    return res
  },
})

$groupId.on(groupSelected, (_, s) => String(s.target.value))
$subjId.on(subjSelected, (_, s) => String(s.target.value))
$themeId.on(themeSelected, (_, s) => String(s.target.value))

sample({
  clock: $subjId,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

sample({
  clock: deleteTestForGroupClicked,
  target: deleteTestForGroupFx,
})

reset({
  stores: [$groupId, $subjId, $themeId],
  trigger: AdminDeleteTestForGroupPageGate.close,
})
reset({
  stores: [$groupId, $subjId, $themeId],
  trigger: deleteTestForGroupFx.doneData,
})
