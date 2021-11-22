import {createStore, createEvent, guard, createEffect, combine} from 'effector'
import type {ChangeEvent} from 'react'
import type {SelectChangeEvent} from '@mui/material'
import {reset} from 'src/lib/reset'
import {getRegistrationRules} from 'src/api'

type RegisterDTO = {
  FIO: string
  Login: string
  Password: string
  Group: string
}

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

const registerFx = createEffect<RegisterDTO, void>((params) => {
  console.log(params)
})

export const $isPending = registerFx.pending

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

export const $regRules = createStore('')

export const fetchRegRules = createEffect<void, string>(async () => {
  const res = await (await getRegistrationRules()).json()
  return res
})

$regRules.on(fetchRegRules.doneData, (_, data) => data)
