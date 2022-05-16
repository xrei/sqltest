import {head, split, map, join, take} from 'ramda'
import {combine, createEffect, createEvent, createStore, forward} from 'effector'
import type {User} from 'src/types'
import {getUser, authLogOff} from 'src/api'
import {loginFx} from '../Auth/loginModel'
import {registerFx} from '../Auth/registerModel'

export const roles: {[key: number]: string} = {
  0: 'Студент',
  1: 'Преподаватель',
  2: 'Админ',
}

export const $user = createStore<User | null>(null)
export const $hasUser = $user.map((v) => Boolean(v))
export const $userRole = $user.map((v) => (v ? roles[v.Role] : ''))
export const $userIsStudent = $user.map((v) => v?.Role === 0)
export const $userIsPrep = $user.map((user) => user?.Role === 1)
export const $userIsAdmin = $user.map((user) => user?.Role === 2)
export const $isPrepOrAdmin = combine($userIsAdmin, $userIsPrep, (a, b) => a || b)
export const $userNameLetters = $user.map((u) => {
  if (!u) return ''
  // @ts-expect-error: untypable
  return join('', map(head, take(2, split(' ', u.Name))))
})

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
