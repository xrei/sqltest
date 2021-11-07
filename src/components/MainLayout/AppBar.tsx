/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {AppBar as MuiAppBar, Toolbar, Hidden, IconButton, Tooltip} from '@mui/material'
import {DarkMode, LightMode, Menu} from '@mui/icons-material'
import {AppLinks} from './AppLinks'
import {useStore} from 'effector-react'
import {$themeMode, changeThemeMode} from 'src/theme'
import {AuthModel} from 'src/features/Auth'
import {onOpen} from './drawerModel'
import {AuthBlock} from './AuthBlock'
import {UserBlock} from './UserBlock'

const barContainer = css`
  flex: 1;
`

export const AppBar: React.FC = () => {
  const hasUser = useStore(AuthModel.$hasUser)
  return (
    <MuiAppBar elevation={0} position="fixed">
      <Toolbar variant="dense">
        <div css={barContainer}>
          <Hidden mdUp>
            <IconButton
              size="large"
              aria-label="drawer"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => onOpen()}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <Hidden mdDown>
            <AppLinks></AppLinks>
          </Hidden>
        </div>

        {hasUser ? <UserBlock></UserBlock> : <AuthBlock></AuthBlock>}
        <ModeButton></ModeButton>
      </Toolbar>
    </MuiAppBar>
  )
}

const ModeButton = () => {
  const currMode = useStore($themeMode)

  return (
    <Tooltip title={currMode === 'light' ? 'Темная' : 'Светлая'}>
      <IconButton color="inherit" onClick={() => changeThemeMode()}>
        {currMode === 'light' ? <DarkMode></DarkMode> : <LightMode></LightMode>}
      </IconButton>
    </Tooltip>
  )
}
