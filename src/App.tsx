import React from 'react'
import {ThemeProvider, CssBaseline} from '@mui/material'
import theme from './theme'
import {MainLayout} from './components/MainLayout'
import {useRoutes} from 'react-router'
import {routes} from './router'

const App: React.FC = () => {
  const pages = useRoutes(routes)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>

      <MainLayout>{pages}</MainLayout>
    </ThemeProvider>
  )
}

export default App
