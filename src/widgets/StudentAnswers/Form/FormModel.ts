import {SelectChangeEvent} from '@mui/material'
import {combine, createEvent, createStore, sample} from 'effector'
import {createGate} from 'effector-react'
import {TestModel} from 'src/entities/Test'
import {ThemesModel} from 'src/entities/Theme'
import {AdminModel} from 'src/features/Admin'
import {reset} from 'src/shared/lib/reset'
import {StudentRating} from 'src/types'

export const FormGate = createGate()

export const resetForm = createEvent()

export const $groupId = createStore('')
export const $subjId = createStore('')
export const $themeId = createStore('')
export const $testId = createStore('')

export const $currentThemeSelected = combine(
  ThemesModel.$adminThemes,
  $themeId,
  (themes, themeId) => themes.find((v) => v.ThemeId === Number(themeId))
)

export const groupSelected = createEvent<SelectChangeEvent<string>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()
export const testSelected = createEvent<SelectChangeEvent<string>>()

$groupId.on(groupSelected, (_, s) => String(s.target.value))
$subjId.on(subjSelected, (_, s) => String(s.target.value))
$themeId.on(themeSelected, (_, s) => String(s.target.value))
$testId.on(testSelected, (_, s) => String(s.target.value))

sample({
  clock: $subjId,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

sample({
  clock: $themeId,
  fn: (id) => Number(id),
  target: TestModel.fetchAdminTestsByThemeFx,
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

// sample({
//   clock: FormGate.close,
//   target: resetForm,
// })
reset({
  stores: [$groupId, $subjId, $themeId, $testId],
  trigger: resetForm,
})

$themeId.reset([$subjId])
$testId.reset([$subjId, $themeId])
