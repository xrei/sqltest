import {createEvent, createStore} from 'effector'

type dialog = 'login' | 'register'

export const $loginOpen = createStore(false)
export const $registerOpen = createStore(false)
export const dialogOpened = createEvent<dialog>()
export const dialogClosed = createEvent()

$loginOpen.on(dialogOpened, (_, type) => type === 'login')
$loginOpen.on(dialogClosed, () => false)
$registerOpen.on(dialogOpened, (_, type) => type === 'register')
$registerOpen.on(dialogClosed, () => false)
