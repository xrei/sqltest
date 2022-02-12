import {useStore} from 'effector-react'
import React from 'react'
import ReactDOM from 'react-dom'
import {Zoom, CircularProgress, Box} from '@mui/material'
import App from './App'
import {AppGate, $appLoading} from './lib/AppGate'
import {HistoryRouter} from './router/HistoryRouter'
import {history} from 'src/router/history'

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
