import {AlertColor, SnackbarOrigin} from '@mui/material'
import {createEffect, createEvent, createStore, sample} from 'effector'
import type {NoUndefinedField} from 'src/types/helpers'

export type Alert = {
  message: string
  open?: boolean
  id?: number | string
  timeout?: number
  variant?: AlertColor
  anchorOrigin?: SnackbarOrigin
}

export const $alerts = createStore<NoUndefinedField<Alert>[]>([])

export const enqueueAlert = createEvent<Alert>()
export const dequeueAlert = createEvent<Alert>()

const enqueueAlertFx = createEffect<Alert, NoUndefinedField<Alert>>((x) => {
  const id = String(new Date().getTime() + Math.random())
  const alert = {
    message: x.message,
    id,
    open: true,
    timeout: x.timeout || 3000,
    variant: x.variant ? x.variant : 'success',
    anchorOrigin: x.anchorOrigin ?? {vertical: 'top', horizontal: 'right'},
  }

  setTimeout(() => {
    dequeueAlert(alert)
  }, alert.timeout)

  return alert
})

sample({
  clock: enqueueAlert,
  target: enqueueAlertFx,
})

$alerts.on(enqueueAlertFx.doneData, (state, alert) => [...state, alert])
$alerts.on(dequeueAlert, (state, alert) => {
  return state.filter((v) => v.id !== alert.id)
})
