import React from 'react'
import {useRoutes} from 'react-router'
import {useStore} from 'effector-react'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {createAppTheme, $themeMode} from 'src/shared/theme'
import {MainLayout} from '../ui/MainLayout'
import {createRoutes} from 'src/app/router'
import {AlertsProvider} from 'src/shared/ui/Alerts'
import {UserModel} from 'src/entities/User'
import {WithRouter} from './router/WithRouter'
import AppDialogs from './AppDialogs'
import {AppGate, $appLoading} from './AppGate'
import AppLoader from './AppLoader'

const AppTheme: React.FC<{children: React.ReactElement}> = ({children}) => {
  const themeMode = useStore($themeMode)
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

const AppWrapper = () => {
  const shouldCreateAdminRoutes = useStore(UserModel.$isPrepOrAdmin)
  const pages = useRoutes(createRoutes(shouldCreateAdminRoutes))

  return (
    <>
      <MainLayout>{pages}</MainLayout>

      <AlertsProvider />
      <AppDialogs />
    </>
  )
}

const App: React.FC = () => {
  const appLoading = useStore($appLoading)

  return (
    <>
      <AppGate />
      <AppTheme>
        {appLoading ? (
          <AppLoader appLoading={appLoading} />
        ) : (
          <WithRouter>
            <AppWrapper />
          </WithRouter>
        )}
      </AppTheme>
    </>
  )
}

export default App
