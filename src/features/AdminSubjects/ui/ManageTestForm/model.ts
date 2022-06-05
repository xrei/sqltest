import type {SelectChangeEvent} from '@mui/material'
import type {ChangeEvent} from 'react'
import {createStore, createEvent, createEffect, sample, attach, combine, allSettled} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel} from 'src/entities/Theme'
import {adminGetCountQuestionsForTheme, adminGetCountQuestionsForThemeCategory} from 'src/api'

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

export const $testTime = createStore(0)
export const $testTryCount = createStore(0)

export const $qsnCategories = createStore({
  can: 0,
  know: 0,
  own: 0,
})
export const $scorePerc = createStore({
  2: '',
  3: '',
  4: '',
  5: '',
})
export const $testHelp = createStore('')

export const $countQsnsForThemeCategory = createStore<number[]>([])
export const $countQsnsForThemeMap = $countQsnsForThemeCategory.map<{[key: string]: number}>(
  (counts) => ({
    know: counts[0] || 0,
    can: counts[1] || 0,
    own: counts[2] || 0,
  })
)
export const $countQsnsForTheme = createStore<number[]>([])
//#endregion state

export const testNameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testDescriptionChanged = createEvent<string>()
export const testTypeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testLearnModeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testTimeChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const testTryCountChanged = createEvent<ChangeEvent<HTMLInputElement>>()

export const subjSelected = createEvent<SelectChangeEvent<string>>()
export const themeSelected = createEvent<SelectChangeEvent<string>>()
export const scorePercKeyChanged = createEvent<{key: number; value: string}>()
export const qsnCategoriesChanged = createEvent<{key: string; value: number}>()
export const testHelpChanged = createEvent<string>()

const getQuestionsCountForThemeFx = createEffect(async (id: string) => {
  const payload = {ThemeId: id}
  const res = await Promise.allSettled([
    adminGetCountQuestionsForTheme(payload).then((r) => r.json()),
    adminGetCountQuestionsForThemeCategory(payload).then((r) => r.json()),
  ])

  if (res[0].status === 'fulfilled' && res[1].status === 'fulfilled') {
    return {
      qsnForTheme: res[0].value,
      qsnForThemeCategory: res[1].value,
    }
  } else
    return {
      qsnForTheme: [],
      qsnForThemeCategory: [],
    }
})

$testName.on(testNameChanged, (_, e) => unboxEventVal(e))
$testDescription.on(testDescriptionChanged, (_, e) => e)
$testType.on(testTypeChanged, (_, e) => unboxEventVal(e) as '0' | '1')
$testLearnMode.on(testLearnModeChanged, (_, e) => unboxEventVal(e) as '0' | '1' | '2')
$testTime.on(testTimeChanged, (_, e) => Number(unboxEventVal(e)))
$testTryCount.on(testTryCountChanged, (_, e) => Number(unboxEventVal(e)))
$testSubjectId.on(subjSelected, (_, e) => e.target.value)
$testThemeId.on(themeSelected, (_, e) => e.target.value)

$scorePerc.on(scorePercKeyChanged, (state, payload) => ({...state, [payload.key]: payload.value}))
$qsnCategories.on(qsnCategoriesChanged, (state, payload) => ({
  ...state,
  [payload.key]: payload.value,
}))

$countQsnsForTheme.on(getQuestionsCountForThemeFx.doneData, (state, data) => data.qsnForTheme)
$countQsnsForThemeCategory.on(
  getQuestionsCountForThemeFx.doneData,
  (state, data) => data.qsnForThemeCategory
)

const $form = combine({
  SubjectId: $testSubjectId,
  themeId: $testThemeId,
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
  valueCan: $qsnCategories.map((c) => c.can),
  valueKnow: $qsnCategories.map((c) => c.know),
  valueOwn: $qsnCategories.map((c) => c.own),
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
  clock: $testThemeId,
  fn: (id) => id,
  target: getQuestionsCountForThemeFx,
})

function unboxEventVal<T extends HTMLInputElement>(e: ChangeEvent<T>) {
  return e.target.value
}
