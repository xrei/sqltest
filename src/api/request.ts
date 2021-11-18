import {createStore, createEffect, attach} from 'effector'
import {ResponsePromise} from 'ky'
import {api} from './instance'

const $authToken = createStore('')

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
interface BackendRequestPayload {
  token?: string
  data?: unknown
  body?: BodyInit
  method?: Methods
  resource: string
}
const backendRequestFx = createEffect<BackendRequestPayload, ResponsePromise | Promise<Response>>(
  async ({token, data, method = 'GET', resource = '', body}) => {
    return api(resource, {
      method,
      json: data,
      body,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Cookie: 'kek=true',
      },
      timeout: 120,
    })
  }
)

export const createRequestFx = <T>(resource: string, method?: Methods) =>
  attach({
    effect: backendRequestFx,
    source: $authToken,
    mapParams: (data: T, token) => ({data, resource, method, token}),
  })
