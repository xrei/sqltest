import React from 'react'
import {HistoryRouter} from './HistoryRouter'
import {history} from './appHistory'

export const WithRouter: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <HistoryRouter history={history}>{children}</HistoryRouter>
}
