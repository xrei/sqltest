import {createEffect, createEvent, createStore, sample, forward, Event} from 'effector'

type Params = {
  start: Event<number>
  abort: Event<void>
  timeout: number
}

export function createCountdown(
  name: string,
  {start, abort = createEvent(`${name}Reset`), timeout = 1000}: Params
) {
  // tick every 1 second
  const $working = createStore(true, {name: `${name}Working`})
  const tick = createEvent<number>(`${name}Tick`)
  const timerFx = createEffect<number, Promise<void>>(`${name}Timer`).use(() => wait(timeout))

  $working.on(abort, () => false).on(start, () => true)

  sample({
    source: start,
    filter: timerFx.pending.map((is) => !is),
    target: tick,
  })

  forward({
    from: tick,
    to: timerFx,
  })

  const willTick = sample({
    source: timerFx.done.map(({params}) => params - 1),
    filter: (seconds) => seconds >= 0,
  })

  sample({
    source: willTick,
    filter: $working,
    target: tick,
  })

  const finished = sample({
    source: timerFx.done,
    filter: ({params}) => params - 1 === 0,
    fn: ({params}) => params - 1,
  })

  return {tick, $working, finished}
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
