import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useGate} from 'effector-react'
import {useParams, Navigate} from 'react-router-dom'
import {adminRoutes} from 'src/router/paths'
import * as model from './model'

export const AdminSubjectEditPage = () => {
  const params = useParams()
  const subjId = Number(params.subjId)

  if (subjId && !Number.isInteger(subjId)) return <Navigate to={adminRoutes.tests} />

  useGate(model.SubjectEditPageGate, {subjId})

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1">Редактировать дисциплину</Typography>
      <Divider sx={{my: 2}} />
    </Box>
  )
}

export default AdminSubjectEditPage
