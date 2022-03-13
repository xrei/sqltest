import React from 'react'
import {
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
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {Link as NavLink} from 'react-router-dom'
import * as model from './model'
import {AdminGroupsModel} from 'src/features/User/Admin'

export const AdminManageGroupsPage = () => {
  useGate(model.AdminGroupsPageGate)
  const groups = useStore(AdminGroupsModel.$adminGroups)

  return (
    <Box display="flex" flexDirection="column" sx={{my: 2}}>
      <Typography variant="h3">Список групп</Typography>
      <Divider sx={{my: 2}} />
      <CreateGroup />

      <Box sx={{overflowY: 'scroll', mt: 4}}>
        <TableContainer component={Paper} sx={{backgroundColor: 'background.default', minWidth: '900px'}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Группа</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Авторегистрация</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((tr, idx) => (
                <TableRow hover key={idx}>
                  <TableCell>{tr.GroupNumber}</TableCell>
                  <TableCell>
                    <Checkbox checked={tr.register} disabled />
                  </TableCell>
                  <TableCell>
                    <Link component={NavLink} to="/admin/manage-students" sx={{cursor: 'pointer'}}>
                      Студенты
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link sx={{cursor: 'pointer'}} onClick={() => model.addGroupToEditClicked(tr)}>
                      Редактировать
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link sx={{cursor: 'pointer'}} onClick={() => model.deleteGroupClicked(tr)}>
                      Удалить
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

const CreateGroup = () => {
  const groupDto = useStore(model.$groupDto)
  const isEdit = useStore(model.$isEdit)

  const onAddClick = () => {
    if (isEdit) {
      model.editGroupClicked()
    } else {
      model.addGroupClicked()
    }
  }

  return (
    <Box>
      <Typography sx={{mb: 2}}>Добавить/редактировать группу</Typography>
      <Box display="flex" mb={2} gap={4}>
        <TextField
          label="Группа"
          size="small"
          value={groupDto.GroupNumber}
          onChange={model.nameChanged}
        ></TextField>
        <FormControlLabel
          label="Авторегистрация"
          control={<Checkbox checked={groupDto.register} onChange={model.autoRegChanged} />}
        />
      </Box>
      <Button sx={{mr: 4}} variant="contained" onClick={onAddClick}>
        {isEdit ? 'Редактировать' : 'Добавить'}
      </Button>

      {isEdit && (
        <Button variant="contained" color="error" onClick={() => model.resetNewGroup()}>
          Отмена
        </Button>
      )}
    </Box>
  )
}

export default AdminManageGroupsPage
