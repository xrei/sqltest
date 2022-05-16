import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material'
import type {Subject} from 'src/types'

interface SubjectSelectorProps {
  list: Subject[]
  value: string
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}
export const SubjectSelector: React.FC<SubjectSelectorProps> = ({list, value, onChange}) => {
  return (
    <FormControl sx={{maxWidth: 'sm', mr: 2}} fullWidth variant="outlined" size="small">
      <InputLabel id="adm-group-sel">Дисциплина</InputLabel>
      <Select value={value} labelId="adm-group-sel" label="Дисциплина" onChange={onChange}>
        {list.map((x) => (
          <MenuItem dense key={x.SubjectId} value={x.SubjectId}>
            {x.SubjectName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
