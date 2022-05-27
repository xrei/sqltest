import React from 'react'
import {Checkbox, FormControlLabel} from '@mui/material'
import {useStore} from 'effector-react'
import {$currQuestion, changeTypeCheckboxAnswer} from '../../model'

export const TypeCheckbox: React.FC = () => {
  const currQsn = useStore($currQuestion)
  const answers = currQsn.Answers

  const onInput = (event: React.ChangeEvent<HTMLInputElement>, answId: number) => {
    const v = event.target.checked
    changeTypeCheckboxAnswer({value: v, qId: currQsn.Id, answId})
  }

  return (
    <>
      {answers.map((answ) => (
        <FormControlLabel
          key={answ.Id}
          name={'answer-checkbox_' + answ.Id}
          control={
            <Checkbox
              checked={answ.Correct}
              value={answ.Correct}
              onChange={(e) => onInput(e, answ.Id)}
            />
          }
          label={<div dangerouslySetInnerHTML={{__html: answ.Content}} />}
        />
      ))}
    </>
  )
}
