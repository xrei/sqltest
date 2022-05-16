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
import {SubjectSelect} from 'src/entities/Subject'
import {$results, StudRatingPageGate} from './model'

export const StudentsRatingPage = () => {
  useGate(StudRatingPageGate)

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography variant="h3">Рейтинг студентов вашей группы</Typography>

      <Box maxWidth="sm" sx={{my: 4}}>
        <SubjectSelect />
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
