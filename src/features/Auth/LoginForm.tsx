/** @jsxImportSource @emotion/react */
import React, {KeyboardEvent} from 'react'
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
  IconButton,
  Typography,
} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
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
  const error = useStore(LoginModel.$error)

  const onEnterClick = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      LoginModel.login()
    }
  }

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
      <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
        <div css={{flex: 1}}>Вход</div>
        <IconButton tabIndex={-1} onClick={() => DialogModel.dialogClosed()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{flex: 'none'}} dividers>
        <Stack direction="column" spacing={2} sx={{pt: 1}}>
          <TextField
            value={login}
            autoFocus
            placeholder="Логин:"
            label="Логин:"
            type="password"
            autoComplete="username name"
            fullWidth
            variant="outlined"
            required
            disabled={isPending}
            onChange={LoginModel.loginChanged}
            onKeyPress={onEnterClick}
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
            onKeyPress={onEnterClick}
          />
          <FormControlLabel
            label="Запомнить меня"
            control={<Checkbox value={rememberMe} onChange={LoginModel.rememberMeChanged} />}
          />

          {error && (
            <Typography variant="overline" sx={{color: 'error.main'}}>
              {error.error}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{flexDirection: 'row-reverse', justifyContent: 'flex-start', mx: 2}}>
        <Button disabled={isPending} variant="contained" onClick={() => LoginModel.login()}>
          Вход
        </Button>
        <Box sx={{flex: 1}}>
          <Button onClick={() => DialogModel.dialogOpened('register')}>Регистрация</Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
