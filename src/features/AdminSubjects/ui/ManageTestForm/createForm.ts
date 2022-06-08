import {createStore, Store, createEvent, Event} from 'effector'

export type QuestionCountsFields = {
  countEasy: number
  countMiddle: number
  countHard: number
}

export type ThemeForm<T> = {
  optionId: string
  $fields: Store<T>
  changeField: Event<{key: string; value: string}>
}
export const $themeForms = createStore<ThemeForm<QuestionCountsFields>[]>([])

export const createFormWithId = (id: string): ThemeForm<QuestionCountsFields> => {
  const $fields = createStore<QuestionCountsFields>({
    countEasy: 0,
    countMiddle: 0,
    countHard: 0,
  })

  const changeField = createEvent<{key: string; value: string}>()

  $fields.on(changeField, (state, payload) => {
    return {...state, [payload.key]: payload.value}
  })

  return {
    optionId: id,
    $fields: $fields,
    changeField: changeField,
  }
}

$themeForms.watch((forms) => {
  console.log(forms)
  forms.map((f) => f.$fields.watch((field) => console.log(field)))
})

export type QuestionCategoriesFields = {
  countKnow: number
  countCan: number
  countOwn: number
}

export const $categoriesForms = createStore<ThemeForm<QuestionCategoriesFields>[]>([])

export const createCategoriesFormWithId = (id: string): ThemeForm<QuestionCategoriesFields> => {
  const $fields = createStore<QuestionCategoriesFields>({
    countKnow: 0,
    countCan: 0,
    countOwn: 0,
  })

  const changeField = createEvent<{key: string; value: string}>()

  $fields.on(changeField, (state, payload) => {
    return {...state, [payload.key]: payload.value}
  })

  return {
    optionId: id,
    $fields: $fields,
    changeField: changeField,
  }
}
