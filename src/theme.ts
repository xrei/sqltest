import {createTheme, responsiveFontSizes} from '@mui/material/styles'
import {red, indigo, pink, grey, common, green} from '@mui/material/colors'
import {PaletteMode} from '@mui/material'
import {createEffect, createEvent, createStore, forward, sample} from 'effector'
import {AppGate} from './lib/AppGate'

export const $themeMode = createStore<PaletteMode>('light')
export const changeThemeMode = createEvent()
const saveModeLsFx = createEffect<PaletteMode, void>((mode) => {
  localStorage.setItem('theme', mode)
})
const getModeLsFx = createEffect<void, PaletteMode>(() => {
  const mode = localStorage.getItem('theme') || 'light'
  return mode as PaletteMode
})
$themeMode.on(changeThemeMode, (mode, _) => (mode === 'light' ? 'dark' : 'light'))
$themeMode.on(getModeLsFx.doneData, (_, p) => p)

sample({
  source: $themeMode,
  target: saveModeLsFx,
})

forward({
  from: AppGate.open,
  to: getModeLsFx,
})

const getPalette = (mode: PaletteMode) => ({
  mode,
  ...(mode === 'dark'
    ? {
        background: {
          default: '#111',
          paper: grey[900],
        },
        lightGrey: {
          main: grey[800],
          dark: grey[400],
        },
      }
    : {
        white: common.white,
        primary: {
          main: indigo[400],
        },
        secondary: {
          main: pink.A400,
        },
        error: {
          main: red[400],
        },
        success: {
          main: green[600],
        },
        lightGrey: {
          main: grey[200],
          dark: grey[800],
        },
      }),
})

export const createAppTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    typography: {
      fontSize: 16,
      h1: {
        fontSize: 32,
      },
      h2: {
        fontSize: 28,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 18,
      },
    },
    palette: getPalette(mode),
  })
  return responsiveFontSizes(theme)
}
