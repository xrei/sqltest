import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  SxProps,
  Theme as MuiTheme,
} from '@mui/material'
import type {Subject} from 'src/types'

interface SubjectSelectorProps {
  list: Subject[]
  value: string
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
  sx?: SxProps<MuiTheme>
}
export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  list,
  value,
  onChange,
  sx = {},
}) => {
  return (
    <FormControl sx={{maxWidth: 'sm', mr: 2, ...sx}} fullWidth variant="outlined" size="small">
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
