import React from 'react'
import {Box, Divider, Typography, Paper, Button} from '@mui/material'

const AdminTestsPage = () => {
  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h3">Список тестов</Typography>
      <Divider sx={{my: 2}} />
    </Box>
  )
}

export default AdminTestsPage
