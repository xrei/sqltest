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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useGate, useStore} from 'effector-react'
import {GroupSelector} from 'src/ui/GroupSelector'
import {AdminGroupsModel} from 'src/features/User/Admin'
import * as model from './model'

const AdminJournalPage = () => {
  useGate(model.JournalPageGate)
  const groupList = useStore(AdminGroupsModel.$adminGroups)
  const groupId = useStore(model.$groupId)
  const isBtnActive = useStore(model.$isFormJournalActive)
  const loading = useStore(model.fetchJournalDataFx.pending)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1" sx={{mb: 2}}>
        Журнал
      </Typography>
      <Box sx={{display: 'flex', flexFlow: 'column', gap: 2, maxWidth: '600px'}}>
        <SubjSelector></SubjSelector>
        <GroupSelector
          value={groupId}
          list={groupList}
          onChange={model.groupSelected}
        ></GroupSelector>
        <LoadingButton
          variant="contained"
          disabled={!isBtnActive}
          loading={loading}
          onClick={() => model.formJournalClicked()}
        >
          Сформировать журнал
        </LoadingButton>
      </Box>
      <JournalTable />
    </Box>
  )
}

const JournalTable = () => {
  const journal = useStore(model.$journal)
  return (
    <TableContainer component={Paper} sx={{my: 2}}>
      <Table size="small" sx={{minWidth: 500}} aria-label="journal table">
        <TableHead>
          <TableRow>
            <TableCell>Название темы</TableCell>
            <TableCell width={100}>ФИО</TableCell>
            <TableCell>Высший бал</TableCell>
            <TableCell>Кол-во попыток</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {journal.map((j, idx) => (
            <TableRow hover key={idx}>
              <TableCell>{j.themeName}</TableCell>
              <TableCell>{j.stuFIO}</TableCell>
              <TableCell>{j.avgMark}</TableCell>
              <TableCell>{j.testCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const SubjSelector: React.FC = () => {
  const list = useStore(model.$adminSubjects)
  const value = useStore(model.$subjId)
  return (
    <FormControl sx={{maxWidth: 'sm', mr: 2}} fullWidth variant="outlined" size="small">
      <InputLabel id="adm-group-sel">Дисциплина</InputLabel>
      <Select
        value={value}
        labelId="adm-group-sel"
        label="Дисциплина"
        onChange={model.subjSelected}
      >
        {list.map((x) => (
          <MenuItem dense key={x.SubjectId} value={x.SubjectId}>
            {x.SubjectName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AdminJournalPage
