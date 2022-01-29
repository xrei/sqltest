import React from 'react'
import {TextField} from '@mui/material'
import {TestContentModel} from 'src/features/Test'
import {useStore} from 'effector-react'

export const TypeText: React.FC = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value
    TestContentModel.changeTypeGenericAnswer({value: v, qId: currQsn.Id})
  }

  return (
    <TextField
      value={currQsn.UserAnswer || ''}
      onChange={onInput}
      placeholder="Введите ответ"
      fullWidth
    ></TextField>
  )
}
