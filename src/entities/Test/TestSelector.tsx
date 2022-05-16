import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material'
import {Test} from 'src/types'

interface TestSelectorProps {
  list: Test[]
  value: string
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
  disabled?: boolean
}
export const TestSelector: React.FC<TestSelectorProps> = ({list, value, onChange, disabled}) => {
  return (
    <FormControl
      sx={{maxWidth: 'sm', mr: 2}}
      disabled={disabled}
      fullWidth
      variant="outlined"
      size="small"
    >
      <InputLabel id="adm-test-sel">Тест</InputLabel>
      <Select value={value} labelId="adm-test-sel" label="Тест" onChange={onChange}>
        {list.map((x) => (
          <MenuItem dense key={x.TestId} value={x.TestId}>
            {x.TestName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
