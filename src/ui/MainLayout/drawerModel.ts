import {createEvent, createStore} from 'effector'

export const onOpen = createEvent()
export const onClose = createEvent()
export const toggle = createEvent()

export const $drawer = createStore(false)
  .on(onOpen, () => true)
  .on(onClose, () => false)
  .on(toggle, (state) => !state)
