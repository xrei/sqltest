import React from 'react'
import {Typography, Box, Button} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        my: 4,
        height: '100%',
      }}
    >
      <Typography sx={{fontSize: '8rem !important'}} color="secondary">
        <b>404</b>
      </Typography>
      <Typography variant="h1" gutterBottom>
        Страница не найдена
      </Typography>
      <Button component={RouterLink} to="/" variant="outlined" sx={{mt: 6}}>
        Вернуться на главную
      </Button>
    </Box>
  )
}
