import {useStore} from 'effector-react'
import React from 'react'
import {TestContentModel} from '../..'
import {TypeText} from './AnswerTypes'

export const AnswerByType = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)
  const ansType = currQsn.Type

  const Components: {[key: number]: React.FC} = {
    3: TypeText,
  }
  const CurrAnsComponent = Components[ansType] || Unimplemented

  return (
    <div>
      <CurrAnsComponent></CurrAnsComponent>
    </div>
  )
}

const Unimplemented: React.FC = () => {
  return <div>unimplemented</div>
}
