import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {ArrowBackButton} from 'src/shared/ui/ArrowBackButton'
import {adminRoutes} from 'src/app/router/paths'
import {ManageTaskForm} from 'src/features/AdminSubjects/ui/ManageTaskForm'

const AdminTestsTaskAddPage = () => {
  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Добавить учебное задание</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <ManageTaskForm isEdit={false} />
    </Box>
  )
}

export default AdminTestsTaskAddPage
