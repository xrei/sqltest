import {attach, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import type {TestResult} from 'src/types'
import {ThemesModel} from 'src/features/Test'
import {UserModel} from 'src/features/User'
import {getUserRatings} from 'src/api'

export const ResultsPageGate = createGate()

export const $onResultsPage = createStore(false)
export const $results = createStore<TestResult[]>([])

export const getResults = createEvent()

export const fetchUserRatingsFx = attach({
  source: [ThemesModel.$selectedThemeId, UserModel.$user],
  async effect([themeId, user]) {
    if (!user) return []

    const res = await (await getUserRatings({StuId: user.Id, TestId: themeId})).json()
    console.log(res)
    return res.map((v) => ({...v, id: v.RatingId}))
  },
})

$onResultsPage.on(ResultsPageGate.open, () => true)
$onResultsPage.on(ResultsPageGate.close, () => false)
$results.on(fetchUserRatingsFx.doneData, (_, p) => p)

// fetch user ratings only when theme id is correct and only on correct page
sample({
  clock: getResults,
  source: [ThemesModel.$selectedThemeId, $onResultsPage],
  filter: ([id, onResultsPage]) => (onResultsPage ? Number.isInteger(Number(id)) : false),
  target: fetchUserRatingsFx,
})

forward({
  from: ThemesModel.$selectedThemeId,
  to: getResults,
})
