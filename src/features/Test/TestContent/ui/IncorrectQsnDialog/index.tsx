import React, {useState} from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material'
import {useStore} from 'effector-react'
import * as model from './model'

export const IncorrectQsnDialog = () => {
  const [isSent, setIsSent] = useState(false)
  const open = useStore(model.$isOpen)
  const val = useStore(model.$value)

  const sendProblem = async () => {
    const isOk = await model.sendErrorMessageWithParamsFx()

    if (isOk) {
      setIsSent(true)

      setTimeout(() => {
        setIsSent(false)
        model.toggleIncorrectQsnDialog()
      }, 2000)
    }
  }

  return (
    <Dialog open={open} onClose={() => model.toggleIncorrectQsnDialog()}>
      <DialogTitle>Введите краткое описание проблемы:</DialogTitle>
      <DialogContent>
        {isSent ? (
          <Typography>Успешно отправлено!</Typography>
        ) : (
          <TextField
            placeholder="Опишите проблему"
            variant="outlined"
            fullWidth
            value={val}
            onChange={model.setValue}
            multiline
          ></TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => model.toggleIncorrectQsnDialog()}>
          Отмена
        </Button>
        <Button variant="contained" color="primary" onClick={sendProblem}>
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
