import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useParams, Navigate} from 'react-router-dom'
import {ArrowBackButton} from 'src/shared/ui/ArrowBackButton'
import {adminRoutes} from 'src/app/router/paths'
import {ManageTaskForm} from 'src/features/AdminSubjects/ui/ManageTaskForm'

const AdminTestsTaskIdEditPage = () => {
  const params = useParams()
  const testId = Number(params.testId)

  if (Number.isNaN(testId) || testId === 0 || !Number.isInteger(testId))
    return <Navigate to={adminRoutes.tests} />

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Редактировать учебное задание</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <ManageTaskForm isEdit={true} />
    </Box>
  )
}

export default AdminTestsTaskIdEditPage
