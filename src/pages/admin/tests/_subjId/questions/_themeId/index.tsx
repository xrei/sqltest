import React from 'react'
import {useGate, useStore} from 'effector-react'
import {
  Box,
  Paper,
  Divider,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  Launch as LaunchIcon,
  Edit as EditIcon,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material'
import {Navigate, useParams} from 'react-router-dom'
import type {Question} from 'src/types'
import {adminRoutes} from 'src/router/paths'
import {QuestionTypes, QuestionCategories, QuestionDifficulties} from 'src/lib/questionMaps'
import {TaskStatisticsDialog, openStatisticsDialog} from 'src/features/AdminSubjects/ui'
import {ArrowBackButton} from 'src/ui/ArrowBackButton'
import * as model from './model'

export const AdminTestsQuestionsThemeIdPage = () => {
  const params = useParams()
  const themeId = Number(params.themeId)

  if (themeId && !Number.isInteger(themeId)) return <Navigate to={adminRoutes.tests} />

  useGate(model.AdminQsnByThemePageGate, {themeId})

  const themeName = useStore(model.$themeName)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 2}}>
        <ArrowBackButton to={adminRoutes.testsSubjId.replace(':subjId', String(params.subjId))} />
        <Typography variant="h1">Задания в теме - {themeName}</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <QuestionsTable />

      <TaskStatisticsDialog />
    </Box>
  )
}

const QuestionsTable = () => {
  const qsns = useStore(model.$questions)

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
          {qsns.map((tr, idx) => (
            <TableRow key={idx}>
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
          <IconButton size="small" sx={{'&:hover': {color: 'primary.main'}}}>
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
        <IconButton size="small" sx={{'&:hover': {color: 'primary.main'}}}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Редактировать" arrow>
        <IconButton size="small" sx={{'&:hover': {color: 'warning.main'}}}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Удалить" arrow>
        <IconButton size="small" sx={{'&:hover': {color: 'error.main'}}} onClick={() => 1}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default AdminTestsQuestionsThemeIdPage
