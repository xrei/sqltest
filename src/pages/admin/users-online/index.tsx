import React from 'react'
import {
  Box,
  Divider,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import * as model from './model'

export const AdminUsersOnlinePage = () => {
  useGate(model.AdminUsersOnlinePage)
  const data = useStore(model.$result)
  const loading = useStore(model.$isLoading)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box
        sx={{display: 'flex', flexFlow: {xs: 'column', md: 'row'}, justifyContent: 'space-between'}}
      >
        <Typography variant="h3">Пользователи онлайн</Typography>
        <Button variant="contained" color="warning" onClick={() => model.clearOnlineClicked()}>
          Очистить таблицу пользователей онлайн
        </Button>
      </Box>
      <Divider sx={{my: 2}} />
      {loading ? (
        <CenteredLoader />
      ) : (
        <TableContainer component={Paper} sx={{backgroundColor: 'background.default'}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>ФИО</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Группа</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Дата и время входа</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((tr, idx) => (
                <TableRow key={idx}>
                  <TableCell>{tr.FIO}</TableCell>
                  <TableCell>{tr.groupName}</TableCell>
                  <TableCell>{tr.creationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default AdminUsersOnlinePage
