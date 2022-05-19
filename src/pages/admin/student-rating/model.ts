import {SelectChangeEvent} from '@mui/material'
import {ChangeEvent} from 'react'
import {attach, combine, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {fetchAdminDataFx} from 'src/features/Admin/AdminData'
import {ThemesModel} from 'src/entities/Theme'
import {reset} from 'src/lib/reset'
import {
  adminGetGroupsRatings,
  adminGetGroupsRatingsSuccess,
  adminGetGroupsThemeRatings,
} from 'src/api'
import {StudRating} from 'src/types'

export const AdminStudentRatingPageGate = createGate()

forward({
  from: AdminStudentRatingPageGate.open,
  to: fetchAdminDataFx,
})

export const $ratingTypeSwitchVal = createStore(false)
export const $ratingType = $ratingTypeSwitchVal.map((state) => (state ? 'theme' : 'group'))
export const switchStateChanged = createEvent<ChangeEvent<HTMLInputElement>>()

$ratingTypeSwitchVal.on(switchStateChanged, (_, e) => e.target.checked)

export const $groupId = createStore('')
export const $subjId = createStore('')
export const $themeId = createStore('')
export const groupSelected = createEvent<SelectChangeEvent<string>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()

$groupId.on(groupSelected, (_, s) => String(s.target.value))
$subjId.on(subjSelected, (_, s) => String(s.target.value))
$themeId.on(themeSelected, (_, s) => String(s.target.value))

sample({
  clock: $subjId,
  filter: $ratingTypeSwitchVal,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

export const showGroupRatingClicked = createEvent()
export const showGroupRatingSuccessClicked = createEvent()
export const showRatingByThemeClicked = createEvent()

const getGroupRatingFx = attach({
  source: {
    groupId: $groupId,
    subjId: $subjId,
  },
  async effect({groupId, subjId}) {
    const res = await (await adminGetGroupsRatings({subjId, groupId})).json()
    return res
  },
})

const getGroupRatingSuccessFx = attach({
  source: {
    groupId: $groupId,
    subjId: $subjId,
  },
  async effect({groupId, subjId}) {
    const res = await (await adminGetGroupsRatingsSuccess({subjId, groupId})).json()
    return res
  },
})

const getGroupRatingByThemeFx = attach({
  source: {
    groupId: $groupId,
    themeId: $themeId,
  },
  async effect({groupId, themeId}) {
    const res = await (await adminGetGroupsThemeRatings({groupId, themeId})).json()
    return res
  },
})

export const $isRatingsLoading = combine(
  [getGroupRatingFx.pending, getGroupRatingSuccessFx.pending, getGroupRatingByThemeFx.pending],
  (xs) => xs.some(Boolean)
)

sample({
  clock: showGroupRatingClicked,
  target: getGroupRatingFx,
})
sample({
  clock: showGroupRatingSuccessClicked,
  target: getGroupRatingSuccessFx,
})
sample({
  clock: showRatingByThemeClicked,
  target: getGroupRatingByThemeFx,
})

const setRatingsData = createEvent<StudRating[]>()

forward({
  from: [
    getGroupRatingFx.doneData,
    getGroupRatingSuccessFx.doneData,
    getGroupRatingByThemeFx.doneData,
  ],
  to: setRatingsData,
})

export const $ratingsData = createStore<StudRating[]>([])

$ratingsData.on(setRatingsData, (_, data) => data)

reset({
  stores: [$groupId, $subjId, $themeId, $ratingsData],
  trigger: switchStateChanged,
})

reset({
  stores: [$groupId, $subjId, $themeId, $ratingsData],
  trigger: AdminStudentRatingPageGate.close,
})
