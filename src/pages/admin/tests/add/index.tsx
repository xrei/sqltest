import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useGate} from 'effector-react'
import * as model from './model'
import {ManageSubjectForm} from 'src/features/AdminSubjects/ui'
import {ArrowBackButton} from 'src/shared/ui/ArrowBackButton'
import {adminRoutes} from 'src/app/router/paths'

export const AdminSubjectsAddPage = () => {
  useGate(model.SubjectAddPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Добавить новую дисциплину</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <ManageSubjectForm isEdit={false} />
    </Box>
  )
}

export default AdminSubjectsAddPage
