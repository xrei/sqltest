import {SelectChangeEvent} from '@mui/material'
import {attach, combine, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import type {QuestionStats} from 'src/types'
import {fetchAdminDataFx} from 'src/features/Admin/AdminData'
import {ThemesModel} from 'src/entities/Theme'
import {reset} from 'src/lib/reset'
import {adminGetAllQsnStats, adminGetAllQsnStatsGroupOne} from 'src/api'

export const AdminStatisticsPageGate = createGate()

forward({
  from: AdminStatisticsPageGate.open,
  to: fetchAdminDataFx,
})

export const $statsData = createStore<QuestionStats[]>([])
export const $groupId = createStore('')
export const $subjId = createStore('')
export const $themeId = createStore('')

const setStatsData = createEvent<QuestionStats[]>()
export const groupSelected = createEvent<SelectChangeEvent<string>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()

export const formStatisticsClicked = createEvent()
export const formStatisticsByGroupClicked = createEvent()

const fetchStatisticsFx = attach({
  source: {
    themeId: $themeId,
  },
  async effect({themeId}) {
    const res = await (await adminGetAllQsnStats({ThemeId: themeId})).json()
    return res
  },
})

const fetchStatisticsByGroupFx = attach({
  source: {
    groupId: $groupId,
    themeId: $themeId,
  },
  async effect({groupId, themeId}) {
    const res = await (await adminGetAllQsnStatsGroupOne({themeId, groupId})).json()
    return res
  },
})

export const $statisticsLoading = fetchStatisticsFx.pending
export const $statisticsByGroupLoading = fetchStatisticsByGroupFx.pending
export const $isRatingsLoading = combine(
  [fetchStatisticsFx.pending, fetchStatisticsByGroupFx.pending],
  ([a, b]) => a || b
)

sample({
  clock: formStatisticsClicked,
  target: fetchStatisticsFx,
})
sample({
  clock: formStatisticsByGroupClicked,
  target: fetchStatisticsByGroupFx,
})

forward({
  from: [fetchStatisticsFx.doneData, fetchStatisticsByGroupFx.doneData],
  to: setStatsData,
})

sample({
  clock: $subjId,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

$groupId.on(groupSelected, (_, s) => String(s.target.value))
$subjId.on(subjSelected, (_, s) => String(s.target.value))
$themeId.on(themeSelected, (_, s) => String(s.target.value))
$statsData.on(setStatsData, (_, data) => data)

reset({
  stores: [$groupId, $subjId, $themeId, $statsData],
  trigger: AdminStatisticsPageGate.close,
})
