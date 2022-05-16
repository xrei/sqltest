import {createStore, createEvent, attach, forward} from 'effector'
import {getAdminSubjects, getAvailableSubjects, getPrepSubjects} from 'src/api'
import {Subject} from 'src/types'
import {$user} from 'src/features/User/model'
import {loginFx} from 'src/features/Auth/loginModel'
import {registerFx} from 'src/features/Auth/registerModel'
import type {SelectChangeEvent} from '@mui/material'

export const fetchSubjectsFx = attach({
  source: $user,
  async effect(user) {
    if (!user) return []
    if (user.Role === 2) {
      const res = await (await getAdminSubjects({Id: user.Id})).json()
      return res
    } else if (user.Role === 1) {
      const res = await (await getPrepSubjects({Id: user.Id})).json()
      return res
    }

    const res = await (await getAvailableSubjects({Id: user.Id})).json()

    return res
  },
})

export const $adminSubjects = createStore<Subject[]>([])

$adminSubjects.on(fetchSubjectsFx.doneData, (_, data) => data)

export const $availableSubjects = createStore<Subject[]>([])

$availableSubjects.on(fetchSubjectsFx.doneData, (_, data) => data)

// load subjects after login
forward({from: loginFx.done, to: fetchSubjectsFx})
// load subjects after register
forward({from: registerFx.done, to: fetchSubjectsFx})

export const $selectedSubjectId = createStore<string>('')

export const selectSubject = createEvent<SelectChangeEvent<string>>()
export const resetSelectedSubject = createEvent()

$selectedSubjectId.on(selectSubject, (_, s) => String(s.target.value))
$selectedSubjectId.reset(resetSelectedSubject)
