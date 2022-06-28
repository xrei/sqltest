import React from 'react'
import {Button, Divider, Dialog, DialogTitle, DialogContent} from '@mui/material'
import {useStore} from 'effector-react'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import {DBContentTables} from 'src/shared/ui/DBContentTables'
import * as model from './model'

export const TaskQueryDialog = () => {
  const open = useStore(model.$queryDialogOpen)
  const loading = useStore(model.$isLoading)
  const data = useStore(model.$queryResult)

  return (
    <Dialog
      open={open}
      scroll="paper"
      fullWidth
      maxWidth="xl"
      onClose={() => model.queryDialogClosed()}
    >
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Результат выполнения эталонного запроса
        <Button variant="outlined" onClick={() => model.queryDialogClosed()}>
          Закрыть
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {loading ? <CenteredLoader /> : <DBContentTables tables={data} />}
      </DialogContent>
    </Dialog>
  )
}
