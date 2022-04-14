import React from 'react'
import {Box, Typography} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import type {GridColDef} from '@mui/x-data-grid'
import {ThemeSelect, SubjectSelect} from 'src/features/Test'
import {$results, ResultsPageGate} from './model'
import {CenteredLoader} from 'src/ui/CenteredLoader'

const DataGrid = React.lazy(() =>
  import('@mui/x-data-grid').then((module) => ({default: module.DataGrid}))
)

export const MyResultsPage = () => {
  useGate(ResultsPageGate)

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography gutterBottom variant="h3">
        Последние результаты тестирования
      </Typography>
      <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2, md: 4}}}>
        <Box sx={{mb: 2, width: '50%'}}>
          <Typography sx={{mb: 1}} variant="h5">
            Выберите дисциплину:
          </Typography>
          <SubjectSelect />
        </Box>
        <Box sx={{width: '50%'}}>
          <Typography sx={{mb: 1}} variant="h5">
            Выберите тему:
          </Typography>
          <ThemeSelect />
        </Box>
      </Box>

      <Box sx={{mt: 4, mb: 4, width: '100%', height: 600}}>
        <ResultsTable />
      </Box>
    </Box>
  )
}

const TableCols: GridColDef[] = [
  {field: 'countEasy', headerName: 'Правильно легких', flex: 1},
  {field: 'countMiddle', headerName: 'Правильно средних', flex: 1},
  {field: 'countComplex', headerName: 'Правильно сложных', flex: 1},
  {field: 'countUser', headerName: 'Всего ответов', flex: 1},
  {field: 'AnswerCount', headerName: 'Всего заданий', flex: 1},
  {field: 'Mark', headerName: 'Оценка'},
  {field: 'percent', headerName: 'Процент'},
  {field: 'TimeStart', headerName: 'Время начала', flex: 1},
  {field: 'TimeEnd', headerName: 'Время окончания', flex: 1},
]

const ResultsTable = () => {
  const results = useStore($results)
  return (
    <React.Suspense fallback={<CenteredLoader />}>
      <DataGrid
        rows={results}
        columns={TableCols}
        pageSize={7}
        density={'comfortable'}
        rowsPerPageOptions={[7]}
        disableColumnMenu
      />
    </React.Suspense>
  )
}
