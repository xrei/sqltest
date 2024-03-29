import React from 'react'
import {useStore} from 'effector-react'
import {Button, Dialog, DialogContent, DialogTitle, Box} from '@mui/material'
import funcModelImg from '../../assets/FuncModel3.jpg'
import {DBContentTables} from 'src/shared/ui/DBContentTables'
import * as model from './model'

export const DBContentDialog = () => {
  const open = useStore(model.$isOpen)
  const dbContent = useStore(model.$dbContent)

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
        <DBContentTables tables={dbContent} />
      </DialogContent>
    </Dialog>
  )
}
