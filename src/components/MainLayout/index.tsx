/** @jsxImportSource @emotion/react */
import React from 'react'
import {Container, SwipeableDrawer, Hidden} from '@mui/material'
import {css} from '@emotion/react'
import {useStore} from 'effector-react'
import {AppBar} from './AppBar'
import {AppLinks} from './AppLinks'
import {$drawer, onClose, onOpen} from './drawerModel'

const LayoutCss = css`
  display: flex;
  position: relative;
`
const mainCss = css`
  display: flex;
  flex-grow: 1;
  min-height: 100vh;
`

export const MainLayout: React.FC = ({children}) => {
  const isDrawerOpen = useStore($drawer)
  return (
    <div css={LayoutCss}>
      <AppBar></AppBar>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => onClose()}
          onOpen={() => onOpen()}
        >
          <AppLinks drawer></AppLinks>
        </SwipeableDrawer>
      </Hidden>
      <main css={mainCss}>
        <Container maxWidth="xl" sx={{marginTop: '48px'}}>
          {children}
        </Container>
      </main>
    </div>
  )
}
