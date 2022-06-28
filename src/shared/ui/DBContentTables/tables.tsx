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
import {ExpandMoreButton} from 'src/shared/ui/ExpandMoreButton'

type Props = {
  tables: DBTableContent[]
}
export const DBContentTables = ({tables}: Props) => {
  const [expandedId, setExpandedId] = React.useState(0)
  const isArray = Array.isArray(tables)
  const oneTable = tables.length === 1

  const handleExpandClick = (idx: number) => {
    if (idx === expandedId) return setExpandedId(-1)
    setExpandedId(idx)
  }

  if (!isArray) {
    return <Typography variant="h5">{typeof tables === 'string' && <div>{tables}</div>}</Typography>
  }

  return (
    <>
      {tables.map((table, idx) => (
        <Stack key={idx} mb={2}>
          {!oneTable && (
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
              <ExpandMoreButton expand={expandedId === idx} onClick={() => handleExpandClick(idx)}>
                <ExpandMoreIcon />
              </ExpandMoreButton>
              <Typography
                sx={{flex: 1, cursor: 'pointer', ':hover': {color: 'primary.light'}}}
                onClick={() => handleExpandClick(idx)}
                variant="h4"
              >
                {table.Name}
              </Typography>
            </Box>
          )}
          <Collapse in={expandedId === idx}>
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
