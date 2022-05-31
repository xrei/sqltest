import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {adminRoutes} from 'src/router/paths'
import {ArrowBackButton} from 'src/ui/ArrowBackButton'
import {ManageThemeForm} from 'src/features/AdminSubjects/ui'

const AdminThemeAddPage = () => {
  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Добавить тему</Typography>
      </Box>
      <Divider sx={{my: 2}} />

      <ManageThemeForm isEdit={false} />
    </Box>
  )
}

export default AdminThemeAddPage
