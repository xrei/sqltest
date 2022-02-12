import {createStore, createEvent, attach, forward} from 'effector'
import {getAvailableSubjects} from 'src/api'
import {Subject} from 'src/types'
import {$user} from 'src/features/User/model'
import {loginFx} from 'src/features/Auth/loginModel'
import {registerFx} from 'src/features/Auth/registerModel'
import type {SelectChangeEvent} from '@mui/material'

export const $availableSubjects = createStore<Subject[]>([])

export const fetchSubjectsFx = attach({
  source: $user,
  async effect(user) {
    if (!user) return []
    console.log('fetch subj')
    const res = await (await getAvailableSubjects({Id: user.Id})).json()
    return res
  },
})

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
