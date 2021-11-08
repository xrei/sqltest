import {LoginForm} from './LoginForm'
import {RegisterForm} from './RegisterForm'
import {StudentCodeDialog} from './StudentCodeDialog'
import React from 'react'

export const AuthDialogs = () => {
  return (
    <React.Fragment>
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
      <StudentCodeDialog></StudentCodeDialog>
    </React.Fragment>
  )
}
