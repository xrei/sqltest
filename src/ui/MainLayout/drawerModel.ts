import {createEvent, createStore} from 'effector'
import {reset} from 'src/shared/lib/reset'

export const onOpen = createEvent()
export const onClose = createEvent()
export const toggle = createEvent()

export const $drawer = createStore(false)
  .on(onOpen, () => true)
  .on(onClose, () => false)
  .on(toggle, (state) => !state)

export const adminDrawerOpened = createEvent()
export const adminDrawerClosed = createEvent()
export const adminDrawerToggled = createEvent()

export const adminDrawerMobOpened = createEvent()
export const adminDrawerMobClosed = createEvent()
export const adminDrawerMobToggled = createEvent()

export const adminDrawersResetted = createEvent()

export const $adminDrawer = createStore(false)
  .on(adminDrawerOpened, () => true)
  .on(adminDrawerClosed, () => false)
  .on(adminDrawerToggled, (v) => !v)

export const $adminMobDrawer = createStore(false)
  .on(adminDrawerMobOpened, () => true)
  .on(adminDrawerMobClosed, () => false)
  .on(adminDrawerMobToggled, (v) => !v)

reset({
  stores: [$adminDrawer, $adminMobDrawer],
  trigger: adminDrawersResetted,
})
