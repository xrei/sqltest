import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {reverse} from 'ramda'
import {getSomeNews} from 'src/api'

export const NewsPageGate = createGate('AuthorsPage')

type Post = {
  Id: number
  Content: string
  NewsDate: string
}
export const $posts = createStore<Post[]>([])

const fetchPostsData = createEffect<void, Post[]>(async () => {
  const resp = await getSomeNews()
  const list = (await resp.json()) as Post[]
  return reverse(list)
})

export const $isLoading = fetchPostsData.pending

forward({from: NewsPageGate.open, to: fetchPostsData})

$posts.on(fetchPostsData.doneData, (_, p) => p)
