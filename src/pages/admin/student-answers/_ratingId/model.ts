import {createEffect, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {getAdminUserQnA, getCompleteBasicQuery, getCompleteUserQuery} from 'src/api'
import {DBTableContent, RatingQnA} from 'src/types'

export const RatingIdPageGate = createGate<{RatingId: number}>()

const fetchRatingQnAFx = createEffect<{RatingId: number}, RatingQnA[]>(async ({RatingId}) => {
  const res = await (await getAdminUserQnA({RatingId})).json()
  return res
})

export const $pageLoading = fetchRatingQnAFx.pending
export const $ratingList = createStore<RatingQnA[]>([])
export const $studentFio = $ratingList.map((xs) => (xs.length > 0 ? xs[0].StudentName : ''))

$ratingList.on(fetchRatingQnAFx.doneData, (_, data) => data)

sample({
  clock: RatingIdPageGate.open,
  filter: (params) => Boolean(params.RatingId),
  target: fetchRatingQnAFx,
})

export const compareDialogToggled = createEvent()
export const compareDialogClosed = createEvent()
export const $compareDialogOpen = createStore(false)
$compareDialogOpen.on(compareDialogToggled, (open) => !open)
$compareDialogOpen.on(compareDialogClosed, () => false)

type CompareAnswersParams = {Id: number; UserAnswer: string}
type ComparedResults = {user: DBTableContent[]; system: DBTableContent[]}

export const compareAnswersClicked = createEvent<CompareAnswersParams>()

forward({
  from: compareAnswersClicked,
  to: compareDialogToggled,
})

const compareAnswersFx = createEffect<CompareAnswersParams, ComparedResults>(async (payload) => {
  const result = await Promise.all([
    getCompleteUserQuery({Id: payload.Id, UserAnswer: payload.UserAnswer}).then((r) => r.json()),
    getCompleteBasicQuery({Id: payload.Id}).then((r) => r.json()),
  ])

  return {
    user: result[0],
    system: result[1],
  }
})

export const $compareInProcess = compareAnswersFx.pending

export const $comparedResults = createStore<ComparedResults>({
  user: [],
  system: [],
})
$comparedResults.on(compareAnswersFx.doneData, (_, result) => result)

sample({
  clock: compareAnswersClicked,
  filter: ({Id}) => Boolean(Id),
  target: compareAnswersFx,
})

$comparedResults.reset(compareDialogClosed)
$ratingList.reset(RatingIdPageGate.close)
