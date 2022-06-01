import {ChangeEvent} from 'react'
import {attach, createEffect, createEvent, createStore, sample, split} from 'effector'
import {createGate} from 'effector-react'
import type {SubjectDTO} from 'src/types'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import {isEmpty} from 'ramda'
import {AdminSubjectsModel} from '../..'
import {reset} from 'src/shared/lib/reset'
import {adminAddSubject, adminEditSubject} from 'src/api'
import {history} from 'src/app/router/appHistory'
import {adminRoutes} from 'src/app/router/paths'

export const ManageSubjectFormGate = createGate<{subjId?: number}>()

export const $subjectDto = createStore<SubjectDTO>({
  Description: '',
  SubjId: 0,
  SubjName: '',
})
export const $subjectDescr = createStore('')

const getSubjectById = createEvent<{subjId: number}>()
export const subjectNameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const subjectDescrChanged = createEvent<string>()
export const addSubjectClicked = createEvent()
export const editSubjectClicked = createEvent()

const fetchSubjectsListFx = createEffect(async ({subjId}: {subjId?: number}) => {
  if (!subjId) return
  await AdminSubjectsModel.fetchAdminTestListFx()
  getSubjectById({subjId})
})

const addSubjectFx = attach({
  source: {
    subjDto: $subjectDto,
    descr: $subjectDescr,
  },
  async effect({subjDto, descr}) {
    const payload: SubjectDTO = {
      Description: descr,
      SubjName: subjDto.SubjName,
    }
    const res = await (await adminAddSubject(payload)).json()

    enqueueAlert({message: `Дисциплина ${subjDto.SubjName} успешно добавлена`})
    history.push(adminRoutes.tests)
    return res
  },
})

const editSubjectFx = attach({
  source: {
    subjDto: $subjectDto,
    descr: $subjectDescr,
  },
  async effect({subjDto, descr}) {
    if (!subjDto.SubjId) {
      enqueueAlert({message: `Ошибка! Id дисциплины не существует!`, variant: 'error'})
      throw Error('subject id is not defined')
    }
    const payload: SubjectDTO = {
      SubjId: subjDto.SubjId,
      Description: descr,
      SubjName: subjDto.SubjName,
    }
    const res = await (await adminEditSubject(payload)).json()

    enqueueAlert({message: `Дисциплина ${subjDto.SubjName} успешно отредактирована`})
    return res
  },
})

$subjectDescr.on(subjectDescrChanged, (_, value) => value)
$subjectDto.on(subjectNameChanged, (state, e) => ({...state, SubjName: e.target.value}))

sample({
  clock: ManageSubjectFormGate.open,
  source: AdminSubjectsModel.$subjectsList,
  filter: (source) => isEmpty(source),
  fn: (_, {subjId}) => ({subjId}),
  target: fetchSubjectsListFx,
})

sample({
  clock: [ManageSubjectFormGate.open, getSubjectById],
  source: AdminSubjectsModel.$subjectsList,
  filter: (source, clock) => {
    const subjId = clock.subjId
    if (!subjId || typeof subjId !== 'number') return false
    const hasList = Boolean(source.length)
    const hasSubject = Boolean(source.find((subj) => subj.SubjId === subjId))
    return hasList && hasSubject
  },
  fn: (source, {subjId}) => source.find((subj) => subj.SubjId === subjId)!,
  target: $subjectDto,
})

sample({
  clock: addSubjectClicked,
  target: addSubjectFx,
})

sample({
  clock: editSubjectClicked,
  target: editSubjectFx,
})

reset({
  stores: [$subjectDto, $subjectDescr],
  trigger: ManageSubjectFormGate.close,
})
reset({
  stores: [$subjectDto, $subjectDescr],
  trigger: addSubjectFx.doneData,
})
