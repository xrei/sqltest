import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {reverse} from 'ramda'
import {getSomeNews} from 'src/api'
import type {NewsPost} from 'src/types'

export const NewsPageGate = createGate('AuthorsPage')

export const $posts = createStore<NewsPost[]>([])

const fetchPostsData = createEffect<void, NewsPost[]>(async () => {
  const resp = await getSomeNews()
  const list = await resp.json()
  return reverse(list)
})

export const $isLoading = fetchPostsData.pending

forward({from: NewsPageGate.open, to: fetchPostsData})

$posts.on(fetchPostsData.doneData, (_, p) => p)
