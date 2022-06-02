import React from 'react'
import {
  Box,
  Divider,
  Typography,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Collapse,
  Paper,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  alpha,
  useTheme,
} from '@mui/material'
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import {Link as RouterLink, useParams, Navigate} from 'react-router-dom'
import {useGate, useList, useStore} from 'effector-react'
import type {RatingQnA} from 'src/types'
import {adminRoutes} from 'src/app/router/paths'
import {ExpandMoreButton} from 'src/shared/ui/ExpandMoreButton'
import {DBContentTables} from 'src/shared/ui/DBContentTables'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import * as model from './model'

export const UserRatingIdPage = () => {
  const params = useParams()
  const RatingId = params.ratingId

  if (!RatingId) return <Navigate to={adminRoutes.studentAnswers}></Navigate>

  useGate(model.RatingIdPageGate, {RatingId: Number(RatingId)})

  const studentName = useStore(model.$studentFio)
  const loading = useStore(model.$pageLoading)

  const renderList = useList(model.$ratingList, (rating) => <RatingBlock rating={rating} />)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box display="flex" alignItems="center">
        <IconButton component={RouterLink} to={adminRoutes.studentAnswers} sx={{mr: 2}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3">Результаты</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      {loading ? (
        <CenteredLoader />
      ) : (
        <>
          <Typography variant="h5">{studentName}</Typography>
          <Stack sx={{my: 2}} gap={4}>
            {renderList}
          </Stack>
        </>
      )}

      <CompareAnswersDialog />
    </Box>
  )
}

type RatingBlockProps = {
  rating: RatingQnA
}
const RatingBlock = (props: RatingBlockProps) => {
  const theme = useTheme()
  const rating = props.rating
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleCompareClick = () => {
    model.compareAnswersClicked({
      Id: rating.QsnID,
      UserAnswer: rating.AnswersText[0],
    })
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', p: 2}} component={Paper}>
      <TableContainer sx={{mb: 2}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold', width: 60, maxWidth: 60}}>#</TableCell>
              <TableCell sx={{fontWeight: 'bold', flex: 1}}>Текст</TableCell>
              <TableCell sx={{fontWeight: 'bold', width: 120}}>Тип</TableCell>
              <TableCell sx={{fontWeight: 'bold', width: 100}}>Сложность</TableCell>
              <TableCell sx={{fontWeight: 'bold', width: 100}}>Категория</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              backgroundColor: rating.IsRight
                ? alpha(theme.palette.success.light, 0.3)
                : alpha(theme.palette.error.main, 0.3),
            }}
          >
            <TableRow>
              <TableCell>{rating.RatingId}</TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{__html: rating.QuestionText}}></div>
              </TableCell>
              <TableCell>{rating.QsnType}</TableCell>
              <TableCell>{rating.QsnDifficulty}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Card elevation={0}>
        <CardContent sx={{p: 1}}>
          <Box sx={{flex: 1, display: 'flex', gap: 2, alignItems: 'center'}}>
            <ExpandMoreButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Посмотреть ответы"
            >
              <Tooltip title="Посмотреть ответы">
                <ExpandMoreIcon />
              </Tooltip>
            </ExpandMoreButton>
            <Typography
              variant="body1"
              onClick={handleExpandClick}
              sx={{cursor: 'pointer', '&:hover': {textDecoration: 'underline'}}}
            >
              Посмотреть ответы
            </Typography>
          </Box>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{display: 'flex', flexFlow: 'column', gap: 4, pt: 0}}>
            <Box
              sx={{
                display: 'flex',
                flexFlow: {xs: 'column', md: 'row'},
                gap: {xs: 3, md: 6},
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Box sx={{display: 'flex', flexFlow: 'column', flex: 1, overflowX: 'auto'}}>
                <Typography textAlign={'center'} gutterBottom>
                  <b>Ответ студента</b>
                </Typography>
                <Box component={'code'}>{rating.AnswersText[0]}</Box>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={{display: 'flex', flexFlow: 'column', flex: 1, overflowX: 'auto'}}>
                <Typography textAlign={'center'} gutterBottom>
                  <b>Правильный ответ</b>
                </Typography>
                <Box component={'code'}>{rating.SystemAnswersText[0]}</Box>
              </Box>
            </Box>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              display: 'flex',
              flexFlow: {xs: 'column', sm: 'row'},
              gap: 2,
              alignItems: 'flex-start',
            }}
          >
            <Button variant="contained" color="primary" onClick={() => handleCompareClick()}>
              Сравнить ТРЗ
            </Button>
            <Button variant="contained" color="info" onClick={() => handleCompareClick()}>
              Сравнить ТРЗ NoSQL
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Box>
  )
}

const CompareAnswersDialog = () => {
  const open = useStore(model.$compareDialogOpen)
  const results = useStore(model.$comparedResults)
  const loading = useStore(model.$compareInProcess)

  return (
    <Dialog maxWidth="xl" fullWidth open={open} onClose={() => model.compareDialogClosed()}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h2">Сравнение табличных результатов</Typography>
        <Button size="large" variant="outlined" onClick={() => model.compareDialogClosed()}>
          Закрыть
        </Button>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <CenteredLoader />
        ) : (
          <Stack>
            <Typography variant="h3" gutterBottom>
              Результат выполнения запроса
            </Typography>
            <DBContentTables tables={results.user} />

            <Typography variant="h3" gutterBottom>
              Результат выполнения эталонного запроса
            </Typography>
            <DBContentTables tables={results.system} />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UserRatingIdPage
