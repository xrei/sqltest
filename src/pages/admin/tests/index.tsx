import React, {useState} from 'react'
import {useGate, useList} from 'effector-react'
import {
  Grid,
  Box,
  Stack,
  Divider,
  Typography,
  Paper,
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
} from '@mui/icons-material'
import {useNavigate, Link as RouterLink} from 'react-router-dom'
import type {AdminSubject} from 'src/types'
import {AdminSubjectsModel} from 'src/features/AdminSubjects'
import {adminRoutes} from 'src/router/paths'
import {ExpandMoreIcon} from 'src/ui/ExpandMoreButton'
import * as model from './model'

const AdminTestsPage = () => {
  useGate(model.AdminTestsPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1">Список дисциплин</Typography>
      <Divider sx={{my: 2}} />

      <Grid sx={{position: 'relative'}} spacing={2} container>
        <Grid item xs={9}>
          <Stack gap={2}>
            <SubjectCardList />
          </Stack>
        </Grid>
        <Grid sx={{position: 'relative'}} item xs={3}>
          <Paper
            sx={{
              position: 'sticky',
              top: '4rem',
              p: 2,
              display: 'flex',
              flexFlow: 'column',
              gap: 2,
            }}
            elevation={5}
          >
            <Button
              component={RouterLink}
              to={adminRoutes.testsAdd}
              variant="contained"
              color="warning"
            >
              Добавить предмет
            </Button>
            <Button variant="outlined" color="primary">
              Добавить тему
            </Button>
            <Button variant="outlined" color="info">
              Добавить тест
            </Button>
            <Button variant="outlined" color="info">
              Добавить задание
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

const SubjectCardList = () =>
  useList(AdminSubjectsModel.$subjectsList, (subj, idx) => {
    return <SubjectCard subj={subj} />
  })
type SubjCardProps = {
  subj: AdminSubject
}
const SubjectCard = ({subj}: SubjCardProps) => {
  const [expandedDescr, setExpandedDescr] = useState(false)
  const navigate = useNavigate()

  const onCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    navigate(adminRoutes.testsSubjId.replace(':subjId', String(subj.SubjId)))
  }

  return (
    <Card
      sx={{
        maxWidth: '100%',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: '#00000005',
        },
      }}
      onClick={onCardClick}
    >
      <CardContent sx={{display: 'flex', p: 2, '&:last-child': {pb: 1}}}>
        <Box sx={{flex: 1}}>
          <Typography sx={{fontWeight: 500}} variant="h4" gutterBottom>
            {subj.SubjName}
          </Typography>
          <Button
            sx={{p: 0, px: 1}}
            variant="text"
            size="small"
            color="info"
            onClick={(e) => {
              e.stopPropagation()
              setExpandedDescr(!expandedDescr)
            }}
            startIcon={<ExpandMoreIcon expand={expandedDescr} />}
          >
            {expandedDescr ? 'Скрыть описание' : 'Показать описание'}
          </Button>
          <Collapse in={expandedDescr} timeout="auto" unmountOnExit>
            <div dangerouslySetInnerHTML={{__html: subj.Description}}></div>
          </Collapse>
        </Box>
        <Box sx={{display: 'flex', flexFlow: 'column'}}>
          <Box sx={{display: 'flex', gap: 0.25}} onClick={(e) => e.stopPropagation()}>
            <Tooltip title={subj.Availible ? 'Доступен' : 'Недоступен'} arrow>
              <IconButton
                size="small"
                color={subj.Availible ? 'success' : 'error'}
                onClick={() => {
                  AdminSubjectsModel.changeSubjectVisibilityClicked(subj.SubjId)
                }}
              >
                {subj.Availible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Редактировать" arrow>
              <IconButton
                component={RouterLink}
                to={adminRoutes.testsSubjIdEdit.replace(':subjId', String(subj.SubjId))}
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
                onClick={() => {
                  AdminSubjectsModel.deleteSubjectClicked(subj.SubjId)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
export default AdminTestsPage
