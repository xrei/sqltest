import {createTheme} from '@mui/material/styles'
import {red, indigo, pink} from '@mui/material/colors'

const theme = createTheme({
  typography: {
    fontSize: 12,
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
  palette: {
    // mode: 'dark',
    primary: {
      main: indigo[400],
    },
    secondary: {
      main: pink[300],
    },
    error: {
      main: red[400],
    },
  },
})

export default theme
