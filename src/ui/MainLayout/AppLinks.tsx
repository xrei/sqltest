/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {Box, Typography, Stack, Button} from '@mui/material'
import {DesktopMac, Book, Event, Star} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {TestButton} from 'src/features/Test/TestContent'
import {routesPaths} from 'src/router/paths'

const buttonCss = (drawer?: boolean) => (theme: any) =>
  css`
    width: ${drawer ? '100%' : 'auto'};
    justify-content: flex-start;
    border-bottom: ${drawer ? '1px solid' : 'none'};
    border-radius: ${drawer ? 0 : 1};
    border-color: ${drawer
      ? theme.palette.mode === 'dark'
        ? theme.palette.grey['700']
        : theme.palette.grey['200']
      : 'none'};
    color: ${drawer ? theme.palette.primary.main : 'inherit'};
    padding: ${drawer && theme.spacing(2)};
  `

const linkSx = (drawer?: boolean) =>
  ({
    textTransform: 'none',
    fontWeight: 'medium',
    color: drawer ? 'text.primary' : 'inherit',
  } as const)

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
          component={Link}
          to={routesPaths.index}
          startIcon={<DesktopMac />}
        >
          <Typography sx={linkSx(drawer)}>Главная</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          component={Link}
          to={routesPaths.materials}
          startIcon={<Book />}
        >
          <Typography sx={linkSx(drawer)}>Материалы</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          component={Link}
          to={routesPaths.news}
          startIcon={<Event />}
        >
          <Typography sx={linkSx(drawer)}>Новости</Typography>
        </Button>
        <Button
          css={buttonCss(drawer)}
          size={large}
          variant="text"
          component={Link}
          to={routesPaths.authors}
          startIcon={<Star />}
        >
          <Typography sx={linkSx(drawer)}>Авторы</Typography>
        </Button>

        <TestButton drawer={drawer}></TestButton>
      </Stack>
    </Box>
  )
}
