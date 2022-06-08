import type {SelectChangeEvent} from '@mui/material'
import type {ChangeEvent} from 'react'
import {createStore, createEvent, createEffect, sample, attach, combine, allSettled} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel} from 'src/entities/Theme'
import {
  adminCreateTest,
  adminGetCountQuestionsForTheme,
  adminGetCountQuestionsForThemeCategory,
} from 'src/api'
import {
  $categoriesForms,
  $themeForms,
  createCategoriesFormWithId,
  createFormWithId,
} from './createForm'
import {isEmpty} from 'ramda'

type GateProps = {testId?: number}
export const ManageTestFormGate = createGate<GateProps>()

//#region state
export const $testName = createStore('')
export const $testDescription = createStore('')
// 0 - обычный, 1 - итоговый
export const $testType = createStore<'0' | '1'>('0')

// Режим обучения:
// 0 - не использовать, 1 - показывать правильный рез., 2 - показывать правильность ответа
export const $testLearnMode = createStore<'0' | '1' | '2'>('0')

export const $testSubjectId = createStore('')
export const $testThemeId = createStore('')
export const $testManyThemeId = createStore<string[]>([])

export const $testTime = createStore(0)
export const $testTryCount = createStore(0)

export const $scorePerc = createStore({
  2: '',
  3: '',
  4: '',
  5: '',
})
export const $testHelp = createStore('')

type ThemeCounts = {
  questions: {
    themeId: number
    counts: number[]
  }[]
  categories: {
    themeId: number
    counts: number[]
  }[]
}

export const $countQsnsForThemes = createStore<ThemeCounts>({questions: [], categories: []})
//#endregion state

export const testNameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testDescriptionChanged = createEvent<string>()
export const testTypeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testLearnModeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testTimeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testTryCountChanged = createEvent<ChangeEvent<HTMLInputElement>>()

export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()
export const manyThemesSelected = createEvent<SelectChangeEvent<string[]>>()
export const scorePercKeyChanged = createEvent<{key: number; value: string}>()
export const testHelpChanged = createEvent<string>()

export const addTestClicked = createEvent()

const getQsnCountsForManyThemesFx = createEffect(async (ids: string[]) => {
  const questions = await Promise.all(
    ids.map((id) =>
      adminGetCountQuestionsForTheme({ThemeId: id})
        .then((res) => res.json())
        .then((res) => ({themeId: Number(id), counts: res}))
    )
  )
  const categories = await Promise.all(
    ids.map((id) =>
      adminGetCountQuestionsForThemeCategory({ThemeId: id})
        .then((r) => r.json())
        .then((res) => ({themeId: Number(id), counts: res}))
    )
  )
  const res = {
    questions,
    categories,
  }
  return res
})

$testName.on(testNameChanged, (_, e) => unboxEventVal(e))
$testDescription.on(testDescriptionChanged, (_, e) => e)
$testType.on(testTypeChanged, (_, e) => unboxEventVal(e) as '0' | '1')
$testLearnMode.on(testLearnModeChanged, (_, e) => unboxEventVal(e) as '0' | '1' | '2')
$testTime.on(testTimeChanged, (_, e) => Number(unboxEventVal(e)))
$testTryCount.on(testTryCountChanged, (_, e) => Number(unboxEventVal(e)))
$testSubjectId.on(subjSelected, (_, e) => e.target.value)
$testThemeId.on(themeSelected, (_, e) => e.target.value)
$testManyThemeId.on(manyThemesSelected, (_, e) => e.target.value as unknown as string[])
$testManyThemeId.on(themeSelected, (_, e) => [e.target.value] as unknown as string[])

$scorePerc.on(scorePercKeyChanged, (state, payload) => ({...state, [payload.key]: payload.value}))

$countQsnsForThemes.on(getQsnCountsForManyThemesFx.doneData, (_, data) => data)

const $form = combine({
  SubjectId: $testSubjectId,
  TestCount: $testTryCount,
  TestDescription: $testDescription,
  TestName: $testName,
  TestTimeFromDB: $testTime,
  TestType: $testType,
  TestHelp: $testHelp,
  viewCorrectAndRight: $testLearnMode,
  perc2: $scorePerc.map((s) => s[2]),
  perc3: $scorePerc.map((s) => s[3]),
  perc4: $scorePerc.map((s) => s[4]),
  perc5: $scorePerc.map((s) => s[5]),
})

const addTestFx = attach({
  source: {
    form: $form,
    themeIds: $testManyThemeId,
    qsnCountsForms: $themeForms,
    categoriesCountsForms: $categoriesForms,
  },
  async effect({form, themeIds, qsnCountsForms, categoriesCountsForms}) {
    const themesList = themeIds.map((id) => {
      const qsnCountForm = qsnCountsForms.find((v) => Number(v.optionId) === Number(id))
      const qsnCategForm = categoriesCountsForms.find((v) => Number(v.optionId) === Number(id))
      const countsFields = qsnCountForm?.$fields.getState()
      const categoriesFields = qsnCategForm?.$fields.getState()

      return {
        countKnow: categoriesFields?.countKnow,
        countCan: categoriesFields?.countCan,
        countOwn: categoriesFields?.countOwn,
        countEasy: countsFields?.countEasy,
        countMiddle: countsFields?.countMiddle,
        countComplex: countsFields?.countHard,
        themeId: Number(id),
      }
    })
    console.log(themesList)
    const testDto = {
      ...form,
      themesList,
      // $TODO: add forms
      appointmentsForCurrentTest: [
        {
          Name: '123',
          GroupId: 166,
          GotAppointment: 1,
          Students: [
            {
              FIO: 'Rei',
              StuId: 2428,
              GotAppointment: 0,
            },
          ],
        },
      ],
    }

    const res = await (await adminCreateTest(testDto)).json()
    console.log(res)
    return res
  },
})

$form.watch((form) => {
  console.log('Test form', form)
})

sample({
  clock: $testSubjectId,
  fn: (id) => Number(id),
  target: ThemesModel.fetchAdminThemesFx,
})

sample({
  clock: [$testManyThemeId, $testThemeId],
  filter: (clock) => !isEmpty(clock),
  fn: (clock) => {
    if (Array.isArray(clock)) return clock
    return [clock]
  },
  target: getQsnCountsForManyThemesFx,
})

sample({
  clock: [$testManyThemeId, $testThemeId],
  filter: (clock) => !isEmpty(clock),
  fn: (clock) => {
    if (Array.isArray(clock)) return clock.map((optId) => createFormWithId(optId))
    return [createFormWithId(clock)]
  },
  target: $themeForms,
})
sample({
  clock: [$testManyThemeId, $testThemeId],
  filter: (clock) => !isEmpty(clock),
  fn: (clock) => {
    if (Array.isArray(clock)) return clock.map((optId) => createCategoriesFormWithId(optId))
    return [createCategoriesFormWithId(clock)]
  },
  target: $categoriesForms,
})

sample({
  clock: addTestClicked,
  target: addTestFx,
})

const resetStores = [$testSubjectId, $testType]

$themeForms.reset([...resetStores])
$categoriesForms.reset([...resetStores])
$testThemeId.reset([...resetStores])
$testManyThemeId.reset([...resetStores])
$countQsnsForThemes.reset([...resetStores])

function unboxEventVal<T extends HTMLInputElement>(e: ChangeEvent<T>) {
  return e.target.value
}
