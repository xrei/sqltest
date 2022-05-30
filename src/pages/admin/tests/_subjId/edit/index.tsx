import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useGate} from 'effector-react'
import {useParams, Navigate} from 'react-router-dom'
import {adminRoutes} from 'src/router/paths'
import * as model from './model'
import {ManageSubjectForm} from 'src/features/AdminSubjects/ui'
import {ArrowBackButton} from 'src/ui/ArrowBackButton'

export const AdminSubjectEditPage = () => {
  const params = useParams()
  const subjId = Number(params.subjId)

  if (subjId && !Number.isInteger(subjId)) return <Navigate to={adminRoutes.tests} />

  useGate(model.SubjectEditPageGate, {subjId})

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Редактировать дисциплину</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <ManageSubjectForm isEdit={true} subjId={subjId} />
    </Box>
  )
}

export default AdminSubjectEditPage
