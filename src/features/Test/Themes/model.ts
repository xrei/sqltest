import {createStore, createEvent, attach, forward, combine} from 'effector'
import type {SelectChangeEvent} from '@mui/material'
import {getThemeList} from 'src/api'
import {Theme} from 'src/types'
import {$user} from 'src/features/User/model'
import {reset} from 'src/lib/reset'
import {SubjectsModel} from '..'

export const $themeList = createStore<Theme[]>([])
export const $selectedThemeId = createStore<string>('')
export const $selectedTheme = combine([$themeList, $selectedThemeId], ([xs, id]) => {
  if (xs.length) {
    return xs.find((v) => v.ThemeId === Number(id))
  } else {
    return null
  }
})

export const selectTheme = createEvent<SelectChangeEvent<string>>()
export const clearThemes = createEvent<void>()

export const fetchThemeListFx = attach({
  source: [$user, SubjectsModel.$selectedSubjectId],
  async effect([user, subjId]) {
    if (!user || !subjId) return []

    console.log('fetch available theme list')
    const res = await (await getThemeList({UserId: user.Id, SubjectId: Number(subjId)})).json()
    return res
  },
})

$themeList.on(fetchThemeListFx.doneData, (_, p) => p)
$selectedThemeId.on(selectTheme, (_, e) => String(e.target.value))
$selectedThemeId.on(fetchThemeListFx.doneData, () => '')

forward({
  from: SubjectsModel.$selectedSubjectId,
  to: fetchThemeListFx,
})

reset({
  stores: [$themeList, $selectedThemeId],
  trigger: clearThemes,
})
