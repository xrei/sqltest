import {createEffect, createEvent, createStore, forward} from 'effector'
import {getUser} from 'src/api'
import type {User} from 'src/types'
import {loginFx} from '../Auth/loginModel'

export const $user = createStore<User | null>(null)
export const $hasUser = $user.map((v) => Boolean(v))

export const setUser = createEvent<User>()

export const fetchUser = createEffect<void, User>(async () => {
  const res = await getUser()
  const user = await res.json()
  return user
})

$user.on(setUser, (_, user) => user)

forward({from: fetchUser.doneData, to: setUser})
forward({from: loginFx.doneData, to: setUser})

$user.watch(console.log)
