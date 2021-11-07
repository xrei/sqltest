import {createStore, createEvent, createEffect, combine, guard} from 'effector'
import type {ChangeEvent} from 'react'
import {reject, isNil} from 'ramda'

const rejectIsNil = reject(isNil)

interface LoginDTO {
  Login: string
  Password: string
  RememberMe?: boolean
}

export const $login = createStore('')
export const $isLoginValid = $login.map((v) => Boolean(v.length))
export const $pwd = createStore('')
export const $isPwdValid = $pwd.map((v) => Boolean(v.length))
export const $rememberMe = createStore(true)

export const loginChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const pwdChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const rememberMeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const login = createEvent()

const loginFx = createEffect<LoginDTO, void>((params) => {
  console.log(params)
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
