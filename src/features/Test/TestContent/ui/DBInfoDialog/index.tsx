import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Box} from '@mui/material'
import * as model from './model'
import {useStore} from 'effector-react'
import funcModelImg from '../../assets/FuncModel3.jpg'

export const DBInfoDialog = () => {
  const open = useStore(model.$isOpen)

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="md" onClose={() => model.toggle()}>
      <DialogTitle>Схема БД</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <img src={funcModelImg} alt="functional model" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => model.toggle()}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}
