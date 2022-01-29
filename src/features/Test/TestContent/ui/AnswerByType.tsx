import {useStore} from 'effector-react'
import React from 'react'
import {TestContentModel} from '../..'
import {TypeText} from './AnswerTypes'
import {AnswerProps} from './AnswerTypes/types'

export const AnswerByType = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)
  const ansType = currQsn.Type

  const onAnswerChange = (val: string | boolean) => {
    console.log(val)
  }

  const Components: {[key: number]: React.FC<AnswerProps>} = {
    3: TypeText,
  }
  const CurrAnsComponent = Components[ansType] || Unimplemented

  return (
    <div>
      <CurrAnsComponent changeAnswer={onAnswerChange}></CurrAnsComponent>
    </div>
  )
}

const Unimplemented: React.FC = () => {
  return <div>unimplemented</div>
}
