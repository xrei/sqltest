import React from 'react'
import {InputLabel, MenuItem, Select, FormControl} from '@mui/material'
import {useStore} from 'effector-react'
import {length} from 'ramda'
import * as ThemesModel from '../Themes/model'

export const ThemeSelect = () => {
  const themeVal = useStore(ThemesModel.$selectedThemeId)
  const themeList = useStore(ThemesModel.$themeList)
  const listEmpty = !length(themeList)

  return (
    <FormControl variant="outlined" sx={{width: '100%'}}>
      <InputLabel id="stud-theme-sel">Тема</InputLabel>
      <Select
        disabled={listEmpty}
        value={themeVal}
        labelId="stud-theme-sel"
        label="Тема"
        required
        onChange={ThemesModel.selectTheme}
      >
        {themeList.map((theme) => (
          <MenuItem key={theme.ThemeId} value={theme.ThemeId}>
            {theme.ThemeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
