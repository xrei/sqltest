import {createEffect, createStore, forward} from 'effector'
import {createGate} from 'effector-react'
import {getAbout} from 'src/api'

export const AboutPageGate = createGate('AboutPage')

export const $about = createStore('')

const fetchAboutData = createEffect<void, string>(async () => {
  const resp = await getAbout()
  const html = await resp.json()
  return html.replaceAll('color: #333333; ', '')
})

forward({from: AboutPageGate.open, to: fetchAboutData})

$about.on(fetchAboutData.doneData, (_, p) => p)
