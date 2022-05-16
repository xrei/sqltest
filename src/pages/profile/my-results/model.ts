import {attach, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import type {TestResult} from 'src/types'
import {getUserRatings} from 'src/api'
import {UserModel} from 'src/features/User'
import {SubjectsModel} from 'src/entities/Subject'
import {ThemesModel} from 'src/entities/Theme'

export const ResultsPageGate = createGate()

export const $onResultsPage = createStore(false)
export const $results = createStore<TestResult[]>([])

export const getResults = createEvent()

export const fetchUserRatingsFx = attach({
  source: [ThemesModel.$selectedThemeId, UserModel.$user],
  async effect([themeId, user]) {
    if (!user) {
      throw Error('cannot fetch user ratings, user is null')
    }

    const res = await (await getUserRatings({StuId: user.Id, TestId: themeId})).json()
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
  filter: ([id, onResultsPage]) => {
    if (!id) return false
    return onResultsPage ? Number.isInteger(Number(id)) : false
  },
  target: fetchUserRatingsFx,
})

forward({
  from: ThemesModel.$selectedThemeId,
  to: getResults,
})

$results.reset(ResultsPageGate.close)

forward({
  from: ResultsPageGate.close,
  to: [ThemesModel.clearThemes, SubjectsModel.resetSelectedSubject],
})
