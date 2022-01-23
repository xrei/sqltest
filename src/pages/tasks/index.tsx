import React from 'react'
import {Box, Typography, Grid, Select} from '@mui/material'

export const TasksPage = () => {
  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Typography variant="h1" sx={{mb: 4}}>
        Параметры тестирования:
      </Typography>
    </Box>
  )
}

export default TasksPage
