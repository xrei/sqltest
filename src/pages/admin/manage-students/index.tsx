import React, {useState} from 'react'
import type {GridColDef} from '@mui/x-data-grid'
import {
  useTheme,
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import {GroupSelector, GroupModel} from 'src/entities/Group'
import * as model from './model'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import {ruRU} from '@mui/x-data-grid'

const DataGrid = React.lazy(() =>
  import('@mui/x-data-grid').then((module) => ({default: module.DataGrid}))
)

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

const GroupSelect = () => {
  const groupVal = useStore(model.$selectedGroup)
  const groupList = useStore(GroupModel.$adminGroups)
  const disabled = useStore(GroupModel.fetchAdminGroupsFx.pending)

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
        disabled={disabled}
      ></GroupSelector>

      <Button
        variant="contained"
        size="small"
        onClick={() => model.showStudentsClicked()}
        disabled={disabled}
      >
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

const TableCols: GridColDef[] = [
  {field: 'FIO', headerName: 'ФИО', flex: 1},
  {field: 'groupName', headerName: 'Группа', flex: 1},
  {field: 'creationDate', headerName: 'Дата регистрации', flex: 1},
  {field: 'stu_activity', headerName: 'Дата последнего теста', flex: 1},
  {
    flex: 1,
    field: 'tasks',
    headerName: '',
    headerClassName: 'lastcolumnSeparator',
    renderCell: (cellVals) => {
      const {row} = cellVals
      return (
        <Tooltip title="Изменить возможность предложения заданий">
          <Link
            onClick={() => model.changeStudentSuggestAbilityClicked(row)}
            sx={{
              color: row.suggest_questions ? 'success.main' : 'error.main',
              cursor: 'pointer',
            }}
            underline="hover"
          >
            {row.suggest_questions ? 'Может предлагать задания' : 'Не может предлагать задания'}
          </Link>
        </Tooltip>
      )
    },
    sortable: false,
  },
  {
    field: 'edit',
    width: 140,
    headerName: '',
    headerClassName: 'lastcolumnSeparator',
    renderCell: (cellVals) => {
      const {row} = cellVals
      return (
        <>
          <Tooltip title="Редактировать">
            <IconButton sx={{mr: 2}} onClick={() => model.addToEditStudentClicked(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить">
            <IconButton onClick={() => model.deleteStudentClicked(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )
    },
    sortable: false,
  },
]

const CustomStudentsTable = () => {
  const rows = useStore(model.$students)
  const [pageSize, setPageSize] = useState(20)

  return (
    <Box sx={{width: '100%', mt: 4}}>
      <React.Suspense fallback={<CenteredLoader />}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle': {
              textOverflow: 'clip',
              whiteSpace: 'normal',
              userSelect: 'none',
            },
            '& .lastcolumnSeparator .MuiDataGrid-columnSeparator--sideRight': {
              display: 'none !important',
            },
          }}
          rows={rows}
          columns={TableCols}
          pageSize={pageSize}
          autoHeight
          density={'standard'}
          rowsPerPageOptions={[20, 30, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
          disableColumnMenu
          disableSelectionOnClick
          disableColumnSelector
          initialState={{
            sorting: {
              sortModel: [{field: 'FIO', sort: 'desc'}],
            },
          }}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        />
      </React.Suspense>
    </Box>
  )
}

const ManageStudentDialog = () => {
  const open = useStore(model.$studentDialog)
  const stud = useStore(model.$studentDto)
  const isEdit = useStore(model.$isEditing)
  const groupList = useStore(GroupModel.$adminGroups)

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
