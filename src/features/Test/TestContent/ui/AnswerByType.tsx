import {Box} from '@mui/material'
import {useStore} from 'effector-react'
import React from 'react'
import {TestContentModel} from '../..'
import {TypeText, TypeCheckbox, TypeRadio} from './AnswerTypes'

export const AnswerByType = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)
  const ansType = currQsn.Type

  const Components: {[key: number]: React.FC} = {
    0: TypeCheckbox,
    1: TypeRadio,
    2: TypeRadio,
    3: TypeText,
  }
  const CurrAnsComponent = Components[ansType] || Unimplemented

  return (
    <Box display="flex" flexDirection="column">
      <CurrAnsComponent></CurrAnsComponent>
    </Box>
  )
}

const Unimplemented: React.FC = () => {
  return <div>unimplemented</div>
}
