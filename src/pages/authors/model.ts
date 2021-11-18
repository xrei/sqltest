import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {getAuthors} from 'src/api'

export const AuthorsPageGate = createGate('AuthorsPage')

type Author = {
  AuthorDescription: string
  AuthorId: number
  AuthorImage: string
  AuthorName: string
}
export const $authors = createStore<Author[]>([])

const fetchAuthorsData = createEffect<void, Author[]>(async () => {
  const resp = await getAuthors()
  const authors = (await resp.json()) as Author[]
  return authors
})

export const $isLoading = fetchAuthorsData.pending

forward({from: AuthorsPageGate.open, to: fetchAuthorsData})

$authors.on(fetchAuthorsData.doneData, (_, p) => p)
