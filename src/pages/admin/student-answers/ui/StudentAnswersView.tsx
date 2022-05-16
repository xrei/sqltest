import {
  Box,
  Typography,
  Collapse,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material'
import {
  Functions as FunctionsIcon,
  Delete as DeleteIcon,
  ReadMore as ReadMoreIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'
import type {GridColDef} from '@mui/x-data-grid'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {useList, useStore} from 'effector-react'
import {StudentRating, StudentsRatings} from 'src/types'
import {ExpandMoreButton} from 'src/ui/ExpandMoreButton'
import {CenteredLoader} from 'src/ui/CenteredLoader'
import * as FormModel from './FormModel'
import * as ManageAnswersModel from './ManageAnswersModel'
import {adminRoutes} from 'src/router/paths'

const DataGrid = React.lazy(() =>
  import('@mui/x-data-grid').then((module) => ({default: module.DataGrid}))
)

export const StudentAnswersView = () => {
  const currentTheme = useStore(FormModel.$currentThemeSelected)
  const ratings = useStore(ManageAnswersModel.$results)

  const ratingsList = useList(ManageAnswersModel.$results, (rating, idx) => (
    <StudentRatingCard student={rating} />
  ))

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Typography variant="h3">{currentTheme?.ThemeName}</Typography>

      <Stack sx={{mt: 4}}>{ratings.length ? ratingsList : <CenteredLoader />}</Stack>
    </Box>
  )
}

const StudentRatingCard: React.FC<{student: StudentRating}> = ({student}) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Card sx={{maxWidth: '100%'}}>
      <CardContent sx={{display: 'flex', alignItems: 'center', p: 1, px: 2}}>
        <Box sx={{flex: 1, display: 'flex', gap: 2, alignItems: 'center'}}>
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Показать результаты"
          >
            <Tooltip title="Показать результаты">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMoreButton>
          <Typography variant="body1">
            <b>{student.StudentsFIO}</b>
          </Typography>
        </Box>
        <Typography variant="body1" sx={{mr: 1}}>
          Попыток: <b> {student.RatingCount}</b>
        </Typography>
        <Typography variant="body1">
          Лучший результат: <b> {student.BestMark}</b>
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{width: '100%', height: 600}}>
            <ResultsTable results={student.StudentsRatings} />
          </Box>
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Свернуть"
          >
            <Tooltip title="Свернуть">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMoreButton>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const TableCols: GridColDef[] = [
  {field: 'countEasy', headerName: 'Правильно легких', flex: 1, sortable: false},
  {field: 'countMiddle', headerName: 'Правильно средних', flex: 1, sortable: false},
  {field: 'countComplex', headerName: 'Правильно сложных', flex: 1, sortable: false},
  {field: 'countUser', headerName: 'Всего ответов', flex: 1, sortable: false},
  {field: 'AnswerCount', headerName: 'Всего заданий', flex: 1, sortable: false},
  {field: 'Mark', headerName: 'Оценка', sortable: false},
  {field: 'percent', headerName: 'Процент', sortable: false},
  {field: 'TimeStart', headerName: 'Время начала', flex: 1},
  {field: 'TimeEnd', headerName: 'Время окончания', flex: 1},
  {
    field: 'more',
    width: 50,
    headerName: '',
    headerClassName: 'lastcolumnSeparator',
    renderCell: (cellVals) => {
      return (
        <Tooltip title="Подробнее">
          <IconButton
            component={RouterLink}
            to={adminRoutes.studentAnswersRatingId.replace(':ratingId', cellVals.row.RatingId)}
            size="small"
            color="success"
            aria-label="Подробнее"
          >
            <ReadMoreIcon />
          </IconButton>
        </Tooltip>
      )
    },
    sortable: false,
  },
  {
    field: 'recalc',
    width: 50,
    headerName: '',
    headerClassName: 'lastcolumnSeparator',
    renderCell: (cellVals) => {
      return (
        <Tooltip title="Пересчитать">
          <IconButton
            size="small"
            color="warning"
            aria-label="Пересчитать"
            onClick={() => {
              ManageAnswersModel.reCalcRatingClicked({
                RatingId: cellVals.row.RatingId,
                studentRatingId: cellVals.row.studentRatingId,
              })
            }}
          >
            <FunctionsIcon />
          </IconButton>
        </Tooltip>
      )
    },
    sortable: false,
  },
  {
    field: 'delete',
    width: 60,
    headerName: '',
    headerClassName: 'lastcolumnSeparator',
    renderCell: (cellVals) => {
      return (
        <Tooltip title="Удалить">
          <IconButton
            size="small"
            color="error"
            aria-label="Удалить"
            onClick={() => {
              ManageAnswersModel.deleteRatingClicked({
                RatingId: cellVals.row.RatingId,
                studentRatingId: cellVals.row.studentRatingId,
              })
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    },
    sortable: false,
  },
]

const ResultsTable: React.FC<{results: StudentsRatings[]}> = ({results}) => {
  return (
    <React.Suspense fallback={<CenteredLoader />}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle': {
            textOverflow: 'clip',
            lineHeight: '1.43rem',
            whiteSpace: 'normal',
          },
          '& .lastcolumnSeparator .MuiDataGrid-columnSeparator--sideRight': {
            display: 'none !important',
          },
        }}
        rows={results}
        columns={TableCols}
        pageSize={20}
        density={'comfortable'}
        rowsPerPageOptions={[20]}
        disableColumnMenu
        disableSelectionOnClick
        disableColumnSelector
        initialState={{
          sorting: {
            sortModel: [{field: 'TimeStart', sort: 'desc'}],
          },
        }}
      />
    </React.Suspense>
  )
}
