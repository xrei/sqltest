import {createEffect} from 'effector'
import {Options} from 'ky'
import {ResponseError} from './error'
import {api} from './instance'

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ResponseType<R = unknown> extends Response {
  json: <T = unknown>() => Promise<T & R>
}

export const createRequestFx = <T = unknown, R = unknown>(
  resource: string,
  method?: Methods,
  url?: boolean,
  cfg: Options = {}
) => {
  return createEffect<T, ResponseType<R>>(async (params) => {
    const config: Options = {
      method,
      prefixUrl: resource.startsWith('http') ? '' : '/api',
      ...cfg,
    }
    if (!url) {
      config.json = params
    }
    if (url) {
      config.searchParams = new URLSearchParams(params as unknown as URLSearchParams)
    }

    return api(resource, config).catch(async (err) => {
      if (err.response) {
        const errBody = await err.response.json()
        throw new ResponseError(err, errBody)
      }
      console.error(err)
      throw err
    })
  })
}
