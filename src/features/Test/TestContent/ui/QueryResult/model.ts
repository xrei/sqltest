import {attach, combine, createEffect, createEvent, createStore, forward, split} from 'effector'
import {isNil} from 'ramda'
import {getCompleteBasicQuery, getCompleteUserQuery} from 'src/api'
import {TestContentModel} from 'src/features/Test'
import {DBTableContent} from 'src/types'

export type QueryType = 'user' | 'reference'

export const $queryType = createStore<QueryType>('user')
export const $queryResult = createStore<DBTableContent[]>([])
export const $isOpen = createStore(false)

export const toggleDialog = createEvent()
export const openDialogWithType = createEvent<QueryType>()
const resetResult = createEvent()

$isOpen.on(toggleDialog, (open) => !open)
$queryType.on(openDialogWithType, (_, type) => type)

forward({from: openDialogWithType, to: toggleDialog})

export const fetchUserQueryFx = attach({
  source: TestContentModel.$currQuestion,
  async effect(source) {
    const Id = source.Id
    const UserAnswer = isNil(source.UserAnswer) ? '' : (source.UserAnswer as string)

    const result = await (await getCompleteUserQuery({Id, UserAnswer})).json()
    return result
  },
})
export const fetchReferenceQueryFx = attach({
  source: TestContentModel.$currQuestion,
  async effect(source) {
    const Id = source.Id

    const result = await (await getCompleteBasicQuery({Id})).json()
    return result
  },
})

export const $isDataLoading = combine(
  fetchReferenceQueryFx.pending,
  fetchUserQueryFx.pending,
  (a, b) => a || b
)

split({
  source: openDialogWithType,
  match: {
    user: (type) => type === 'user',
    reference: (type) => type === 'reference',
  },
  cases: {
    user: fetchUserQueryFx,
    reference: fetchReferenceQueryFx,
  },
})

$queryResult.on(fetchReferenceQueryFx.doneData, (_, res) => res)
$queryResult.on(fetchUserQueryFx.doneData, (_, res) => res)

$isOpen.watch((open) => {
  if (!open) {
    resetResult()
  }
})

$queryResult.reset([resetResult])
