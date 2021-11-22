import {useStore} from 'effector-react'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {AppGate, $appLoading} from './lib/AppGate'

const Main = () => {
  const appLoading = useStore($appLoading)

  return (
    <React.StrictMode>
      <AppGate></AppGate>

      {appLoading ? (
        <div></div>
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </React.StrictMode>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
