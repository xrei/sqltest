import {createStore, createEvent, attach, guard, forward} from 'effector'
import {getAvailableSubjects} from 'src/api'
import {Subject} from 'src/types'
import {$user} from 'src/features/User/model'
import {loginFx} from 'src/features/Auth/loginModel'
import {registerFx} from 'src/features/Auth/registerModel'

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

export const $selectedSubject = createStore<Subject | null>(null)

export const selectSubject = createEvent<Subject>()

$selectedSubject.on(selectSubject, (_, s) => s)
