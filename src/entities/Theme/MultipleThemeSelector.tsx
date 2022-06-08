import React from 'react'
import {
  FormControl,
  Select,
  Checkbox,
  InputLabel,
  OutlinedInput,
  MenuItem,
  ListItemText,
  FormControlProps,
  SelectChangeEvent,
  SxProps,
  Theme as MuiTheme,
} from '@mui/material'
import type {Theme} from 'src/types'

interface MultipleThemesSelectorProps extends FormControlProps {
  list: Theme[]
  value: string[]
  onSelectChange?:
    | ((event: SelectChangeEvent<string[]>, child: React.ReactNode) => void)
    | undefined
  sx?: SxProps<MuiTheme>
}

export const MultipleThemesSelector = ({
  value,
  list,
  sx,
  onSelectChange,
  ...rest
}: MultipleThemesSelectorProps) => {
  return (
    <FormControl fullWidth size="small" sx={{...sx}} {...rest}>
      <InputLabel id="available-themes-sel">Доступные темы</InputLabel>
      <Select
        labelId="available-themes-sel"
        id="available-themes"
        multiple={true}
        value={value}
        onChange={onSelectChange}
        input={<OutlinedInput label="Доступные группы" />}
        renderValue={(selected: string[]) =>
          selected
            .map((sel) => list.find((theme) => theme.ThemeId === Number(sel))?.ThemeName)
            .join(', ')
        }
      >
        {list.map((theme) => (
          <MenuItem key={theme.ThemeId} value={theme.ThemeId} dense>
            <Checkbox size="small" checked={value.some((id) => Number(id) === theme.ThemeId)} />
            <ListItemText primary={theme.ThemeName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
