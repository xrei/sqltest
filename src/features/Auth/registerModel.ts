import {createStore, createEvent, guard, createEffect, combine, forward, sample} from 'effector'
import type {ChangeEvent} from 'react'
import type {SelectChangeEvent} from '@mui/material'
import type {RegisterDTO, User} from 'src/types'
import {reset} from 'src/shared/lib/reset'
import {getRegistrationRules, authRegister} from 'src/api'
import {ResponseError} from 'src/api/error'
import {dialogClosed} from './dialog'
import {enqueueAlert, Alert} from 'src/shared/ui/Alerts'
import {setUser} from 'src/entities/User/model'

// fields
export const $fio = createStore('')
export const $login = createStore('')
export const $pwd = createStore('')
export const $group = createStore('')
export const $studCode = createStore(false)

// events
export const fioChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const loginChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const pwdChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const groupChanged = createEvent<SelectChangeEvent<string>>()
export const acceptStudCode = createEvent()
export const rejectStudCode = createEvent()
export const register = createEvent()

// map events
$fio.on(fioChanged, (_, e) => e.target.value)
$login.on(loginChanged, (_, e) => e.target.value)
$pwd.on(pwdChanged, (_, e) => e.target.value)
$group.on(groupChanged, (_, e) => String(e.target.value))
$studCode.on(acceptStudCode, () => true)
$studCode.on(rejectStudCode, () => false)

const $form = combine([$fio, $login, $pwd, $group, $studCode], ([a, b, c, d, e]) => {
  return {
    FIO: a,
    Login: b,
    Password: c,
    RepeatPassword: c,
    Group: d,
  } as RegisterDTO
})

const $isFioValid = $fio.map((v) => Boolean(v.length))
const $isLoginValid = $login.map((v) => Boolean(v.length))
const $isPwdValid = $pwd.map((v) => Boolean(v.length))
const $isGroupValid = $group.map((v) => Boolean(v.length))
const $isAgreementAccepted = $studCode.map(Boolean)

export const $isSubmitEnabled = combine(
  [$isFioValid, $isLoginValid, $isPwdValid, $isGroupValid, $isAgreementAccepted],
  (shape) => shape.every(Boolean)
)

export const $error = createStore<{error: string} | null>(null)

export const registerFx = createEffect<RegisterDTO, User, ResponseError<{ErrorMessage: string}>>(
  async (params) => {
    const res = await (await authRegister(params)).json()

    return res
  }
)

export const $isPending = registerFx.pending

$error.on(registerFx.failData, (s, error) => {
  if (error.json?.ErrorMessage) {
    return {error: error.json.ErrorMessage}
  }
  return {error: error.message}
})

guard({
  clock: register,
  filter: $isSubmitEnabled,
  source: $form,
  target: registerFx,
})

reset({
  stores: [$fio, $login, $pwd, $studCode, $group],
  trigger: registerFx.done,
})

forward({
  from: registerFx.doneData,
  to: dialogClosed,
})
forward({from: registerFx.doneData, to: setUser})

sample({
  clock: registerFx.failData,
  fn: (err): Alert => {
    return {message: `Запрос выполнен с ошибкой: \n\r${err.message}`, variant: 'error'}
  },
  target: enqueueAlert,
})

export const $regRules = createStore('')
export const fetchRegRules = createEffect<void, string>(async () => {
  const res = await (await getRegistrationRules()).json()
  return res
})

$regRules.on(fetchRegRules.doneData, (_, data) => data)
