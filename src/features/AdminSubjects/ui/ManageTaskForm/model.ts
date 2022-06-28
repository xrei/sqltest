import type {SelectChangeEvent} from '@mui/material'
import type {ChangeEvent} from 'react'
import {createEvent, createStore, combine, sample, attach, createEffect, restore} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel} from 'src/entities/Theme'
import {AdminAddTaskDTO, Answer} from 'src/types'
import {fetchDatabasesFx} from './dbModel'
import {adminAddQuestion, adminGetQuestion, adminEditQuestion, adminEditAnswer} from 'src/api'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import {omit} from 'ramda'
import {reset} from 'src/shared/lib/reset'
import {history} from 'src/app/router/appHistory'
import {adminRoutes} from 'src/app/router/paths'

let id = 0

export const ManageTaskFormGate = createGate<{taskId?: number}>()

export const getTaskByIdFx = createEffect(async (id: number) => {
  try {
    const res = await (await adminGetQuestion({QsnId: id})).json()
    console.log(res)

    return res
  } catch (err) {
    console.log(err)
    return null
  }
})

sample({
  clock: ManageTaskFormGate.open,
  filter: (clok) => Boolean(clok.taskId),
  fn: ({taskId}) => taskId as number,
  target: getTaskByIdFx,
})

sample({
  clock: ManageTaskFormGate.open,
  target: fetchDatabasesFx,
})

export const $questionEdit = restore(getTaskByIdFx.doneData, null)

export const $taskDefaultContent = createStore('')
export const $taskText = createStore('')
export const $taskSubjectId = createStore('')
export const $taskThemeId = createStore('')
export const $taskDifficulty = createStore<string | number>('0')
export const $taskCategory = createStore<string | number>('0')
export const $taskType = createStore('0')
export const $selectedDbId = createStore('')
export const $taskAnswers = createStore<Answer[]>([])
export const $answToAdd = createStore<Answer>({Content: '', Correct: true, Id: 0})

export const taskTextChanged = createEvent<string>()
export const taskDifficultyChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const taskCategoryChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const taskTypeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()
export const dbSelected = createEvent<SelectChangeEvent<string>>()
export const answerContentChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const answerCorrectChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const answerAddClicked = createEvent()
export const deleteAnswerClicked = createEvent<number>()
export const editAnswerClicked = createEvent<Answer>()
export const changeAnswerVisibilityClicked = createEvent<number>()

$taskText.on(taskTextChanged, (_, e) => e)
$taskSubjectId.on(subjSelected, (_, e) => e.target.value)
$taskThemeId.on(themeSelected, (_, e) => e.target.value)
$taskDifficulty.on(taskDifficultyChanged, (_, e) => e.target.value)
$taskCategory.on(taskCategoryChanged, (_, e) => e.target.value)
$taskType.on(taskTypeChanged, (_, e) => e.target.value)
$selectedDbId.on(dbSelected, (_, e) => e.target.value)

$answToAdd.on(answerContentChanged, (state, e) => ({...state, Content: e.target.value}))
$answToAdd.on(answerCorrectChanged, (state, e) => ({...state, Correct: e.target.checked}))
$answToAdd.on(editAnswerClicked, (state, answ) => answ)

$taskAnswers.on(deleteAnswerClicked, (state, id) => state.filter((a) => a.Id !== id))
$taskAnswers.on(changeAnswerVisibilityClicked, (state, id) =>
  state.map((a) => (a.Id === id ? {...a, Correct: !a.Correct} : a))
)

sample({
  clock: answerAddClicked,
  source: {answ: $answToAdd, taskAnswers: $taskAnswers},
  fn: ({answ, taskAnswers}) => {
    if (taskAnswers.find((x) => x.Id === answ.Id)) {
      return taskAnswers.map((v) => {
        return v.Id === answ.Id ? answ : v
      })
    } else {
      id = id + 1
      const newAnswer: Answer = {...answ, Id: id}
      return [...taskAnswers, newAnswer]
    }
  },
  target: $taskAnswers,
})

