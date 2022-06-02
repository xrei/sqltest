import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {reverse} from 'ramda'
import {getSomeNews} from 'src/api'
import {AdminNewsModel} from 'src/features/ManageAdminNews'
import type {NewsPost} from 'src/types'

export const NewsPageGate = createGate('NewsPage')

export const $posts = createStore<NewsPost[]>([])

const fetchPostsData = createEffect<void, NewsPost[]>(async () => {
  const resp = await getSomeNews()
  const list = await resp.json()
  return reverse(list)
})

export const $isLoading = fetchPostsData.pending

forward({
  from: [
    NewsPageGate.open,
    AdminNewsModel.deleteNewsFx.doneData,
    AdminNewsModel.editNewsFx.doneData,
    AdminNewsModel.addNewsFx.doneData,
  ],
  to: fetchPostsData,
})

$posts.on(fetchPostsData.doneData, (_, p) => p)
