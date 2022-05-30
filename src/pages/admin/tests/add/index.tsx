import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useGate} from 'effector-react'
import * as model from './model'

export const AdminSubjectsAddPage = () => {
  useGate(model.SubjectAddPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1">Добавить новую дисциплину</Typography>
      <Divider sx={{my: 2}} />
    </Box>
  )
}

export default AdminSubjectsAddPage
