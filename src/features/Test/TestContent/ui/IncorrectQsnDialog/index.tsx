import React from 'react'
import {Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField} from '@mui/material'
import * as model from './model'
import {useStore} from 'effector-react'

export const IncorrectQsnDialog = () => {
  const open = useStore(model.$isOpen)
  const val = useStore(model.$value)
  return (
    <Dialog open={open} onClose={() => model.toggleIncorrectQsnDialog()}>
      <DialogTitle>Введите краткое описание проблемы:</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Опишите проблему"
          variant="outlined"
          fullWidth
          value={val}
          onChange={model.setValue}
          multiline
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => model.toggleIncorrectQsnDialog()}>
          Отмена
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => model.sendErrorMessageWithParamsFx()}
        >
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
