import React, {useState} from 'react'
import {TextField} from '@mui/material'

export const TypeText: React.FC = (props) => {
  const [val, setVal] = useState('')

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value
    setVal(v)
  }

  return (
    <TextField value={val} onChange={onInput} placeholder="Введите ответ" fullWidth></TextField>
  )
}
