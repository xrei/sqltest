import {ChangeEvent} from 'react'
import {SelectChangeEvent} from '@mui/material'
import {createStore, createEvent, createEffect, sample} from 'effector'
import {createGate} from 'effector-react'
import {getStudentsForGroup, postAddAdminStudent, postDeleteStudent, postEditStudent} from 'src/api'
import type {Student, StudentDto} from 'src/types'

export const AdminManageStudentsPageGate = createGate()

export const $selectedGroup = createStore<string>('')
export const $students = createStore<Student[]>([])
export const $studentDialog = createStore(false)

export const $studentDto = createStore<StudentDto>({
  FIO: '',
  groupId: '',
})
export const $isEditing = $studentDto.map((stud) => typeof stud.id !== 'undefined')

export const fioChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const studGroupChanged = createEvent<SelectChangeEvent<string>>()
export const groupChanged = createEvent<SelectChangeEvent<string>>()
export const dialogToggled = createEvent()
export const showStudentsClicked = createEvent()
export const addToEditStudentClicked = createEvent<Student>()
export const editStudentClicked = createEvent()
export const addStudentClicked = createEvent()
export const deleteStudentClicked = createEvent<Student>()

$studentDto.on(fioChanged, (state, e) => ({...state, FIO: e.target.value}))
$studentDto.on(studGroupChanged, (state, e) => ({...state, groupId: e.target.value}))
$studentDto.on(addToEditStudentClicked, (state, student) => ({
  FIO: student.FIO,
  groupId: String(student.groupId),
  id: student.id,
}))

$studentDialog.on(dialogToggled, (s) => !s)
$studentDialog.on(addToEditStudentClicked, () => true)
$selectedGroup.on(groupChanged, (s, e) => e.target.value)

const fetchStudentsFx = createEffect<number, Student[]>(async (groupId) => {
  const res = await (await getStudentsForGroup({GroupValue: groupId})).json()
  return res
})

$students.on(fetchStudentsFx.doneData, (s, p) => p)

const addStudentFx = createEffect<StudentDto, string>(async (params) => {
  const res = await (
    await postAddAdminStudent({FIO: params.FIO, groupId: Number(params.groupId)})
  ).json()
  return res
})
const editStudentFx = createEffect<StudentDto, string>(async (params) => {
  const res = await (await postEditStudent(params)).json()
  return res
})
const deleteStudentFx = createEffect<Student, string>(async (params) => {
  const res = await (await postDeleteStudent({id: params.id})).json()
  return res
})

sample({
  clock: deleteStudentClicked,
  filter: (student) => Boolean(student.id),
  target: deleteStudentFx,
})

sample({
  source: $studentDto,
  clock: editStudentClicked,
  filter: (student) => Boolean(student.FIO) && Boolean(student.groupId) && Boolean(student.id),
  target: editStudentFx,
})

sample({
  source: $studentDto,
  clock: addStudentClicked,
  filter: (student) => Boolean(student.FIO) && Boolean(student.groupId),
  target: addStudentFx,
})

sample({
  source: $selectedGroup,
  clock: [showStudentsClicked, editStudentFx.done, addStudentFx.done, deleteStudentFx.done],
  filter: (id) => Boolean(id),
  fn: (id) => Number(id),
  target: fetchStudentsFx,
})

$studentDialog.reset([editStudentFx.doneData, addStudentFx.doneData])