sample({
  clock: $taskSubjectId,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

const $addForm = combine({
  Category: $taskCategory,
  Content: $taskText,
  Difficulty: $taskDifficulty,
  NumInTest: $taskThemeId,
  SubjectId: $taskSubjectId,
  Type: $taskType,
  DatabaseId: $selectedDbId,
  Answers: $taskAnswers,
})

export const addTaskFx = attach({
  source: $addForm,
  async effect(form) {
    if (!checkFormValidity(form)) {
      enqueueAlert({message: 'Необходимо заполнить все поля!', variant: 'error'})
      return
    }

    const taskAnswers = form.Answers.map((answer) => ({
      Content: answer.Content,
      Correct: answer.Correct,
    }))
    const payload: AdminAddTaskDTO = {
      ...form,
      Answers: taskAnswers,
    }

    const res = await (await adminAddQuestion(payload)).json()

    enqueueAlert({message: 'Новое учебное задание успешно создано!'})
    return res
  },
})

export const editTaskFx = attach({
  source: $addForm,
  async effect(form) {
    if (!checkFormValidity(form)) {
      enqueueAlert({message: 'Необходимо заполнить все поля!', variant: 'error'})
      return
    }

    const editAnswers = Promise.all(
      form.Answers.map(async (answer) => {
        const res = await adminEditAnswer(answer)
        return res
      })
    )
    const payload: AdminAddTaskDTO = {
      ...form,
    }
    const res = await (await adminEditQuestion(payload)).json()

    history.push(adminRoutes.tests)

    enqueueAlert({message: 'Учебное задание успешно отредактировано!'})
    return res
  },
})

export const editAnswerFx = attach({
  source: $taskAnswers,
  async effect(answers) {
    const res = await (await adminEditAnswer(answers[0])).json()
    return res
  },
})

reset({
  stores: [
    $taskText,
    $taskSubjectId,
    $taskThemeId,
    $taskDifficulty,
    $taskCategory,
    $taskType,
    $selectedDbId,
    $taskAnswers,
    $answToAdd,
    $taskDefaultContent,
  ],
  trigger: addTaskFx.doneData,
})
reset({
  stores: [
    $taskText,
    $taskSubjectId,
    $taskThemeId,
    $taskDifficulty,
    $taskCategory,
    $taskType,
    $selectedDbId,
    $taskAnswers,
    $answToAdd,
    $taskDefaultContent,
  ],
  trigger: editTaskFx.doneData,
})
reset({
  stores: [
    $taskText,
    $taskSubjectId,
    $taskThemeId,
    $taskDifficulty,
    $taskCategory,
    $taskType,
    $selectedDbId,
    $taskAnswers,
    $answToAdd,
    $taskDefaultContent,
  ],
  trigger: ManageTaskFormGate.close,
})

$addForm.watch((form) => console.log('form: ', form))

function checkFormValidity(form: AdminAddTaskDTO) {
  const validator = <T extends Record<any, any>>(obj: T) =>
    Object.values(obj).every((val) => val.toString().length > 0)

  if ([0, 1, 2, 3].some((v) => v === Number(form.Type))) {
    return validator(omit(['DatabaseId'], form))
  }
  return validator(form)
}

// edit questions reducers
$taskDefaultContent.on(getTaskByIdFx.doneData, (_, q) => q?.Content)
$taskDifficulty.on(getTaskByIdFx.doneData, (_, q) => q?.Difficulty)
$taskCategory.on(getTaskByIdFx.doneData, (_, q) => q?.Category)
$taskType.on(getTaskByIdFx.doneData, (_, q) => String(q?.Type))
$selectedDbId.on(getTaskByIdFx.doneData, (_, q) => String(q?.DatabaseId))
$taskThemeId.on(getTaskByIdFx.doneData, (_, q) => String(q?.ThemeId))
$taskSubjectId.on(getTaskByIdFx.doneData, (_, q) => String(q?.SubjectId))
$taskAnswers.on(getTaskByIdFx.doneData, (_, q) => q?.Answers ?? [])

// $taskAnswers.reset([$taskType])
$answToAdd.reset([$taskType, $taskAnswers])
