import {createEvent, createStore, attach, sample, forward} from 'effector'
import {createGate} from 'effector-react'
import {getStudentsGroupsRatings} from 'src/api'
import {SubjectsModel} from 'src/features/Test'
import {UserModel} from 'src/features/User'
import type {StudRating} from 'src/types'

export const StudRatingPageGate = createGate()

export const $results = createStore<StudRating[]>([])
export const $onStudRatingPage = createStore(false)

export const getResults = createEvent()

const fetchStudRatingsFx = attach({
  source: [SubjectsModel.$selectedSubjectId, UserModel.$user],
  async effect([id, user]) {
    if (!user) {
      throw Error('cannot fetch student ratings, user is null')
    }
    const res = await (await getStudentsGroupsRatings({subjId: id, userId: user.Id})).json()

    return res.map((v, idx) => ({...v, id: idx}))
  },
})

$results.on(fetchStudRatingsFx.doneData, (_, p) => p)
$onStudRatingPage.on(StudRatingPageGate.open, () => true)
$onStudRatingPage.on(StudRatingPageGate.close, () => false)

// fetch students ratings only when theme id is correct and only on correct page
sample({
  clock: getResults,
  source: [SubjectsModel.$selectedSubjectId, $onStudRatingPage],
  filter: ([id, onStudRatingPage]) => (onStudRatingPage ? Number.isInteger(Number(id)) : false),
  target: fetchStudRatingsFx,
})

forward({
  from: SubjectsModel.$selectedSubjectId,
  to: getResults,
})

$results.reset(StudRatingPageGate.close)
forward({
  from: StudRatingPageGate.close,
  to: SubjectsModel.resetSelectedSubject,
})
