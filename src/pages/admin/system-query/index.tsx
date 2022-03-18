import React from 'react'
import {useGate, useStore} from 'effector-react'
import {
  Box,
  Divider,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Link,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {DBContentTables} from 'src/features/DBContentTables'
import * as model from './model'
import type {QueryPreset} from 'src/types'

export const AdminSystemQueryPage = () => {
  useGate(model.SystemQueryPageGate)
  const queries = useStore(model.$systemQueries)

  const onEditClick = (tr: QueryPreset) => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    model.editQueryPresetClicked(tr)
  }

  return (
    <Box display="flex" flexDirection="column" my={2}>
      <Typography variant="h3" gutterBottom>
        Системные запросы
      </Typography>
      <Divider sx={{mb: 2}} />

      <CreateQuery></CreateQuery>
      <Divider sx={{mb: 4}} />

      <Box sx={{overflowY: 'scroll'}}>
        <TableContainer
          component={Paper}
          sx={{backgroundColor: 'background.default', minWidth: '900px'}}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold', minWidth: '60px'}}>ID</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Название</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Текст</TableCell>
                <TableCell sx={{fontWeight: 'bold', minWidth: '160px'}}>Опции</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((tr, idx) => (
                <TableRow hover key={idx}>
                  <TableCell>{tr.ID}</TableCell>
                  <TableCell>{tr.Name}</TableCell>
                  <TableCell sx={{fontFamily: 'monospace'}}>{tr.Query}</TableCell>
                  <TableCell sx={{cursor: 'pointer'}}>
                    <Link onClick={() => model.queryExecuted(tr)}>Выполнить</Link> |
                    <Link onClick={() => onEditClick(tr)}>Редактировать</Link> |
                    <Link onClick={() => model.deleteQueryPresetClicked(tr)}>Удалить</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ResultQueryDialog />
    </Box>
  )
}

const CreateQuery = () => {
  const query = useStore(model.$queryDto)
  const disabledSave = useStore(model.$saveBtnInactive)

  return (
    <Box display="flex" flexDirection="column" mb={4}>
      <Typography variant="h4">Создать новый запрос:</Typography>
      <TextField
        value={query.Name}
        onChange={model.nameChanged}
        sx={{mb: 4, mt: 2}}
        label="Название запроса"
      ></TextField>
      <TextField
        value={query.Query}
        onChange={model.QueryChanged}
        sx={{mb: 1}}
        minRows={3}
        label="Текст запроса"
        multiline
      ></TextField>
      <Box display="flex" gap={4}>
        <Button variant="outlined" onClick={() => model.queryExecuted(query)}>
          Выполнить
        </Button>
        <Button
          variant="contained"
          disabled={disabledSave}
          onClick={() => model.saveQueryPresetClicked()}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  )
}

const ResultQueryDialog = () => {
  const open = useStore(model.$resultDialogOpen)
  const tables = useStore(model.$executedQuery)

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={() => model.dialogToggled()}
      scroll="paper"
    >
      <DialogTitle>Результат выполнения запроса</DialogTitle>
      <DialogContent>
        <DBContentTables tables={tables} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.dialogToggled()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminSystemQueryPage
