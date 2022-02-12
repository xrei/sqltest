import {attach, createEvent, createStore} from 'effector'
import {ChangeEvent} from 'react'
import {sendErrorMessageWithInfo} from 'src/api'
import {$user} from 'src/features/User/model'
import * as TestContentModel from '../../model'

export const $isOpen = createStore(false)
export const toggleIncorrectQsnDialog = createEvent()

$isOpen.on(toggleIncorrectQsnDialog, (s) => !s)

export const $value = createStore('')
export const setValue = createEvent<ChangeEvent<HTMLInputElement>>()
$value.on(setValue, (_, e) => e.target.value)

export const sendErrorMessageWithParamsFx = attach({
  source: [$user, TestContentModel.$currentQestionId, TestContentModel.$currentTheme, $value],
  async effect([user, qsnId, theme, value]) {
    if (!user || !theme) return
    const userId = user.Id
    const themeId = theme.ThemeId

    const res = await sendErrorMessageWithInfo({
      ErrorMessage: value,
      QuestionId: qsnId,
      TestId: themeId,
      StuId: userId,
    })
    const result = await res.json()
    if (result === 'OK') return true
  },
})

$value.reset(sendErrorMessageWithParamsFx.doneData)
