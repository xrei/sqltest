import React from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {useStore} from 'effector-react'
import * as DialogModel from './dialog'
import * as LoginModel from './loginModel'

export const LoginForm = () => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'))
  const open = useStore(DialogModel.$loginOpen)
  const login = useStore(LoginModel.$login)
  const pwd = useStore(LoginModel.$pwd)
  const rememberMe = useStore(LoginModel.$rememberMe)
  const isPending = useStore(LoginModel.$isPending)

  return (
    <Dialog
      open={open}
      onClose={() => DialogModel.dialogClosed()}
      fullScreen={fullscreen}
      maxWidth="sm"
      fullWidth
      sx={{}}
      PaperProps={{sx: {justifyContent: fullscreen ? 'center' : 'flex-start'}}}
    >
      <DialogTitle>Вход в систему</DialogTitle>
      <DialogContent sx={{flex: 'none'}} dividers>
        <Stack direction="column" spacing={2} sx={{pt: 1}}>
          <TextField
            value={login}
            autoFocus
            placeholder="Логин:"
            label="Логин:"
            type="text"
            fullWidth
            variant="outlined"
            required
            disabled={isPending}
            onChange={LoginModel.loginChanged}
          />
          <TextField
            value={pwd}
            placeholder="Пароль:"
            label="Пароль:"
            type="password"
            fullWidth
            variant="outlined"
            required
            disabled={isPending}
            onChange={LoginModel.pwdChanged}
          />
          <FormControlLabel
            label="Запомнить меня"
            control={<Checkbox value={rememberMe} onChange={LoginModel.rememberMeChanged} />}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{flexDirection: 'row-reverse', justifyContent: 'flex-start', mx: 2}}>
        <Button disabled={isPending} variant="outlined" onClick={() => LoginModel.login()}>
          Вход
        </Button>
        <Button sx={{mr: 2}} color="secondary" onClick={() => DialogModel.dialogClosed()}>
          Закрыть
        </Button>
        <Box sx={{flex: 1}}>
          <Button onClick={() => DialogModel.dialogOpened('register')}>Регистрация</Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
