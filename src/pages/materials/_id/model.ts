import {createStore, sample, createEffect} from 'effector'
import {createGate} from 'effector-react'
import {getArticle} from 'src/api'
import type {MaterialArticle} from 'src/types'

export const ArticlePageGate = createGate<{id: number}>()

export const $article = createStore<MaterialArticle | null>(null)

export const fetchArticleFx = createEffect<{id: number}, MaterialArticle>(async (params) => {
  const res = await (await getArticle({Id: params.id})).json()

  return res
})

$article.on(fetchArticleFx.doneData, (_, p) => p)

sample({
  clock: ArticlePageGate.open,
  target: fetchArticleFx,
})

$article.reset(ArticlePageGate.close)
