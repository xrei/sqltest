import React from 'react'
import {useRoutes} from 'react-router'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {useStore} from 'effector-react'
import {createAppTheme, $themeMode} from './theme'
import {MainLayout} from './ui/MainLayout'
import {routes} from './router'

const App: React.FC = () => {
  const pages = useRoutes(routes)
  const themeMode = useStore($themeMode)
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <MainLayout>{pages}</MainLayout>
    </ThemeProvider>
  )
}

export default App
