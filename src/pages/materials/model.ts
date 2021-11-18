import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {getMaterials} from 'src/api'

export const MaterialsPageGate = createGate('AuthorsPage')

type Material = unknown
export const $posts = createStore<Material[]>([])

const fetchMaterialsData = createEffect<void, Material[]>(async () => {
  const resp = await getMaterials()
  const list = (await resp.json()) as Material[]
  return list
})

export const $isLoading = fetchMaterialsData.pending

forward({from: MaterialsPageGate.open, to: fetchMaterialsData})

$posts.on(fetchMaterialsData.doneData, (_, p) => p)
