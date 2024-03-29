import {createEffect, createEvent, createStore, sample} from 'effector'
import type {StudentRating} from 'src/types'
import {deleteAdminGroupRating, reCalcAdminGroupRating} from 'src/api'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import {AdminModel} from 'src/features/Admin'
import {$groupId, $testId} from './Form/FormModel'

type RatingId = {RatingId: number; studentRatingId: number}

export const $results = createStore<StudentRating[]>([])
export const $ratingIsLoading = AdminModel.fetchAdminGroupRatingsFx.pending

$results.on(AdminModel.fetchAdminGroupRatingsFx.doneData, (_, data) => data)

export const reCalcRatingClicked = createEvent<RatingId>()
export const deleteRatingClicked = createEvent<RatingId>()

const reCalcRatingFx = createEffect<RatingId, RatingId>(async (payload) => {
  const res = await (await reCalcAdminGroupRating(payload)).json()

  enqueueAlert({message: 'Рейтинг успешно пересчитан'})
  return payload
})

sample({
  clock: reCalcRatingClicked,
  filter: (params) => params && Boolean(params.RatingId),
  target: reCalcRatingFx,
})

const deleteRatingFx = createEffect<RatingId, RatingId>(async (payload) => {
  if (!confirm('Подтвердите удаление')) {
    throw Error('cancelled')
  }

  const res = await (await deleteAdminGroupRating(payload)).json()

  enqueueAlert({message: 'Рейтинг успешно удален'})
  return payload
})

sample({
  clock: deleteRatingClicked,
  filter: (params) => params && Boolean(params.RatingId),
  target: deleteRatingFx,
})

sample({
  clock: [deleteRatingFx.doneData, reCalcRatingFx.doneData],
  source: {
    groupId: $groupId,
    TestId: $testId,
  },
  target: AdminModel.fetchAdminGroupRatingsFx,
})
