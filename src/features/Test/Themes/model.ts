import {createStore, createEffect, attach, guard, forward} from 'effector'
import {getThemeList} from 'src/api'
import {Theme} from 'src/types'
import {$user} from 'src/features/User/model'
import {SubjectsModel} from '..'

export const $themeList = createStore<Theme[]>([])

export const fetchThemeListFx = attach({
  source: [$user, SubjectsModel.$selectedSubject],
  async effect([user, subj]) {
    if (!user || !subj) return []

    console.log('fetch available theme list')
    const res = await (await getThemeList({UserId: user.Id, SubjectId: subj.SubjectId})).json()
    return res
  },
})
