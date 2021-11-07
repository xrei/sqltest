/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {Box, Typography, Stack, Button} from '@mui/material'
import {DesktopMac, Book, Event, Star, Home} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {routesPaths} from 'src/router'

const buttonCss = (drawer?: boolean) => (theme: any) =>
  css`
    width: ${drawer ? '100%' : 'auto'};
    justify-content: flex-start;
    border-bottom: ${drawer ? '1px solid' : 'none'};
    border-radius: ${drawer ? 0 : 1};
    border-color: ${drawer ? theme.palette.primary.lightGrey : 'none'};
    color: ${drawer ? theme.palette.black : 'inherit'};
    padding: ${drawer && theme.spacing(2)};
  `

const linkSx = {
  textTransform: 'none',
  fontWeight: 'medium',
} as const

export const AppLinks: React.FC<{drawer?: boolean}> = ({drawer}) => {
  const large = drawer ? 'large' : 'medium'
  return (
    <Box
      sx={{
        width: drawer ? '250px' : 'auto',
        flexFlow: drawer ? 'column' : 'row',
        alignItems: drawer ? 'baseline' : 'center',
      }}
    >
      <Stack direction={drawer ? 'column' : 'row'} spacing={drawer ? 0 : 1}>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          color="inherit"
          component={Link}
          to={routesPaths.index}
          startIcon={<Home />}
        >
          <Typography sx={linkSx}>Главная</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          color="inherit"
          component={Link}
          to={routesPaths.about}
          startIcon={<DesktopMac />}
        >
          <Typography sx={linkSx}>О системе</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          color="inherit"
          component={Link}
          to={routesPaths.materials}
          startIcon={<Book />}
        >
          <Typography sx={linkSx}>Материалы</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          color="inherit"
          component={Link}
          to={routesPaths.news}
          startIcon={<Event />}
        >
          <Typography sx={linkSx}>Новости</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          color="inherit"
          component={Link}
          to={routesPaths.authors}
          startIcon={<Star />}
        >
          <Typography sx={linkSx}>Авторы</Typography>
        </Button>
      </Stack>
    </Box>
  )
}
