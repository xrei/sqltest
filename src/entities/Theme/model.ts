import {createStore, createEvent, createEffect, attach, forward, combine} from 'effector'
import type {SelectChangeEvent} from '@mui/material'
import type {Theme, User} from 'src/types'
import {getThemeList, getPrepTheme, getAdminTheme} from 'src/api'
import {reset} from 'src/shared/lib/reset'
import {SubjectsModel} from 'src/entities/Subject'
import {UserModel} from 'src/entities/User'

export const $themeList = createStore<Theme[]>([])
// id Дисциплины
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
  source: [UserModel.$user, SubjectsModel.$selectedSubjectId],
  async effect([user, subjId]) {
    if (!user || !subjId) return []

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

reset({
  stores: [$themeList, $selectedThemeId],
  trigger: SubjectsModel.selectSubject,
})

//#region Admin Themes
const fetchAdminThemes = createEffect<{user: User | null; SubjectId: number}, Theme[]>(
  async ({user, SubjectId}) => {
    if (!user) return []

    if (user?.Role === 1) {
      const res = await (await getPrepTheme({SubjectId})).json()
      return res
    }
    if (user.Role === 2) {
      const res = await (await getAdminTheme({SubjectId})).json()
      return res
    }
    return []
  }
)

export const fetchAdminThemesFx = attach({
  source: UserModel.$user,
  effect: fetchAdminThemes,
  mapParams: (SubjectId: number, user) => ({user, SubjectId}),
})

export const $adminThemes = createStore<Theme[]>([])
$adminThemes.on(fetchAdminThemesFx.doneData, (_, data) => data)
//#endregion Admin Themes
