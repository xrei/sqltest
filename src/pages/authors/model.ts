import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import type {Author} from 'src/types'
import {getAuthors} from 'src/api'

export const AuthorsPageGate = createGate('AuthorsPage')

export const $authors = createStore<Author[]>([])

export const fetchAuthorsData = createEffect<void, Author[]>(async () => {
  const resp = await getAuthors()
  const authors = await resp.json()
  return authors
})

export const $isLoading = fetchAuthorsData.pending

forward({from: AuthorsPageGate.open, to: fetchAuthorsData})

$authors.on(fetchAuthorsData.doneData, (_, p) => p)
