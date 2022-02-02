import {Box} from '@mui/material'
import {useStore} from 'effector-react'
import React from 'react'
import {TestContentModel} from '../..'
import {TypeText, TypeCheckbox, TypeRadio, TypeEditor} from './AnswerTypes'

export const AnswerByType = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)
  const ansType = currQsn.Type

  const Components: {[key: number]: React.FC} = {
    0: TypeCheckbox,
    1: TypeRadio,
    2: TypeRadio,
    3: TypeText,
    4: TypeEditor,
    5: TypeEditor,
    6: TypeEditor,
    7: TypeEditor,
    8: TypeEditor,
  }
  const CurrAnsComponent = Components[ansType] || Unimplemented

  // console.log(currQsn)
  return (
    <Box display="flex" flexDirection="column">
      <CurrAnsComponent key={currQsn.Id}></CurrAnsComponent>
    </Box>
  )
}

const Unimplemented: React.FC = () => {
  return <div>unimplemented</div>
}
