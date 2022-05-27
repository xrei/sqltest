import {createGate} from 'effector-react'
import {TestContentModel} from 'src/features/StudentTest'

export const TestResultsGate = createGate()

TestContentModel.$testResults.reset(TestResultsGate.close)
