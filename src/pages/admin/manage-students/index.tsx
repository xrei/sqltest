import React from 'react'
import {
  useTheme,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Link,
  Divider,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
} from '@mui/material'
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from '@mui/icons-material'
import * as model from './model'
import {useGate, useStore} from 'effector-react'
import {AdminGroupsModel} from 'src/features/User/Admin'
import type {StudentGroup} from 'src/types'

const AdminManageStudentsPage = () => {
  useGate(model.AdminManageStudentsPageGate)

  return (
    <Box display="flex" flexDirection="column" my={4}>
      <Box
        display="flex"
        sx={{flexFlow: {xs: 'column', md: 'row'}, alignItems: {sm: 'center'}, gap: {xs: 1, md: 2}}}
      >
        <Typography variant="h3">Список студентов</Typography>
        <Button variant="contained" onClick={() => model.dialogToggled()}>
          Добавить нового студента
        </Button>
      </Box>
      <Divider sx={{my: 2}} />

      <GroupSelect />

      <CustomStudentsTable />

      <ManageStudentDialog />
    </Box>
  )
}

interface GroupSelectorProps {
  list: StudentGroup[]
  value: string
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}
const GroupSelector: React.FC<GroupSelectorProps> = ({list, value, onChange}) => {
  return (
    <FormControl sx={{maxWidth: 'sm', mr: 2}} fullWidth variant="outlined" size="small">
      <InputLabel id="adm-group-sel">Группа</InputLabel>
      <Select value={value} labelId="adm-group-sel" label="Группа" onChange={onChange}>
        {list.map((x) => (
          <MenuItem dense key={x.GroupValue} value={x.GroupValue}>
            {x.GroupNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const GroupSelect = () => {
  const groupVal = useStore(model.$selectedGroup)
  const groupList = useStore(AdminGroupsModel.$adminGroups)

  return (
    <Box
      display="flex"
      width="100%"
      sx={{flexFlow: {xs: 'column', md: 'row'}, gap: {xs: 1, md: 0}}}
    >
      <GroupSelector
        list={groupList}
        value={groupVal}
        onChange={model.groupChanged}
      ></GroupSelector>

      <Button variant="contained" size="small" onClick={() => model.showStudentsClicked()}>
        Отобразить
      </Button>
    </Box>
  )
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const {count, page, rowsPerPage, onPageChange} = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

const CustomStudentsTable = () => {
  const rows = useStore(model.$students)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper} sx={{my: 2}}>
      <Table sx={{minWidth: 500}} aria-label="students table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ФИО</TableCell>
            <TableCell align="center" width={100}>
              Группа
            </TableCell>
            <TableCell align="center">Дата регистрации</TableCell>
            <TableCell align="center">Дата последнего решенного теста</TableCell>
            <TableCell></TableCell>
            <TableCell>Управление</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id} hover>
              <TableCell component="th" scope="row">
                {row.FIO}
              </TableCell>
              <TableCell align="center">{row.groupName}</TableCell>
              <TableCell align="center">{row.creationDate}</TableCell>
              <TableCell align="center">{row.stu_activity}</TableCell>
              <TableCell align="center">
                <Link
                  onClick={() => model.changeStudentSuggestAbilityClicked(row)}
                  sx={{
                    color: row.suggest_questions ? 'success.main' : 'error.main',
                    cursor: 'pointer',
                  }}
                  underline="hover"
                >
                  {row.suggest_questions
                    ? 'Может предлагать задания'
                    : 'Не может предлагать задания'}
                </Link>
              </TableCell>
              <TableCell align="center">
                <Link onClick={() => model.addToEditStudentClicked(row)} underline="hover">
                  Редактировать
                </Link>
              </TableCell>
              <TableCell align="center">
                <Link onClick={() => model.deleteStudentClicked(row)} underline="hover">
                  Удалить
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows}}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              align="left"
              rowsPerPageOptions={[10, 20, 50, {label: 'All', value: -1}]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Строк на странице"
              labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Строк на странице',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

const ManageStudentDialog = () => {
  const open = useStore(model.$studentDialog)
  const stud = useStore(model.$studentDto)
  const isEdit = useStore(model.$isEditing)
  const groupList = useStore(AdminGroupsModel.$adminGroups)

  const handleConfirmClick = () => {
    if (isEdit) {
      model.editStudentClicked()
    } else {
      model.addStudentClicked()
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={() => model.dialogToggled()} scroll="paper">
      <DialogTitle>{isEdit ? 'Редактировать студента' : 'Добавить студента'}</DialogTitle>
      <DialogContent>
        <Box sx={{display: 'flex', flexFlow: 'column', gap: 4, pt: 1}}>
          <TextField
            sx={{maxWidth: 'sm'}}
            size="small"
            value={stud.FIO}
            onChange={model.fioChanged}
            label="ФИО"
          />
          <GroupSelector
            list={groupList}
            value={stud.groupId}
            onChange={model.studGroupChanged}
          ></GroupSelector>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.dialogToggled()}>Закрыть</Button>
        <Button variant="contained" onClick={handleConfirmClick}>
          {isEdit ? 'Редактировать' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminManageStudentsPage
