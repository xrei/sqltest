/** @jsxImportSource @emotion/react */
import React from 'react'
import {Container} from '@mui/material'
import {css} from '@emotion/react'
import {AppBar} from './AppBar'

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
  return (
    <div css={LayoutCss}>
      <AppBar></AppBar>
      <main css={mainCss}>
        <Container sx={{marginTop: '48px'}}>{children}</Container>
      </main>
    </div>
  )
}
