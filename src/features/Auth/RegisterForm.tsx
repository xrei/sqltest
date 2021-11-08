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
  useMediaQuery,
  useTheme,
  InputLabel,
  FormControl,
  Select,
  Typography,
  MenuItem,
} from '@mui/material'
import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material'
import {useStore} from 'effector-react'
import * as DialogModel from './dialog'
import * as RegisterModel from './registerModel'

export const RegisterForm = () => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'))
  const open = useStore(DialogModel.$registerOpen)
  const fio = useStore(RegisterModel.$fio)
  const login = useStore(RegisterModel.$login)
  const pwd = useStore(RegisterModel.$pwd)
  const isPending = useStore(RegisterModel.$isPending)
  const isSubmitEnabled = useStore(RegisterModel.$isSubmitEnabled)

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
      <DialogTitle>Регистрация в системе</DialogTitle>
      <DialogContent sx={{flex: 'none'}} dividers>
        <Stack direction="column" spacing={2} sx={{pt: 1}}>
          <TextField
            value={fio}
            autoFocus
            label="Ф.И.О.:"
            type="text"
            fullWidth
            variant="outlined"
            required
            disabled={isPending}
            onChange={RegisterModel.fioChanged}
          />
          <TextField
            value={login}
            label="Логин:"
            type="text"
            fullWidth
            variant="outlined"
            required
            disabled={isPending}
            onChange={RegisterModel.loginChanged}
          />
          <TextField
            value={pwd}
            label="Пароль:"
            type="password"
            fullWidth
            variant="outlined"
            required
            disabled={isPending}
            onChange={RegisterModel.pwdChanged}
          />
          <GroupSelect></GroupSelect>
          <StudentCodeCheck />
        </Stack>
      </DialogContent>
      <DialogActions sx={{flexDirection: 'row-reverse', justifyContent: 'flex-start', mx: 2}}>
        <Button
          disabled={!isSubmitEnabled}
          variant="outlined"
          onClick={() => RegisterModel.register()}
        >
          Регистрация
        </Button>
        <Button sx={{mr: 2}} color="secondary" onClick={() => DialogModel.dialogClosed()}>
          Закрыть
        </Button>
        <Box sx={{flex: 1}}>
          <Button onClick={() => DialogModel.dialogOpened('login')}>Войти</Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

const GroupSelect = () => {
  const groupVal = useStore(RegisterModel.$group)
  return (
    <FormControl variant="outlined">
      <InputLabel id="stud-group-sel">Ваша группа</InputLabel>
      <Select
        value={groupVal}
        labelId="stud-group-sel"
        label="Ваша группа"
        required
        onChange={RegisterModel.groupChanged}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  )
}

const StudentCodeCheck = () => {
  const t = useStore(RegisterModel.$studCode)
  return (
    <Box sx={{cursor: 'pointer'}} display="flex" onClick={() => DialogModel.studentCodeOpened()}>
      {t ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank color="primary" />}
      <Typography sx={{ml: 1}}>Согласен с кодексом чести студента, изучающего курс</Typography>
    </Box>
  )
}
