import React from 'react'
import {useRoutes} from 'react-router'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {useStore} from 'effector-react'
import {MainLayout} from './ui/MainLayout'
import {createAppTheme, $themeMode} from './theme'
import {DBInfoDialog} from 'src/features/DBInfo'
import {AuthDialogs} from 'src/features/Auth'
import {createRoutes} from './router'
import {AlertsProvider} from './features/Alerts'
import {ManageNewsDialog} from './features/Admin/'
import {UserModel} from './features/User'

const App: React.FC = () => {
  const shouldCreateAdminRoutes = useStore(UserModel.$isPrepOrAdmin)

  const pages = useRoutes(createRoutes(shouldCreateAdminRoutes))
  const themeMode = useStore($themeMode)
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <MainLayout>{pages}</MainLayout>

      <DBInfoDialog />
      <AuthDialogs />
      <AlertsProvider />
      <ManageNewsDialog />
    </ThemeProvider>
  )
}

export default App
