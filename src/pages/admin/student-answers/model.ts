import {SelectChangeEvent} from '@mui/material'
import {combine, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {AdminModel} from 'src/features/User/Admin'
import {fetchAdminDataFx} from 'src/features/User/Admin/AdminData'
import {reset} from 'src/lib/reset'
import {StudentRating} from 'src/types'

export const StudentAnswersPageGate = createGate()

forward({
  from: StudentAnswersPageGate.open,
  to: fetchAdminDataFx,
})
export const resetForm = createEvent()

export const $groupId = createStore('')
export const $subjId = createStore('')
export const $themeId = createStore('')
export const $testId = createStore('')

export const groupSelected = createEvent<SelectChangeEvent<string>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()
export const testSelected = createEvent<SelectChangeEvent<string>>()

$groupId.on(groupSelected, (_, s) => String(s.target.value))
$subjId.on(subjSelected, (_, s) => String(s.target.value))
$themeId.on(themeSelected, (_, s) => String(s.target.value))
$testId.on(testSelected, (_, s) => String(s.target.value))

reset({
  stores: [$groupId, $subjId, $themeId, $testId],
  trigger: resetForm,
})

sample({
  clock: $subjId,
  fn: (id) => Number(id),
  target: AdminModel.fetchAdminThemesFx,
})

sample({
  clock: $themeId,
  fn: (id) => Number(id),
  target: AdminModel.fetchAdminTestsFx,
})

export const $isFormButtonDisabled = combine([$groupId, $subjId, $testId, $themeId], (xs) =>
  xs.some((val) => !val.length)
)

export const formResultClicked = createEvent()

sample({
  clock: formResultClicked,
  filter: $isFormButtonDisabled.map((state) => !state),
  source: {
    groupId: $groupId,
    TestId: $testId,
  },
  target: AdminModel.fetchAdminGroupRatingsFx,
})

export const $groupRatings = createStore<StudentRating[]>([])
$groupRatings.on(AdminModel.fetchAdminGroupRatingsFx.doneData, (_, data) => data)

export const $resultsView = createStore(false)
export const resultsViewToggled = createEvent()
$resultsView.on(resultsViewToggled, (s) => !s)

forward({
  from: AdminModel.fetchAdminGroupRatingsFx,
  to: resultsViewToggled,
})
