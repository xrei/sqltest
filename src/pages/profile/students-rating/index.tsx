import React from 'react'
import {Box, Typography} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {RatingsTable} from 'src/widgets/RatingsTable'
import {SubjectSelect} from 'src/entities/Subject'
import {$results, StudRatingPageGate} from './model'

export const StudentsRatingPage = () => {
  useGate(StudRatingPageGate)
  const results = useStore($results)

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography variant="h3">Рейтинг студентов вашей группы</Typography>

      <Box maxWidth="sm" sx={{my: 4}}>
        <SubjectSelect />
      </Box>

      <RatingsTable results={results} />
    </Box>
  )
}
