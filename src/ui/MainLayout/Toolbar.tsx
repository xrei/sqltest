/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {AppBar as MuiAppBar, Toolbar, Hidden, IconButton, styled} from '@mui/material'
import {Menu} from '@mui/icons-material'
import {AppLinks} from './AppLinks'
import {useStore} from 'effector-react'
import {UserModel} from 'src/features/User'
import {onOpen} from './drawerModel'
import {AuthBlock} from './AuthBlock'
import {UserBlock} from './UserBlock'

const barContainer = css`
  flex: 1;
`

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  '@media all': {
    minHeight: 52,
  },
}))

export const AppToolbar: React.FC = () => {
  const hasUser = useStore(UserModel.$hasUser)

  return (
    <StyledToolbar>
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
    </StyledToolbar>
  )
}
