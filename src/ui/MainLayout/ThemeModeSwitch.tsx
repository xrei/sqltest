import React from 'react'
import {DarkMode, LightMode} from '@mui/icons-material'
import {Tooltip, MenuItem, ListItemIcon} from '@mui/material'
import {useStore} from 'effector-react'
import {$themeMode, changeThemeMode} from 'src/theme'

export const ModeButton = () => {
  const currMode = useStore($themeMode)
  const title = currMode === 'light' ? 'Темная' : 'Светлая'

  return (
    <Tooltip title={title}>
      <MenuItem onClick={() => changeThemeMode()}>
        <ListItemIcon color="inherit">
          {currMode === 'light' ? <DarkMode></DarkMode> : <LightMode></LightMode>}
        </ListItemIcon>
        {title}
      </MenuItem>
    </Tooltip>
  )
}
