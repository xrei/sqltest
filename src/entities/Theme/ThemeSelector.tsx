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
import {Theme} from 'src/types'

interface ThemeSelectorProps {
  list: Theme[]
  value: string
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
  disabled?: boolean
  sx?: SxProps<MuiTheme>
}
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  list,
  value,
  onChange,
  disabled,
  sx = {},
}) => {
  return (
    <FormControl
      sx={{maxWidth: 'sm', mr: 2, ...sx}}
      disabled={disabled}
      fullWidth
      variant="outlined"
      size="small"
    >
      <InputLabel id="adm-theme-sel">Тема</InputLabel>
      <Select value={value} labelId="adm-theme-sel" label="Тема" onChange={onChange}>
        {list.map((x) => (
          <MenuItem dense key={x.ThemeId} value={x.ThemeId}>
            {x.ThemeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
