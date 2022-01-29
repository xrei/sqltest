import React from 'react'
import {Navigate} from 'react-router-dom'
import {useGate, useStore} from 'effector-react'
import {Box, Typography, Paper, Button, useTheme, useMediaQuery} from '@mui/material'
import {ThemeTestGate} from './model'
import {routesPaths} from 'src/router'
import {TestContentModel} from 'src/features/Test'
import {TaskQuestions, AnswerByType} from 'src/features/Test/TestContent'

export const ThemeIdPage = () => {
  useGate(ThemeTestGate)
  const theme = useTheme()
  const hasData = useStore(TestContentModel.$hasTestAndTheme)
  const currentTheme = useStore(TestContentModel.$currentTheme)
  const test = useStore(TestContentModel.$test)

  if (!hasData || !test) return <Navigate to={routesPaths.tasks} />

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Box sx={{pb: 2, borderBottom: 1, borderColor: 'primary.lightGrey'}}>
        <Typography gutterBottom variant="h2">
          {currentTheme?.ThemeName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {test.TestName}
        </Typography>
      </Box>

      <Box
        display={'flex'}
        gap={4}
        sx={{
          my: 4,
          alignItems: 'center',
          justifyContent: useMediaQuery(theme.breakpoints.down('md'))
            ? 'space-between'
            : 'flex-start',
        }}
      >
        <Typography variant="h2">Задания</Typography>
        <Button size="medium" sx={{}} variant="contained" color="error" tabIndex={-1}>
          Закончить тест
        </Button>
      </Box>
      <TaskQuestions></TaskQuestions>

      <Paper sx={{mt: 4, p: 2}}>
        <CurrentQuestion />

        <AnswerByType></AnswerByType>
      </Paper>
    </Box>
  )
}

const CurrentQuestion = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)

  return (
    <>
      <Typography gutterBottom variant="h6">
        Текущее задание
      </Typography>
      <div dangerouslySetInnerHTML={{__html: currQsn.Content}} />
    </>
  )
}

export default ThemeIdPage
