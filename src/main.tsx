import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/cyrillic-300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/cyrillic-400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/cyrillic-500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/cyrillic-700.css'

const Main = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
