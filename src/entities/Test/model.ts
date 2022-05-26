import {attach, createEffect, createStore} from 'effector'
import {getAdminTest, getPrepTest} from 'src/api'
import type {Test, User} from 'src/types'
import {UserModel} from 'src/features/User'

const __fetchAdminTestsByThemeFx = createEffect<{user: User | null; ThemeId: number}, Test[]>(
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

export const fetchAdminTestsByThemeFx = attach({
  source: UserModel.$user,
  effect: __fetchAdminTestsByThemeFx,
  mapParams: (ThemeId: number, user) => ({user, ThemeId}),
})

export const $adminTests = createStore<Test[]>([])
$adminTests.on(fetchAdminTestsByThemeFx.doneData, (_, data) => data)
