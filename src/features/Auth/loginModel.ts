import {createStore, createEvent, createEffect, combine, guard, forward, sample} from 'effector'
import type {ChangeEvent} from 'react'
import type {LoginDTO, User} from 'src/types'
import {reject, isNil} from 'ramda'
import {authLogOn} from 'src/api'
import {ResponseError} from 'src/api/error'
import {dialogClosed} from './dialog'
import {enqueueAlert, Alert} from 'src/shared/ui/Alerts'
import {setUser} from 'src/entities/User/model'

const rejectIsNil = reject(isNil)

export const $error = createStore<{error: string} | null>(null)
export const $login = createStore('')
export const $isLoginValid = $login.map((v) => Boolean(v.length))
export const $pwd = createStore('')
export const $isPwdValid = $pwd.map((v) => Boolean(v.length))
export const $rememberMe = createStore(true)

export const loginChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const pwdChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const rememberMeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const login = createEvent()

export const loginFx = createEffect<LoginDTO, User, ResponseError<{ErrorMessage: string}>>(
  async (params) => {
    const res = await authLogOn(params)
    const user = await res.json()

    return user
  }
)

$error.on(loginFx.failData, (s, error) => {
  if (error.json?.ErrorMessage) {
    return {error: error.json.ErrorMessage}
  }
  return {error: error.message}
})
$login.on(loginChanged, (_, e) => e.target.value)
$pwd.on(pwdChanged, (_, e) => e.target.value)
$rememberMe.on(rememberMeChanged, (_, e) => e.target.checked)

const $form = combine(
  $login,
  $pwd,
  $rememberMe,
  (a, b, c) => rejectIsNil({Login: a, Password: b, RememberMe: c}) as unknown as LoginDTO
)

export const $isPending = loginFx.pending

$login.reset([loginFx.done])
$pwd.reset([loginFx.done])

export const $isSubmitEnabled = combine(
  loginFx.pending,
  $isLoginValid,
  $isPwdValid,
  (loginFxPending, lv, pv) => !loginFxPending && lv && pv
)

guard({
  clock: login,
  filter: $isSubmitEnabled,
  source: $form,
  target: loginFx,
})

forward({
  from: loginFx.doneData,
  to: dialogClosed,
})

sample({
  clock: loginFx.doneData,
  target: setUser,
})

sample({
  clock: loginFx.failData,
  fn: (err): Alert => {
    return {message: `Запрос выполнен с ошибкой: \n\r${err.message}`, variant: 'error'}
  },
  target: enqueueAlert,
})
