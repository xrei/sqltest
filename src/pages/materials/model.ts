import {createEffect, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {getMaterials} from 'src/api'
import type {Material} from 'src/types'
import {ArticlePageGate} from './_id/model'

export const MaterialsPageGate = createGate()

export const $materials = createStore<Material[]>([])
export const $hasMaterials = $materials.map((xs) => xs.length > 0)

const fetchMaterialsData = createEffect<void, Material[]>(async () => {
  const resp = await getMaterials()
  const list = await resp.json()
  return list
})

export const $isLoading = fetchMaterialsData.pending

forward({from: MaterialsPageGate.open, to: fetchMaterialsData})

$materials.on(fetchMaterialsData.doneData, (_, p) => p)

sample({
  clock: ArticlePageGate.open,
  source: $materials,
  filter: (xs) => !xs.length,
  target: fetchMaterialsData,
})
