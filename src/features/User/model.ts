import {createEffect, createEvent, createStore, forward} from 'effector'
import type {User} from 'src/types'
import {getUser, authLogOff} from 'src/api'
import {loginFx} from '../Auth/loginModel'
import {registerFx} from '../Auth/registerModel'

export const $user = createStore<User | null>(null)
export const $hasUser = $user.map((v) => Boolean(v))

export const setUser = createEvent<User>()
export const clearUser = createEvent<void>()

export const fetchUser = createEffect<void, User>(async () => {
  const res = await getUser()
  const user = await res.json()
  return user
})

$user.on(setUser, (_, user) => user)
$user.on(clearUser, () => null)

forward({from: fetchUser.doneData, to: setUser})
forward({from: loginFx.doneData, to: setUser})
forward({from: registerFx.doneData, to: setUser})
forward({from: authLogOff.doneData, to: clearUser})

$user.watch((u) => {
  console.log('USER: ', u)
})