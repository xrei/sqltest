import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {getAuthors} from 'src/api'
import type {Author} from 'src/types'

export const AuthorsPageGate = createGate('AuthorsPage')

export const $authors = createStore<Author[]>([])

const fetchAuthorsData = createEffect<void, Author[]>(async () => {
  const resp = await getAuthors()
  const authors = await resp.json()
  return authors
})

export const $isLoading = fetchAuthorsData.pending

forward({from: AuthorsPageGate.open, to: fetchAuthorsData})

$authors.on(fetchAuthorsData.doneData, (_, p) => p)
