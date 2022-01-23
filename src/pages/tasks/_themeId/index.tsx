import React from 'react'
import {Navigate} from 'react-router-dom'
import {useGate, useStore} from 'effector-react'
import {Box, Typography} from '@mui/material'
import {ThemeTestGate} from './model'
import {routesPaths} from 'src/router'
import {TestContentModel} from 'src/features/Test'
import {TaskQuestions} from 'src/features/Test/TestContent'

export const ThemeIdPage = () => {
  useGate(ThemeTestGate)
  const hasData = useStore(TestContentModel.$hasTestAndTheme)
  const currentTheme = useStore(TestContentModel.$currentTheme)
  const test = useStore(TestContentModel.$test)

  if (!hasData) return <Navigate to={routesPaths.tasks} />

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Typography gutterBottom variant="h2">
        {currentTheme?.ThemeName}
      </Typography>
      <Typography variant="subtitle1">{test?.TestName}</Typography>

      <Typography variant="h2" sx={{mt: 4, mb: 1}}>
        Задания
      </Typography>
      <TaskQuestions></TaskQuestions>
    </Box>
  )
}

export default ThemeIdPage
