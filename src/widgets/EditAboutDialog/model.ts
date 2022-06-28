import {createEffect, createEvent, createStore, restore, sample} from 'effector'
import {adminEditAbout} from 'src/api'

export const $open = createStore(false)
export const openToggled = createEvent()

export const contentChanged = createEvent<string>()
export const $about = restore(contentChanged, '')
export const editAboutClicked = createEvent()

$open.on(openToggled, (s) => !s)

export const editAboutFx = createEffect(async (about: string) => {
  const res = await (await adminEditAbout({Content: about})).json()
  openToggled()
  return res
})

sample({
  clock: editAboutClicked,
  source: $about,
  target: editAboutFx,
})
