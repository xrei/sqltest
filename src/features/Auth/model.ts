import {createStore} from 'effector'

type User = {
  Group: number
  Id: number
  Login: string
  name: string
  online: number
  role: number
}

export const $user = createStore<User | null>(null)
export const $hasAuth = $user.map((v) => Boolean(v))
