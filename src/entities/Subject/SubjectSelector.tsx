import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  SxProps,
  Theme as MuiTheme,
  FormControlProps,
} from '@mui/material'
import type {Subject} from 'src/types'

interface SubjectSelectorProps extends FormControlProps {
  list: Subject[]
  value: string
  onSelectChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
  sx?: SxProps<MuiTheme>
}
export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  list,
  value,
  onSelectChange,
  sx = {},
  ...other
}) => {
  return (
    <FormControl
      sx={{maxWidth: 'sm', mr: 2, ...sx}}
      fullWidth
      variant="outlined"
      size="small"
      {...other}
    >
      <InputLabel id="adm-group-sel">Дисциплина</InputLabel>
      <Select value={value} labelId="adm-group-sel" label="Дисциплина" onChange={onSelectChange}>
        {list.map((x) => (
          <MenuItem dense key={x.SubjectId} value={x.SubjectId}>
            {x.SubjectName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
