import React from 'react'
import {
  Box,
  Divider,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useGate, useStore} from 'effector-react'
import {GroupModel, GroupSelector} from 'src/entities/Group'
import {SubjectsModel, SubjectSelector} from 'src/entities/Subject'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme/'
import * as model from './model'
import {CenteredLoader} from 'src/ui/CenteredLoader'

export const AdminTaskStatisticsPage = () => {
  useGate(model.AdminStatisticsPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box display="flex" alignItems="center">
        <Typography variant="h3">Статистические данные</Typography>
      </Box>

      <Divider sx={{my: 2}} />

      <Form />
      <StatisticsTable />
    </Box>
  )
}

const Form = () => {
  const selectedSubject = useStore(model.$subjId)
  const selectedGroup = useStore(model.$groupId)
  const selectedTheme = useStore(model.$themeId)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const groups = useStore(GroupModel.$adminGroups)
  const themes = useStore(ThemesModel.$adminThemes)
  const isStatisticsLoading = useStore(model.$statisticsLoading)
  const isStatisticsByGroupLoading = useStore(model.$statisticsByGroupLoading)

  return (
    <Box
      component={Paper}
      sx={{display: 'flex', flexFlow: 'column', my: 2, gap: 2, p: 2, maxWidth: 768}}
    >
      <SubjectSelector
        sx={{maxWidth: '100%'}}
        value={selectedSubject}
        list={subjects}
        onChange={model.subjSelected}
      />
      <Box sx={{display: 'flex', gap: {xs: 1, sm: 0}, flexFlow: {xs: 'column', sm: 'row'}}}>
        <ThemeSelector
          disabled={!selectedSubject}
          value={selectedTheme}
          list={themes}
          onChange={model.themeSelected}
        />
        <LoadingButton
          disabled={!selectedTheme || !selectedSubject}
          loading={isStatisticsLoading}
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => model.formStatisticsClicked()}
        >
          Сформировать
        </LoadingButton>
      </Box>
      <Box sx={{display: 'flex', gap: {xs: 1, sm: 0}, flexFlow: {xs: 'column', sm: 'row'}}}>
        <GroupSelector
          disabled={!selectedSubject || !selectedTheme}
          value={selectedGroup}
          list={groups}
          onChange={model.groupSelected}
        />

        <LoadingButton
          disabled={!selectedTheme || !selectedGroup}
          loading={isStatisticsByGroupLoading}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => model.formStatisticsByGroupClicked()}
        >
          Сформировать по группам
        </LoadingButton>
      </Box>
    </Box>
  )
}

const StatisticsTable = () => {
  const data = useStore(model.$statsData)
  const loading = useStore(model.$isRatingsLoading)

  return (
    <TableContainer component={Paper} sx={{backgroundColor: 'background.default'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', width: 60}}>#</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Коэффициент легкости</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Коэффициент сложности</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Среднеквадратическое отклонение</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Количество выпадений</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Уровень сложности</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} height={100}>
                <CenteredLoader />
              </TableCell>
            </TableRow>
          ) : (
            data.map((tr, idx) => (
              <TableRow key={idx}>
                <TableCell>{tr.qsn_id}</TableCell>
                <TableCell>{tr.easy_coefficient}</TableCell>
                <TableCell>{tr.hard_coefficient}</TableCell>
                <TableCell>{tr.standart_deviation.toFixed(5)}</TableCell>
                <TableCell>{tr.countInThemesQsn}</TableCell>
                <TableCell>{tr.exit_difficulty}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminTaskStatisticsPage
