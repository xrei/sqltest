import type {SelectChangeEvent} from '@mui/material'
import {createEffect, createEvent, createStore, sample} from 'effector'
import {adminCopyTaskToOtherTheme} from 'src/api'
import type {Question} from 'src/types'
import {ThemesModel} from 'src/entities/Theme'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import {reset} from 'src/shared/lib/reset'

const copyTaskToThemeFx = createEffect(
  async ({qsn, newThemeId}: {qsn: Question; newThemeId: number}) => {
    const payload: Question = {
      ...qsn,
      NumInTest: newThemeId,
    }

    const res = await (await adminCopyTaskToOtherTheme(payload)).json()

    enqueueAlert({message: `Задание № ${qsn.Id} успешно скопировано в новую тему`})
    return res
  }
)

export const $singleTaskCopyDialogOpen = createStore(false)
export const $taskToCopy = createStore<Question | null>(null)
export const $selectedSubject = createStore('')
export const $selectedTheme = createStore('')
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()
export const copyDialogOpenedWithQsn = createEvent<Question>()
export const dialogClosed = createEvent()
export const copyTaskClicked = createEvent()

$singleTaskCopyDialogOpen.on(copyDialogOpenedWithQsn, () => true)
$singleTaskCopyDialogOpen.on(dialogClosed, () => false)
$taskToCopy.on(copyDialogOpenedWithQsn, (_, qsn) => qsn)
$selectedSubject.on(subjSelected, (_, s) => String(s.target.value))
$selectedTheme.on(themeSelected, (_, s) => String(s.target.value))

sample({
  clock: $selectedSubject,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

sample({
  clock: copyTaskClicked,
  source: {qsn: $taskToCopy, newThemeId: $selectedTheme},
  filter: (source) => source.qsn !== null && Boolean(source.newThemeId),
  fn: (source) => ({qsn: source.qsn as Question, newThemeId: Number(source.newThemeId)}),
  target: copyTaskToThemeFx,
})

sample({
  clock: copyTaskToThemeFx.doneData,
  target: dialogClosed,
})

reset({
  stores: [$selectedSubject, $selectedTheme, $taskToCopy],
  trigger: dialogClosed,
})
