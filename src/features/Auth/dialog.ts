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

export const $studentCodeOpen = createStore(false)
export const studentCodeOpened = createEvent()
export const studentCodeClosed = createEvent()

$studentCodeOpen.on(studentCodeClosed, () => false)
$studentCodeOpen.on(studentCodeOpened, () => true)
