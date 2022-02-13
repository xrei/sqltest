import {createGate} from 'effector-react'
import {TestContentModel} from 'src/features/Test'

export const TestResultsGate = createGate()

TestContentModel.$testResults.reset(TestResultsGate.close)
