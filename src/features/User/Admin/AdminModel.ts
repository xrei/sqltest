import {attach, createEffect, createStore} from 'effector'
import {
  getAdminGroupRating,
  getAdminTest,
  getAdminTheme,
  getPrepGroupRating,
  getPrepTest,
  getPrepTheme,
} from 'src/api'
import {SubjectsModel} from 'src/features/Test'
import {StudentRating, Test, Theme, User} from 'src/types'
import {UserModel} from '..'
import * as AdminGroupsModel from './adminGroupsModel'

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

const fetchAdminTests = createEffect<{user: User | null; ThemeId: number}, Test[]>(
  async ({user, ThemeId}) => {
    if (!user) return []

    if (user?.Role === 1) {
      const res = await (await getPrepTest({ThemeId})).json()
      return res
    }
    if (user.Role === 2) {
      const res = await (await getAdminTest({ThemeId})).json()
      return res
    }
    return []
  }
)

export const fetchAdminTestsFx = attach({
  source: UserModel.$user,
  effect: fetchAdminTests,
  mapParams: (ThemeId: number, user) => ({user, ThemeId}),
})

export const $adminThemes = createStore<Theme[]>([])
$adminThemes.on(fetchAdminThemesFx.doneData, (_, data) => data)

export const $adminTests = createStore<Test[]>([])
$adminTests.on(fetchAdminTestsFx.doneData, (_, data) => data)

const fetchAdminGroupRatings = createEffect<
  {user: User | null; TestId: number; StuId: number},
  StudentRating[]
>(async ({user, TestId, StuId}) => {
  if (!user) return []
  const payload = {TestId, StuId}
  if (user?.Role === 1) {
    const res = await (await getPrepGroupRating(payload)).json()
    return res
  }
  if (user.Role === 2) {
    const res = await (await getAdminGroupRating(payload)).json()
    console.log(res)
    return res
  }
  return []
})

export const fetchAdminGroupRatingsFx = attach({
  source: UserModel.$user,
  effect: fetchAdminGroupRatings,
  mapParams: ({groupId, TestId}, user) => ({user, TestId, StuId: groupId}),
})
