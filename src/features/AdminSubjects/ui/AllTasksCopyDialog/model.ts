import type {ChangeEvent} from 'react'
import type {SelectChangeEvent} from '@mui/material'
import {createStore, createEvent, split, attach, sample} from 'effector'
import {adminCopyThemeAllQuestions, adminCopyThemeQuestions} from 'src/api'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import {reset} from 'src/shared/lib/reset'

export const $copyTypeSwitchVal = createStore(false)
export const $copyAllTasksDialogOpen = createStore(false)
export const $fromThemeId = createStore<number | null>(null)
export const $selectedSubject = createStore('')

export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const switchStateChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const copyDialogOpenedWithThemeId = createEvent<number>()
export const dialogClosed = createEvent()
export const copyThemeClicked = createEvent<'all' | 'easy'>()

$copyTypeSwitchVal.on(switchStateChanged, (_, e) => e.target.checked)
$selectedSubject.on(subjSelected, (_, s) => String(s.target.value))
$copyAllTasksDialogOpen.on(copyDialogOpenedWithThemeId, () => true)
$copyAllTasksDialogOpen.on(dialogClosed, () => false)
$fromThemeId.on(copyDialogOpenedWithThemeId, (_, id) => id)

const copyEasyTasksToThemeFx = attach({
  source: {
    fromThemeId: $fromThemeId,
    themeId: $selectedSubject,
  },
  async effect({themeId, fromThemeId}) {
    if (!themeId || !fromThemeId) return false

    const res = await (
      await adminCopyThemeQuestions({ThemeId: fromThemeId, ThemeName: Number(themeId)})
    ).json()

    enqueueAlert({message: 'Тема успешно скопирована'})
    return res
  },
})

const copyAllTasksToThemeFx = attach({
  source: {
    fromThemeId: $fromThemeId,
    themeId: $selectedSubject,
  },
  async effect({themeId, fromThemeId}) {
    if (!themeId || !fromThemeId) return false

    const res = await (
      await adminCopyThemeAllQuestions({ThemeId: fromThemeId, ThemeName: Number(themeId)})
    ).json()

    enqueueAlert({message: 'Тема успешно скопирована'})
    return res
  },
})

split({
  source: copyThemeClicked,
  match: {
    all: (type) => type === 'all',
    easy: (type) => type === 'easy',
  },
  cases: {
    all: copyAllTasksToThemeFx,
    easy: copyEasyTasksToThemeFx,
  },
})

sample({
  clock: [copyAllTasksToThemeFx.doneData, copyEasyTasksToThemeFx.doneData],
  target: dialogClosed,
})

reset({
  stores: [$fromThemeId, $selectedSubject],
  trigger: dialogClosed,
})
