import {attach, createEvent, createStore, forward} from 'effector'
import {getRA} from 'src/api'
import * as TestContentModel from '../../model'

export const $answer = createStore<string[]>([])

export const $dialogOpen = createStore(false)
export const dialogToggled = createEvent()

$dialogOpen.on(dialogToggled, (s) => !s)

const fetchRightFx = attach({
  source: TestContentModel.$currentQestionId,
  async effect(id) {
    const res = await (await getRA({Id: id})).json()

    return res
  },
})

$answer.on(fetchRightFx.doneData, (s, answ) => answ)

export const onRightAnswClicked = createEvent()

forward({
  from: onRightAnswClicked,
  to: fetchRightFx,
})

forward({
  from: onRightAnswClicked,
  to: dialogToggled,
})

$answer.reset(TestContentModel.finishTestFx.doneData)
$dialogOpen.reset(TestContentModel.finishTestFx.doneData)
