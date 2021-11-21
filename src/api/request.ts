import {createStore, createEffect, attach} from 'effector'
import {ResponseError} from './error'
import {api} from './instance'

const $authToken = createStore('')

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ResponseType<R = unknown> extends Response {
  json: <T = unknown>() => Promise<T & R>
}

export const createRequestFx = <T = unknown, R = unknown>(resource: string, method?: Methods) => {
  return createEffect<T, ResponseType<R>>(async (params) => {
    const token = $authToken.getState()
    return api(resource, {
      method,
      json: params,
      headers: {
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
    }).catch(async (err) => {
      const errBody = await err.response.json()
      throw new ResponseError(err, errBody)
    })
  })
}
