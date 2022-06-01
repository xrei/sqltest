import React, {useState} from 'react'
import {useGate, useStore, useList} from 'effector-react'
import {
  Stack,
  Box,
  Paper,
  Divider,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Tooltip,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  FormatListBulleted as FormatListBulletedIcon,
} from '@mui/icons-material'
import {Navigate, useParams, Link as RouterLink} from 'react-router-dom'
import * as model from './model'
import {adminRoutes} from 'src/router/paths'
import {AdminTheme} from 'src/types'
import {CenteredLoader} from 'src/ui/CenteredLoader'
import {AdminSubjectsModel} from 'src/features/AdminSubjects'
import {ExpandMoreIcon} from 'src/ui/ExpandMoreButton'
import {AllTasksCopyDialog, copyDialogOpenedWithThemeId} from 'src/features/AdminSubjects/ui'
import {ArrowBackButton} from 'src/ui/ArrowBackButton'

export const AdminSubjectIdPage = () => {
  const params = useParams()
  const subjId = Number(params.subjId)

  if (subjId && !Number.isInteger(subjId)) return <Navigate to={adminRoutes.tests} />

  useGate(model.AdminSubjectIdPageGate, {SubjId: subjId})

  const subject = useStore(model.$subject)

  if (!subject) return <PageLoader />

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <ArrowBackButton sx={{mr: 2}} to={adminRoutes.tests} />
        <Typography variant="h1">Дисциплина: {subject.SubjName}</Typography>
      </Box>
      <Divider sx={{my: 2}} />

      <Box sx={{display: 'flex', flexFlow: 'column', mb: 2}}>
        <Typography variant="h2">Описание</Typography>
        {subject.Description.length ? (
          <div dangerouslySetInnerHTML={{__html: subject.Description}}></div>
        ) : (
          <Typography variant="caption">Описание отсутствует</Typography>
        )}
      </Box>

      <Typography variant="h2" gutterBottom>
        Список тем в дисциплине
      </Typography>
      <ThemesList />

      <AllTasksCopyDialog />
    </Box>
  )
}

const ThemesList = () => {
  const themes = useStore(model.$themes)
  const themeList = themes.map((theme) => <SubjThemeCard key={theme.ThemeId} theme={theme} />)

  return (
    <Stack gap={2}>
      {themeList}
      <Button
        component={RouterLink}
        to={adminRoutes.testsThemeAdd}
        sx={{maxWidth: 300, mt: 4}}
        variant="outlined"
      >
        Добавить тему
      </Button>
    </Stack>
  )
}

type SubjThemeCardProps = {
  theme: AdminTheme
}
const SubjThemeCard = ({theme}: SubjThemeCardProps) => {
  const [testsExpanded, setTestsExpanded] = useState(false)

  return (
    <Card sx={{maxWidth: '100%'}}>
      <CardContent sx={{display: 'flex', flexFlow: 'column', p: 2, '&:last-child': {pb: 2}}}>
        <Box sx={{display: 'flex'}}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography sx={{fontWeight: 500}} variant="h4" gutterBottom>
              {theme.ThemeName}
            </Typography>
            <Button
              size="small"
              color="info"
              onClick={() => setTestsExpanded(!testsExpanded)}
              startIcon={<ExpandMoreIcon expand={testsExpanded} />}
            >
              {testsExpanded ? 'Скрыть тесты' : 'Показать тесты'}
            </Button>
          </Box>
          <Box sx={{display: 'flex', flexFlow: 'column'}}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.5}}>
              <Tooltip title={theme.Availible ? 'Доступна' : 'Недоступна'} arrow>
                <IconButton
                  size="small"
                  color={theme.Availible ? 'success' : 'error'}
                  onClick={() => AdminSubjectsModel.changeThemeVisibilityClicked(theme.ThemeId)}
                >
                  {theme.Availible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Задания" arrow>
                <IconButton
                  component={RouterLink}
                  to={adminRoutes.testsSubjIdQuestionsThemeId
                    .replace(':themeId', String(theme.ThemeId))
                    .replace(':subjId', String(theme.ThemeSubjId))}
                  size="small"
                  sx={{'&:hover': {color: 'primary.main'}}}
                >
                  <FormatListBulletedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Редактировать" arrow>
                <IconButton
                  component={RouterLink}
                  to={adminRoutes.testsSubjIdThemeIdEdit
                    .replace(':themeId', String(theme.ThemeId))
                    .replace(':subjId', String(theme.ThemeSubjId))}
                  size="small"
                  sx={{'&:hover': {color: 'warning.main'}}}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить тему" arrow>
                <IconButton
                  size="small"
                  sx={{'&:hover': {color: 'error.main'}}}
                  onClick={() => AdminSubjectsModel.deleteThemeClicked(theme.ThemeId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
              <Button size="small" onClick={() => copyDialogOpenedWithThemeId(theme.ThemeId)}>
                Копирование заданий
              </Button>
            </Box>
          </Box>
        </Box>
        <Collapse in={testsExpanded} timeout="auto" unmountOnExit>
          <Stack gap={1}>
            {theme.ThemeTests.map((test) => (
              <Paper
                sx={{display: 'flex', alignItems: 'center', mt: 2, p: 1, borderRadius: 0.5}}
                variant="outlined"
                key={test.TestId}
              >
                <Typography sx={{flex: 1}}>
                  <b>{test.TestName}</b>
                </Typography>
                <Box sx={{display: 'flex'}}>
                  <Tooltip title="Редактировать тест">
                    <IconButton size="small" sx={{'&:hover': {color: 'warning.main'}}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Удалить тест">
                    <IconButton
                      size="small"
                      sx={{'&:hover': {color: 'error.main'}}}
                      onClick={() => AdminSubjectsModel.deleteTestClicked(test.TestId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  )
}

const PageLoader = () => {
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

export default AdminSubjectIdPage
