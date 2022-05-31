import type {SelectChangeEvent} from '@mui/material'
import type {ChangeEvent} from 'react'
import {AdminSubject, AdminTheme, ThemeDTO} from 'src/types'
import {createGate} from 'effector-react'
import {createStore, createEvent, attach, sample, createEffect} from 'effector'
import {isEmpty, find, prop, pipe, propEq} from 'ramda'
import {enqueueAlert} from 'src/features/Alerts'
import {adminAddTheme, adminEditTheme} from 'src/api'
import {history} from 'src/router/history'
import {adminRoutes} from 'src/router/paths'
import {AdminSubjectsModel} from '../..'

type MetaInfo = {themeId: number; subjId: number}

export const ManageThemeFormGate = createGate<MetaInfo>()
const getThemeById = createEvent<MetaInfo>()

export const $themeDto = createStore<ThemeDTO>({
  Description: '',
  ThemeId: 0,
  ThemeName: '',
  ThemeSubjId: '',
})
export const $newDescription = createStore('')
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeNameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const descriptionChanged = createEvent<string>()

export const editClicked = createEvent()
export const addClicked = createEvent()

const fetchSubjectsListFx = createEffect(async ({subjId, themeId}: Partial<MetaInfo>) => {
  if (!subjId || !themeId) return
  await AdminSubjectsModel.fetchAdminTestListFx()

  getThemeById({subjId, themeId})
})

const addThemeFx = attach({
  source: {
    themeDto: $themeDto,
    newDescription: $newDescription,
  },
  async effect({themeDto, newDescription}) {
    if (!themeDto.ThemeName.length || !Number(themeDto.ThemeSubjId)) {
      enqueueAlert({
        message: `Поля Дисциплина и Название темы обязательны к заполнению!`,
        variant: 'error',
      })
      throw Error('missing fields')
    }

    const payload: ThemeDTO = {
      Description: newDescription.length ? newDescription : themeDto.Description,
      ThemeName: themeDto.ThemeName,
      ThemeSubjId: Number(themeDto.ThemeSubjId),
    }

    const res = await (await adminAddTheme(payload)).json()

    enqueueAlert({message: `Тема - ${themeDto.ThemeName} успешно добавлена`})
    history.push(adminRoutes.testsSubjId.replace(':subjId', String(themeDto.ThemeSubjId)))
    return res
  },
})

const editThemeFx = attach({
  source: {
    themeDto: $themeDto,
    newDescription: $newDescription,
  },
  async effect({themeDto, newDescription}) {
    if (!themeDto.ThemeName.length || !Number(themeDto.ThemeSubjId)) {
      enqueueAlert({
        message: `Поля Дисциплина и Название темы обязательны к заполнению!`,
        variant: 'error',
      })
      throw Error('missing fields')
    }

    const payload: ThemeDTO = {
      Description: newDescription.length ? newDescription : themeDto.Description,
      ThemeName: themeDto.ThemeName,
      ThemeSubjId: Number(themeDto.ThemeSubjId),
      ThemeId: themeDto.ThemeId,
    }

    const res = await (await adminEditTheme(payload)).json()

    enqueueAlert({message: `Тема - ${themeDto.ThemeName} успешно отредактирована`})
    return res
  },
})

$themeDto.on(subjSelected, (state, e) => ({...state, ThemeSubjId: e.target.value}))
$themeDto.on(themeNameChanged, (state, e) => ({...state, ThemeName: e.target.value}))
$newDescription.on(descriptionChanged, (state, val) => val)

sample({
  clock: addClicked,
  target: addThemeFx,
})
sample({
  clock: editClicked,
  target: editThemeFx,
})

sample({
  clock: ManageThemeFormGate.open,
  source: AdminSubjectsModel.$subjectsList,
  filter: (source) => isEmpty(source),
  fn: (_, clock) => clock,
  target: fetchSubjectsListFx,
})

sample({
  clock: [ManageThemeFormGate.open, getThemeById],
  source: AdminSubjectsModel.$subjectsList,
  filter: (source, {subjId, themeId}) => {
    const hasList = Boolean(source.length)
    const hasSubject = Boolean(source.find((subj) => subj.SubjId === subjId))
    return hasList && hasSubject
  },
  fn: (source, {subjId, themeId}) => {
    const propSubjIdEq = propEq('SubjId', subjId)
    const propThemeIdEq = propEq('ThemeId' as any, themeId)
    const themesListProp = prop('ThemesList')

    const findTheme = pipe(
      find<AdminSubject>(propSubjIdEq),
      // @ts-expect-error filtered above
      themesListProp,
      find<AdminTheme>(propThemeIdEq)
    )

    const theme = findTheme(source) as AdminTheme
    return {
      Description: theme.Description,
      ThemeId: theme.ThemeId,
      ThemeName: theme.ThemeName,
      ThemeSubjId: theme.ThemeSubjId,
    } as ThemeDTO
  },
  target: $themeDto,
})

$themeDto.reset([addThemeFx.doneData, ManageThemeFormGate.close])
