import React from 'react'
import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Collapse,
} from '@mui/material'
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import type {DBTableContent} from 'src/types'
import {ExpandMoreButton} from 'src/ui/ExpandMoreButton'

type Props = {
  tables: DBTableContent[]
}
export const DBContentTables = ({tables}: Props) => {
  const [expandedId, setExpandedId] = React.useState('')

  const handleExpandClick = (table: DBTableContent) => {
    if (table.Name === expandedId) return setExpandedId('')
    setExpandedId(table.Name)
  }

  return (
    <>
      {tables.map((table, idx) => (
        <Stack key={idx} mb={2}>
          <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <ExpandMoreButton
              expand={expandedId === table.Name}
              onClick={() => handleExpandClick(table)}
            >
              <ExpandMoreIcon />
            </ExpandMoreButton>
            <Typography
              sx={{cursor: 'pointer', ':hover': {color: 'primary.light'}}}
              onClick={() => handleExpandClick(table)}
              variant="h4"
            >
              {table.Name}
            </Typography>
          </Box>
          <Collapse in={expandedId === table.Name}>
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
          </Collapse>
        </Stack>
      ))}
    </>
  )
}
