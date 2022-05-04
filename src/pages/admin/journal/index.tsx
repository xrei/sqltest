import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useGate, useStore} from 'effector-react'
import {GroupSelector} from 'src/ui/GroupSelector'
import {AdminGroupsModel} from 'src/features/User/Admin'
import {SubjectsModel} from 'src/features/Test'
import * as model from './model'
import {SubjectSelector} from 'src/ui/SubjectSelector'

const AdminJournalPage = () => {
  useGate(model.JournalPageGate)
  const groupList = useStore(AdminGroupsModel.$adminGroups)
  const groupId = useStore(model.$groupId)
  const isBtnActive = useStore(model.$isFormJournalActive)
  const loading = useStore(model.fetchJournalDataFx.pending)
  const subjList = useStore(SubjectsModel.$adminSubjects)
  const subjValue = useStore(model.$subjId)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1" sx={{mb: 2}}>
        Журнал
      </Typography>
      <Box sx={{display: 'flex', flexFlow: 'column', gap: 2, maxWidth: '600px'}}>
        <SubjectSelector list={subjList} value={subjValue} onChange={model.subjSelected} />
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

export default AdminJournalPage
