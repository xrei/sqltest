import React from 'react'
import {DBInfoDialog} from 'src/widgets/DBInfoDialog'
import {AuthDialogs} from 'src/features/Auth'
import {ManageNewsDialog} from 'src/features/ManageAdminNews'

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
