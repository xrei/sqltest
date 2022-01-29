import React from 'react'
import {RadioGroup, FormControlLabel, Radio} from '@mui/material'
import {useStore} from 'effector-react'
import {TestContentModel} from 'src/features/Test'

export const TypeRadio: React.FC = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)
  const answers = currQsn.Answers

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value
    TestContentModel.changeTypeGenericAnswer({value: v, qId: currQsn.Id})
  }

  return (
    <RadioGroup name="answer-radio" value={currQsn.UserAnswer} onChange={onInput}>
      {answers.map((answ) => (
        <FormControlLabel key={answ.Id} value={answ.Id} control={<Radio />} label={answ.Content} />
      ))}
    </RadioGroup>
  )
}
