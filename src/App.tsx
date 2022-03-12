import React from 'react'
import {useRoutes} from 'react-router'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {useStore} from 'effector-react'
import {MainLayout} from './ui/MainLayout'
import {createAppTheme, $themeMode} from './theme'
import {DBInfoDialog} from 'src/features/DBInfo'
import {AuthDialogs} from 'src/features/Auth'
import {createRoutes} from './router'
import {$userIsAdmin} from './features/User/model'

const App: React.FC = () => {
  const isUserAdmin = useStore($userIsAdmin)

  const pages = useRoutes(createRoutes(isUserAdmin))
  const themeMode = useStore($themeMode)
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <MainLayout>{pages}</MainLayout>

      <DBInfoDialog />
      <AuthDialogs />
    </ThemeProvider>
  )
}

export default App
