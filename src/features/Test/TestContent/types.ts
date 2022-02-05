import {Test, Theme, Question, TestResult} from 'src/types'

export type TestResultStore = {
  completedTheme: Theme
  completedTest: Test
  testResult: TestResult
}

export type ChangeAnswerGenericPayload = {
  qId: number
  value: string
}

export type ChangeAnswerCheckboxPayload = {
  qId: number
  value: boolean
  answId: number
}
