import {createStore, createEffect, attach} from 'effector'
import {Options} from 'ky'
import {ResponseError} from './error'
import {api} from './instance'

const $authToken = createStore('')

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ResponseType<R = unknown> extends Response {
  json: <T = unknown>() => Promise<T & R>
}

export const createRequestFx = <T = unknown, R = unknown>(
  resource: string,
  method?: Methods,
  url?: boolean
) => {
  return createEffect<T, ResponseType<R>>(async (params) => {
    // const token = $authToken.getState()
    const config: Options = {
      method,
    }
    if (!url) {
      config.json = params
    }
    if (url) {
      config.searchParams = new URLSearchParams(params as unknown as URLSearchParams)
    }

    return api(resource, config).catch(async (err) => {
      const errBody = await err.response.json()
      throw new ResponseError(err, errBody)
    })
  })
}
