import {createEvent, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {AdminModel} from 'src/features/Admin'
import {fetchAdminDataFx} from 'src/features/Admin/AdminData'

export const StudentAnswersPageGate = createGate()

forward({
  from: StudentAnswersPageGate.open,
  to: fetchAdminDataFx,
})

export const $resultsView = createStore(false)
export const resultsViewToggled = createEvent()
export const resultsViewSet = createEvent()

$resultsView.on(resultsViewToggled, (s) => !s)
$resultsView.on(resultsViewSet, () => true)

forward({
  from: AdminModel.fetchAdminGroupRatingsFx,
  to: resultsViewSet,
})
