import React from 'react'
import {Stack, Alert, Slide} from '@mui/material'
import * as alertModel from './model'
import {useStore} from 'effector-react'

export const AlertsProvider = () => {
  const alertsList = useStore(alertModel.$alerts)

  const alerts = alertsList.map((a) => {
    return (
      <Slide key={a.id} in={true} direction="left">
        <Alert key={a.id} severity={a.variant} variant="filled">
          {a.message}
        </Alert>
      </Slide>
    )
  })

  return (
    <Stack sx={{zIndex: 1400, position: 'fixed', right: 24, top: 24}} spacing={2}>
      {alerts}
    </Stack>
  )
}
