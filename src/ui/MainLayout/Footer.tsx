import React from 'react'
import {Box, Typography} from '@mui/material'

export const Footer = () => {
  const year = new Date().getFullYear()

  const authors = [
    'Аникеев Д.В.',
    'Маркин А.В.',
    'Рульков Р.С.',
    'Куликова А.В.',
    'Паршин В.И.',
    'Шувырденков Б.А.',
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        gap: 1,
        pt: 4,
        pb: 2,
        borderTop: '1px solid',
        borderColor: 'lightGrey.main',
      }}
    >
      <Typography variant="body2" color="lightGrey.dark">
        ©2002 — {year}
      </Typography>

      <Typography variant="body2" sx={{color: 'lightGrey.dark'}}>
        {authors.join(', ')}
      </Typography>
    </Box>
  )
}
