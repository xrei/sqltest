/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {Box, Typography, IconButton, Button} from '@mui/material'
import {DesktopMac, Book, Event, Star, Home} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {routesPaths} from 'src/router'

const linkCss = css`
  display: flex;
  flex: 1;
`
const buttonCss = (drawer?: boolean) => (theme: any) =>
  css`
    width: ${drawer ? '100%' : 'auto'};
    justify-content: flex-start;
    border-bottom: ${drawer ? '1px solid' : 'none'};
    border-radius: 0;
    border-color: ${drawer ? theme.palette.primary.lightGrey : 'none'};
    color: ${drawer ? theme.palette.black : 'inherit'};
  `

const linkSx = {
  textTransform: 'none',
  fontWeight: 'medium',
} as const

export const AppLinks: React.FC<{drawer?: boolean}> = ({drawer}) => {
  return (
    <Box
      css={linkCss}
      sx={{
        width: drawer ? '250px' : 'auto',
        flexFlow: drawer ? 'column' : 'row',
        alignItems: drawer ? 'baseline' : 'center',
      }}
    >
      <Button
        css={buttonCss(drawer)}
        variant="text"
        color="inherit"
        component={Link}
        to={routesPaths.index}
      >
        <IconButton
          aria-label="Home"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <Home />
        </IconButton>
        <Typography sx={linkSx}>Главная</Typography>
      </Button>
      <Button
        css={buttonCss(drawer)}
        variant="text"
        color="inherit"
        component={Link}
        to={routesPaths.about}
      >
        <IconButton
          aria-label="about"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <DesktopMac />
        </IconButton>
        <Typography sx={linkSx}>О системе</Typography>
      </Button>
      <Button
        css={buttonCss(drawer)}
        variant="text"
        color="inherit"
        component={Link}
        to={routesPaths.materials}
      >
        <IconButton
          aria-label="materials"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <Book />
        </IconButton>
        <Typography sx={linkSx}>Материалы</Typography>
      </Button>
      <Button
        css={buttonCss(drawer)}
        variant="text"
        color="inherit"
        component={Link}
        to={routesPaths.news}
      >
        <IconButton
          aria-label="news"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <Event />
        </IconButton>
        <Typography sx={linkSx}>Новости</Typography>
      </Button>
      <Button
        css={buttonCss(drawer)}
        variant="text"
        color="inherit"
        component={Link}
        to={routesPaths.authors}
      >
        <IconButton
          aria-label="authors"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <Star />
        </IconButton>
        <Typography sx={linkSx}>Авторы</Typography>
      </Button>
    </Box>
  )
}
