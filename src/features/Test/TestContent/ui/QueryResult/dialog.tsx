import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Box,
} from '@mui/material'
import {useStore} from 'effector-react'
import {QueryResultModel} from '.'
import {DBContentTables} from 'src/features/DBContentTables'

export const QueryResultDialog = () => {
  const open = useStore(QueryResultModel.$isOpen)
  const queryType = useStore(QueryResultModel.$queryType)
  const queryTypeStr: {[key: string]: string} = {
    user: 'Результат выполнения запроса',
    reference: 'Результат выполнения эталонного запроса',
  }
  const isLoading = useStore(QueryResultModel.$isDataLoading)
  const data = useStore(QueryResultModel.$queryResult)

  return (
    <Dialog
      open={open}
      scroll="paper"
      fullWidth
      maxWidth="xl"
      onClose={() => QueryResultModel.toggleDialog()}
    >
      <DialogTitle>{queryTypeStr[queryType]}</DialogTitle>
      <DialogContent>{isLoading ? <Loading /> : <DBContentTables tables={data} />}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => QueryResultModel.toggleDialog()}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Loading = () => {
  return (
    <Box display="flex" flex={1} margin={10} justifyContent="center" alignItems="center">
      <CircularProgress></CircularProgress>
    </Box>
  )
}
