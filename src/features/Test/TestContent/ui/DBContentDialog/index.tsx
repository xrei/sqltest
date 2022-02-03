import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
} from '@mui/material'
import * as model from './model'
import {useStore} from 'effector-react'
import funcModelImg from '../../assets/FuncModel3.jpg'

export const DBContentDialog = () => {
  const open = useStore(model.$isOpen)

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="lg" onClose={() => model.toggle()}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Схема БД
        <Button variant="outlined" onClick={() => model.toggle()}>
          Закрыть
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <img src={funcModelImg} alt="functional model" />
        </Box>
        <DBTables />
      </DialogContent>
    </Dialog>
  )
}

const DBTables = () => {
  const dbContent = useStore(model.$dbContent)

  return (
    <>
      {dbContent.map((table, idx) => (
        <Stack key={idx} mb={4}>
          <Typography gutterBottom>{table.Name}</Typography>
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
