import React from 'react'
import {DBInfoDialog} from 'src/features/DBInfo'
import {AuthDialogs} from 'src/features/Auth'
import {ManageNewsDialog} from 'src/features/Admin'

const AppDialogs = () => {
  return (
    <>
      <DBInfoDialog />
      <AuthDialogs />
      <ManageNewsDialog />
    </>
  )
}

export default AppDialogs
