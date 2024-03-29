import React from 'react'
import {useGate, useStore} from 'effector-react'
import {
  Box,
  Paper,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  Launch as LaunchIcon,
  Edit as EditIcon,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material'
import {Navigate, useParams, Link as RouterLink} from 'react-router-dom'
import type {Question} from 'src/types'
import {adminRoutes} from 'src/app/router/paths'
import {QuestionTypes, QuestionCategories, QuestionDifficulties} from 'src/shared/lib/questionMaps'
import {
  TaskStatisticsDialog,
  openStatisticsDialog,
  TaskQueryDialog,
  queryDialogOpened,
  SingleTaskCopyDialog,
  copyDialogOpenedWithQsn,
} from 'src/features/AdminSubjects/ui'
import {ArrowBackButton} from 'src/shared/ui/ArrowBackButton'
import * as model from './model'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import {LoadingButton} from '@mui/lab'

export const AdminTestsQuestionsThemeIdPage = () => {
  const params = useParams()
  const themeId = Number(params.themeId)

  if (themeId && !Number.isInteger(themeId)) return <Navigate to={adminRoutes.tests} />

  useGate(model.AdminQsnByThemePageGate, {themeId})

  const themeName = useStore(model.$themeName)
  const isLoading = useStore(model.$isLoading)
  const qsns = useStore(model.$questions)
  const isSqlCheckLoading = useStore(model.checkWrongSqlQuestionsFx.pending)
  const isMongoCheckLoading = useStore(model.checkWrongMongoQuestionsFx.pending)

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CenteredLoader />
      </Box>
    )
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 2}}>
        <ArrowBackButton to={adminRoutes.testsSubjId.replace(':subjId', String(params.subjId))} />
        <Typography variant="h1">Задания в теме - {themeName}</Typography>
      </Box>
      <Divider sx={{my: 2}} />

      <QuestionsTable questions={qsns} />
      <Divider sx={{my: 4}} />

      <Box sx={{display: 'flex', flexFlow: {xs: 'column', sm: 'row'}, gap: 2, mb: 2}}>
        <LoadingButton
          variant="outlined"
          color="secondary"
          size="small"
          loading={isSqlCheckLoading}
          onClick={() => model.checkWrongSqlQuestionsFx(themeId)}
        >
          Показать некорректные SQL запросы
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          color="secondary"
          size="small"
          loading={isMongoCheckLoading}
          onClick={() => model.checkWrongMongoQuestionsFx(themeId)}
        >
          Показать некорректные MongoDB-запросы
        </LoadingButton>
      </Box>
      <WrongSQLQuestions />
      <WrongMongoQuestions />

      <TaskStatisticsDialog />
      <TaskQueryDialog />
      <SingleTaskCopyDialog />
    </Box>
  )
}

const QuestionsTable = ({questions}: {questions: Question[]}) => {
  return (
    <TableContainer component={Paper} sx={{backgroundColor: 'background.default'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: 50}}>№</TableCell>
            <TableCell>Задание</TableCell>
            <TableCell sx={{width: 100}}>Тип</TableCell>
            <TableCell sx={{width: 100}}>Сложность</TableCell>
            <TableCell sx={{width: 100}}>Опция</TableCell>
            <TableCell sx={{width: 100}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((tr, idx) => (
            <TableRow key={idx} hover>
              <TableCell>{tr.Id}</TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{__html: tr.Content}}></div>
              </TableCell>
              <TableCell>{QuestionTypes[tr.Type]}</TableCell>
              <TableCell>{QuestionDifficulties[tr.Difficulty]}</TableCell>
              <TableCell>{QuestionCategories[tr.Category]}</TableCell>
              <TableCell>
                <QuestionControls qsn={tr} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type QuestionControlsProps = {
  qsn: Question
}
const QuestionControls = ({qsn}: QuestionControlsProps) => {
  const canExecQuery = qsn.Type > 3

  return (
    <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
      {canExecQuery && (
        <Tooltip title="Выполнить запрос" arrow>
          <IconButton
            size="small"
            sx={{'&:hover': {color: 'primary.main'}}}
            onClick={() => queryDialogOpened(qsn.Id)}
          >
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Статистика" arrow>
        <IconButton
          size="small"
          sx={{'&:hover': {color: 'warning.main'}}}
          onClick={() => openStatisticsDialog(qsn.Id)}
        >
          <QueryStatsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Копировать в другую тему" arrow>
        <IconButton
          size="small"
          sx={{'&:hover': {color: 'primary.main'}}}
          onClick={() => copyDialogOpenedWithQsn(qsn)}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Редактировать" arrow>
        <IconButton
          component={RouterLink}
          to={adminRoutes.testsTaskIdEdit.replace(':taskId', String(qsn.Id))}
          size="small"
          sx={{'&:hover': {color: 'warning.main'}}}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Удалить" arrow>
        <IconButton
          size="small"
          sx={{'&:hover': {color: 'error.main'}}}
          onClick={() => model.deleteTaskClicked(qsn.Id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

const WrongSQLQuestions = () => {
  const wrongQsns = useStore(model.$wrongSqlQuestions)
  if (wrongQsns && Array.isArray(wrongQsns)) {
    return (
      <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
        <Typography variant="h4" gutterBottom>
          Некорректные SQL задания
        </Typography>
        <QuestionsTable questions={wrongQsns} />
      </Box>
    )
  } else {
    return <></>
  }
}
const WrongMongoQuestions = () => {
  const wrongQsns = useStore(model.$wrongMongoQuestions)
  if (wrongQsns && Array.isArray(wrongQsns)) {
    return (
      <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
        <Typography variant="h4" gutterBottom>
          Некорректные Mongo задания
        </Typography>
        <QuestionsTable questions={wrongQsns} />
      </Box>
    )
  } else {
    return <></>
  }
}

export default AdminTestsQuestionsThemeIdPage
