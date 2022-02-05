import React from 'react'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
} from '@mui/material'
import type {DBTableContent} from 'src/types'

type Props = {
  tables: DBTableContent[]
}
export const DBContentTables = ({tables}: Props) => {
  return (
    <>
      {tables.map((table, idx) => (
        <Stack key={idx} mb={4}>
          <Typography variant="h4" gutterBottom>
            {table.Name}
          </Typography>
          <TableContainer component={Paper} sx={{backgroundColor: 'background.default'}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {table.Header.map((th, idx) => (
                    <TableCell key={idx} sx={{fontWeight: 'bold'}}>
                      {th}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table.Content.map((tr, idx) => (
                  <TableRow key={idx}>
                    {tr.map((trc, idx2) => (
                      <TableCell key={idx2}>{trc}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      ))}
    </>
  )
}
