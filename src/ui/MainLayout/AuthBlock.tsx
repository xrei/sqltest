import React from 'react'
import {Button} from '@mui/material'
import {Login as LoginIcon} from '@mui/icons-material'
import {DialogModel} from 'src/features/Auth'

export const AuthBlock: React.FC = () => {
  return (
    <Button
      variant="text"
      color="inherit"
      sx={{fontWeight: 600, textTransform: 'none'}}
      startIcon={<LoginIcon />}
      onClick={() => DialogModel.dialogOpened('login')}
    >
      Вход
    </Button>
  )
}
