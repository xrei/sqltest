import {createTheme, responsiveFontSizes} from '@mui/material/styles'
import {red, indigo, pink, grey, common, green} from '@mui/material/colors'
import {PaletteMode} from '@mui/material'
import {createEffect, createEvent, createStore, sample} from 'effector'
import {MUIRichTextEditorTheme} from 'src/shared/ui/TextEditor'

export const $themeMode = createStore<PaletteMode>('light')
export const changeThemeMode = createEvent()
const saveModeLsFx = createEffect<PaletteMode, void>((mode) => {
  localStorage.setItem('theme', mode)
})
export const getModeLsFx = createEffect<void, PaletteMode>(() => {
  const mode = localStorage.getItem('theme') || 'light'
  return mode as PaletteMode
})
$themeMode.on(changeThemeMode, (mode, _) => (mode === 'light' ? 'dark' : 'light'))
$themeMode.on(getModeLsFx.doneData, (_, p) => p)

sample({
  source: $themeMode,
  target: saveModeLsFx,
})

const getPalette = (mode: PaletteMode) => ({
  mode,
  ...(mode === 'dark'
    ? {
        background: {
          default: '#1a1a33',
          paper: '#222238',
        },
        primary: {
          main: indigo['200'],
        },
        lightGrey: {
          light: grey[900],
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
          light: grey[50],
          main: grey[200],
          dark: grey[800],
        },
      }),
})

export const createAppTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 16,
      h1: {
        fontSize: 32,
        letterSpacing: 0.2,
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
    // @ts-expect-error error expected
    components: {
      ...MUIRichTextEditorTheme,
    },
  })
  return responsiveFontSizes(theme)
}
