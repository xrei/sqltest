import {createGate} from 'effector-react'
import {TestContentModel} from 'src/features/Test'

export const TestResultsGate = createGate()
console.log(TestContentModel)

TestContentModel.$testResults.reset(TestResultsGate.close)
