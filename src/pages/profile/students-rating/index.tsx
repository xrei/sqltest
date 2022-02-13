import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {$results, StudRatingPageGate} from './model'
import {SubjectSelect} from 'src/features/Test'

export const StudentsRatingPage = () => {
  useGate(StudRatingPageGate)

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography variant="h3">Рейтинг студентов вашей группы</Typography>

      <Box maxWidth="sm" sx={{my: 4}}>
        {/* <Typography sx={{mb: 1}} variant="h5">
          Дисциплина:
        </Typography> */}
        <SubjectSelect></SubjectSelect>
      </Box>

      <RatingsTable />
    </Box>
  )
}

const RatingsTable = () => {
  const results = useStore($results)

  return (
    <TableContainer component={Paper} sx={{backgroundColor: 'background.default'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>Ф.И.О</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Средний балл</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Пройдено тестов</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((tr, idx) => (
            <TableRow key={idx}>
              <TableCell>{tr.stuFIO}</TableCell>
              <TableCell>{tr.avgMark}</TableCell>
              <TableCell>{tr.testCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
