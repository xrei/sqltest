import React, {useState} from 'react'
import {TextField} from '@mui/material'
import type {AnswerProps} from './types'

export const TypeText: React.FC<AnswerProps> = (props) => {
  const [val, setVal] = useState('')

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value
    setVal(v)
    props.changeAnswer(v)
  }

  return (
    <TextField value={val} onChange={onInput} placeholder="Введите ответ" fullWidth></TextField>
  )
}
