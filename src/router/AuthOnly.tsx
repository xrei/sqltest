import {useStore} from 'effector-react'
import React from 'react'
import {Navigate, useLocation} from 'react-router'
import {$hasAuth} from 'src/features/Auth/model'

export const AuthOnly: React.FC<{children: JSX.Element}> = ({children}) => {
  const auth = useStore($hasAuth)
  const location = useLocation()

  if (!auth) return <Navigate to="/" state={{from: location}}></Navigate>

  return children
}
