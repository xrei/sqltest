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
  ].sort()

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: {xs: 'column', sm: 'row'},
        justifyContent: 'center',
        mt: 4,
        gap: 1,
        pt: 4,
        pb: 2,
        px: {xs: 2, sm: 0},
        borderTop: '1px solid',
        borderColor: 'lightGrey.main',
      }}
    >
      <Typography variant="body2" color="lightGrey.dark">
        ©2006 — {year}
      </Typography>

      <Typography variant="body2" sx={{color: 'lightGrey.dark'}}>
        {authors.join(', ')}
      </Typography>
    </Box>
  )
}
