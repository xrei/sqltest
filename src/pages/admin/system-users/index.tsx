import React from 'react'
import {
  Box,
  Paper,
  Button,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Checkbox,
  InputLabel,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from '@mui/material'
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import type {SystemUser} from 'src/types'
import * as model from './model'
import * as manageUserModel from './manageUserModel'

export const AdminSystemUsersPage = () => {
  useGate(model.SystemUsersPageGate)
  const [value, setValue] = React.useState(0)
  const systemUsers = useStore(model.$sysUsers)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box
        sx={{
          display: 'flex',
          flexFlow: {xs: 'column', md: 'row'},
          alignItems: {xs: 'flex-start', md: 'center'},
          mb: 2,
        }}
      >
        <Typography sx={{flex: 1, mb: {xs: 2, md: 0}}} variant="h1">
          Пользователи
        </Typography>

        <Button
          sx={{maxWidth: {xs: '100%', md: 300}}}
          fullWidth
          variant="contained"
          onClick={() => manageUserModel.dialogToggled()}
        >
          Новый пользователь
        </Button>
      </Box>
      <Box sx={{display: 'flex', flexFlow: {xs: 'column', md: 'row'}}}>
        <Tabs
          sx={{flex: 1, borderBottom: 1, borderColor: 'divider'}}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="пользователи"
        >
          <Tab label="Студенты" />
          <Tab label="Преподаватели" />
          <Tab label="Администраторы" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <UsersTable data={systemUsers.students} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UsersTable data={systemUsers.teachers} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UsersTable data={systemUsers.administrators} />
      </TabPanel>

      <ManageUserDialog />
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 2}}>{children}</Box>}
    </div>
  )
}

interface UsersTableProps {
  children?: React.ReactNode
  data: SystemUser[]
}

const UsersTable = (props: UsersTableProps) => {
  const {data} = props

  if (!data.length) {
    return (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography sx={{pt: 4}} variant="h3">
          Данных нет
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{backgroundColor: 'background.default'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 600}}>Название</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tr, idx) => (
            <TableRow key={idx} hover>
              <TableCell>{tr.user_name}</TableCell>
              <TableCell align="center" sx={{width: 140}}>
                <Tooltip title="Редактировать">
                  <IconButton sx={{mr: 2}} onClick={() => 1}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Удалить">
                  <IconButton onClick={() => model.deleteUserClicked(tr)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const UserRoleControl = () => {
  const user = useStore(manageUserModel.$userDto)

  return (
    <FormControl size="small">
      <FormLabel id="user-role-radio">Группа</FormLabel>
      <RadioGroup
        row
        aria-labelledby="user-role-radio"
        defaultValue={0}
        value={user.role}
        name="radio-buttons-group"
        onChange={manageUserModel.roleChanged}
      >
        <FormControlLabel value={0} control={<Radio size="small" />} label="Студент" />
        <FormControlLabel value={1} control={<Radio size="small" />} label="Преподаватель" />
        <FormControlLabel value={2} control={<Radio size="small" />} label="Администратор" />
      </RadioGroup>
    </FormControl>
  )
}

const AvailableGroupsSelect = () => {
  const {groups} = useStore(model.$sysUsers)
  const userGroups = useStore(manageUserModel.$userGroups)

  return (
    <FormControl size="small">
      <InputLabel id="available-groups-sel">Доступные группы</InputLabel>
      <Select
        labelId="available-groups-sel"
        id="available-groups"
        multiple
        value={userGroups}
        onChange={manageUserModel.groupSelected}
        input={<OutlinedInput label="Доступные группы" />}
        renderValue={(selected) =>
          selected.map((sel) => groups.find((gr) => gr.GroupValue === sel)?.GroupNumber).join(', ')
        }
      >
        {groups.map((group) => (
          <MenuItem key={group.GroupValue} value={group.GroupValue} dense>
            <Checkbox
              size="small"
              checked={userGroups.some((gv) => Number(gv) === group.GroupValue)}
            />
            <ListItemText primary={group.GroupNumber} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const AvailableSubjectSelect = () => {
  const {subjects} = useStore(model.$sysUsers)
  const userSubjects = useStore(manageUserModel.$userSubjects)

  return (
    <FormControl size="small">
      <InputLabel id="available-subjects-sel">Доступные дисциплины</InputLabel>
      <Select
        labelId="available-subjects-sel"
        id="available-subjects"
        multiple
        value={userSubjects}
        onChange={manageUserModel.subjectSelected}
        input={<OutlinedInput label="Доступные дисциплины" />}
        renderValue={(selected) =>
          selected.map((sel) => subjects.find((s) => s.SubjectId === sel)?.SubjectName).join(', ')
        }
      >
        {subjects.map((subj) => (
          <MenuItem key={subj.SubjectId} value={subj.SubjectId} dense>
            <Checkbox size="small" checked={userSubjects.some((sId) => sId === subj.SubjectId)} />
            <ListItemText primary={subj.SubjectName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const ManageUserDialog = () => {
  const open = useStore(manageUserModel.$manageDialog)
  const isEdit = useStore(manageUserModel.$isEditing)
  const user = useStore(manageUserModel.$userDto)
  const isSamePwds = useStore(manageUserModel.$isSamePassword)
  const availableGroupsShown = useStore(manageUserModel.$availableGroupsShown)
  const availableSubjectsShown = useStore(manageUserModel.$availableSubjectsShown)
  const allFilled = useStore(manageUserModel.$allFieldsFilled)

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={() => manageUserModel.dialogToggled()}
      scroll="paper"
    >
      <DialogTitle>{isEdit ? 'Редактировать пользователя' : 'Новый пользователь'}</DialogTitle>
      <DialogContent>
        <Box sx={{display: 'flex', flexFlow: 'column', gap: 2, pt: 1}}>
          <TextField
            size="small"
            required
            value={user.user_name}
            label="Имя"
            onChange={manageUserModel.nameChanged}
          />
          <TextField
            size="small"
            required
            value={user.login}
            label="Логин"
            onChange={manageUserModel.loginChanged}
          />
          <TextField
            size="small"
            required
            type="password"
            value={user.password}
            label="Пароль"
            onChange={manageUserModel.pwdChanged}
            error={!isSamePwds}
          />
          <TextField
            size="small"
            required
            type="password"
            value={user.repeat_password}
            label="Повтор пароля"
            onChange={manageUserModel.repPwdChanged}
            error={!isSamePwds}
            helperText={!isSamePwds ? 'Пароли не совпадают' : ''}
          />

          <UserRoleControl />

          {availableGroupsShown && <AvailableGroupsSelect />}
          {availableSubjectsShown && <AvailableSubjectSelect />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => manageUserModel.dialogToggled()}>Закрыть</Button>
        <Button
          disabled={!allFilled || !isSamePwds}
          variant="contained"
          onClick={() => manageUserModel.addUserClicked()}
        >
          {isEdit ? 'Редактировать' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminSystemUsersPage
