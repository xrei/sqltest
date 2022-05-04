import {createStore, createEvent, createEffect, sample} from 'effector'

export const $isEdit = createStore(false)
export const isEditToggled = createEvent()
$isEdit.on(isEditToggled, (state) => !state)

export const deleteAuthorClicked = createEvent()
