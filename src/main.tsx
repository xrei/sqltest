import React from 'react'
import {useStore} from 'effector-react'
import ReactDOM from 'react-dom'
import {Zoom, CircularProgress, Box} from '@mui/material'
import App from './App'
import {AppGate, $appLoading} from './lib/AppGate'
import {HistoryRouter} from './router/HistoryRouter'
import {history} from 'src/router/history'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/cyrillic-300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/cyrillic-400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/cyrillic-500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/cyrillic-700.css'

const Main = () => {
  const appLoading = useStore($appLoading)

  return (
    <React.StrictMode>
      <AppGate></AppGate>

      {appLoading ? (
        <Box sx={{display: 'grid', placeItems: 'center', minHeight: '100vh', height: '100vh'}}>
          <Zoom in={appLoading}>
            <CircularProgress size={60} />
          </Zoom>
        </Box>
      ) : (
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      )}
    </React.StrictMode>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
