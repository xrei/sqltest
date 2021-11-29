/** @jsxImportSource @emotion/react */
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
  IconButton,
} from '@mui/material'
import {CheckBoxOutlineBlank, CheckBox, Close as CloseIcon} from '@mui/icons-material'
import {useStore} from 'effector-react'
import * as DialogModel from './dialog'
import * as RegisterModel from './registerModel'
import {$studGroups} from 'src/features/User/Student/model'

export const RegisterForm = () => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'))
  const open = useStore(DialogModel.$registerOpen)
  const fio = useStore(RegisterModel.$fio)
  const login = useStore(RegisterModel.$login)
  const pwd = useStore(RegisterModel.$pwd)
  const isPending = useStore(RegisterModel.$isPending)
  const isSubmitEnabled = useStore(RegisterModel.$isSubmitEnabled)
  const error = useStore(RegisterModel.$error)

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
        <div css={{flex: 1}}>Регистрация в системе</div>
        <IconButton tabIndex={-1} onClick={() => DialogModel.dialogClosed()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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

          {error && (
            <Typography variant="overline" sx={{color: 'error.main'}}>
              {error.error}
            </Typography>
          )}
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
        <Box sx={{flex: 1}}>
          <Button onClick={() => DialogModel.dialogOpened('login')}>Войти</Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

const GroupSelect = () => {
  const groupVal = useStore(RegisterModel.$group)
  const groupList = useStore($studGroups)

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
        {groupList.map((group) => (
          <MenuItem key={group.GroupValue} value={group.GroupValue}>
            {group.GroupNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const StudentCodeCheck = () => {
  const codeDialog = useStore(RegisterModel.$studCode)
  return (
    <Box sx={{cursor: 'pointer'}} display="flex" onClick={() => DialogModel.studentCodeOpened()}>
      {codeDialog ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank color="primary" />}
      <Typography sx={{ml: 1}}>Согласен с кодексом чести студента, изучающего курс</Typography>
    </Box>
  )
}
