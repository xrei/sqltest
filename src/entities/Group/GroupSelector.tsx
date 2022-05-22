import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material'
import {StudentGroup} from 'src/types'

interface GroupSelectorProps {
  list: StudentGroup[]
  value: string
  disabled?: boolean
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}
export const GroupSelector: React.FC<GroupSelectorProps> = ({list, value, onChange, disabled}) => {
  return (
    <FormControl
      sx={{maxWidth: 'sm', mr: 2}}
      fullWidth
      variant="outlined"
      size="small"
      disabled={disabled}
    >
      <InputLabel id="adm-group-sel">Группа</InputLabel>
      <Select value={value} labelId="adm-group-sel" label="Группа" onChange={onChange}>
        {list.map((x) => (
          <MenuItem dense key={x.GroupValue} value={x.GroupValue}>
            {x.GroupNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
