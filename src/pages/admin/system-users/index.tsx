import React from 'react'
import {Button} from '@mui/material'
import {enqueueAlert} from 'src/features/Alerts'

export const AdminSystemUsersPage = () => {
  const addAlert = () => {
    enqueueAlert({
      message: 'Test alert!!',
      variant: 'error',
    })
  }

  return (
    <div>
      <Button variant="contained" color="success" onClick={addAlert}>
        Add alert
      </Button>
    </div>
  )
}

export default AdminSystemUsersPage
