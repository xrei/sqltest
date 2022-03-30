import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Paper,
} from '@mui/material'
import {useStore} from 'effector-react'
import {$answer, $dialogOpen, dialogToggled} from './model'

export const RightAnswerDialog = () => {
  const open = useStore($dialogOpen)
  const a = useStore($answer)

  return (
    <Dialog open={open} fullWidth onClose={() => dialogToggled()}>
      <DialogTitle>Правильный ответ:</DialogTitle>
      <DialogContent>
        <Paper sx={{p: 2}} elevation={2}>
          <Typography>{a.join('\n')}</Typography>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => dialogToggled()}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}
