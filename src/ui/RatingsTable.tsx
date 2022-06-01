import React from 'react'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import type {StudRating} from 'src/types'
import {CenteredLoader} from './CenteredLoader'

type RatingsTableProps = {
  results: StudRating[]
  loading?: boolean
}

export const RatingsTable = (props: RatingsTableProps) => {
  const {results, loading} = props

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
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} height={100}>
                <CenteredLoader />
              </TableCell>
            </TableRow>
          ) : (
            results.map((tr, idx) => (
              <TableRow key={idx}>
                <TableCell>{tr.stuFIO}</TableCell>
                <TableCell>{tr.avgMark.toFixed(2)}</TableCell>
                <TableCell>{tr.testCount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
