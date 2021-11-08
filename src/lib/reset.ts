import {Store, Event, Effect} from 'effector'

export function reset<S>(_: {
  stores: Array<Store<any>>
  trigger: Effect<any, any> | Event<any>
}): void
export function reset({
  stores,
  trigger,
}: {
  stores: Array<Store<any>>
  trigger: Effect<any, any> | Event<any>
}) {
  stores.map((store) => {
    store.reset([trigger])
  })
}
