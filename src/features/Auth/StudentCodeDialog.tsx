import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import {useStore} from 'effector-react'
import * as DialogModel from './dialog'
import {$regRules, acceptStudCode, rejectStudCode} from './registerModel'

export const StudentCodeDialog = () => {
  const regRules = useStore($regRules)
  const open = useStore(DialogModel.$studentCodeOpen)
  const handleAgree = () => {
    acceptStudCode()
    DialogModel.studentCodeClosed()
  }
  const handleDisagree = () => {
    rejectStudCode()
    DialogModel.studentCodeClosed()
  }
  return (
    <Dialog open={open} scroll="paper" onClose={() => DialogModel.studentCodeClosed()}>
      <DialogTitle>Кодекс чести</DialogTitle>
      <DialogContent>
        <div dangerouslySetInnerHTML={{__html: regRules}}></div>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button color="secondary" variant="contained" onClick={handleDisagree}>
          Не Согласен
        </Button>
        <Button color="primary" variant="contained" onClick={handleAgree}>
          Согласен
        </Button>
      </DialogActions>
    </Dialog>
  )
}
