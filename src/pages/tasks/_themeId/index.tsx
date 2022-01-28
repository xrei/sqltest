import React from 'react'
import {Navigate} from 'react-router-dom'
import {useGate, useStore} from 'effector-react'
import {Box, Typography, Paper} from '@mui/material'
import {ThemeTestGate} from './model'
import {routesPaths} from 'src/router'
import {TestContentModel} from 'src/features/Test'
import {TaskQuestions} from 'src/features/Test/TestContent'

export const ThemeIdPage = () => {
  useGate(ThemeTestGate)
  const hasData = useStore(TestContentModel.$hasTestAndTheme)
  const currentTheme = useStore(TestContentModel.$currentTheme)
  const test = useStore(TestContentModel.$test)
  const currQsn = useStore(TestContentModel.$currQuestion)

  if (!hasData || !test) return <Navigate to={routesPaths.tasks} />

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Box sx={{pb: 2, borderBottom: 1, borderColor: 'primary.lightGrey'}}>
        <Typography gutterBottom variant="h2">
          {currentTheme?.ThemeName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {test?.TestName}
        </Typography>
      </Box>

      <Typography variant="h2" sx={{mt: 2, mb: 1}}>
        Задания
      </Typography>
      <TaskQuestions></TaskQuestions>
      <Paper sx={{mt: 4, p: 2}}>
        <Typography gutterBottom variant="h6">
          Текущее задание
        </Typography>
        <div dangerouslySetInnerHTML={{__html: currQsn.Content}} />
      </Paper>
    </Box>
  )
}

export default ThemeIdPage
