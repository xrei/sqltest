import React from 'react'
import {Navigate} from 'react-router-dom'
import {useGate, useStore} from 'effector-react'
import {Box, Typography, Paper, Button, useTheme, useMediaQuery, Divider} from '@mui/material'
import {ThemeTestGate} from './model'
import {routesPaths} from 'src/router'
import {TestContentModel} from 'src/features/Test'
import {
  TaskQuestions,
  AnswerByType,
  HelperButtons,
  DBContentDialog,
  IncorrectQsnDialog,
  QueryResultButtons,
  QueryResultDialog,
} from 'src/features/Test/TestContent'

export const ThemeIdPage = () => {
  useGate(ThemeTestGate)
  const theme = useTheme()
  const hasData = useStore(TestContentModel.$hasTestAndTheme)
  const currentTheme = useStore(TestContentModel.$currentTheme)
  const test = useStore(TestContentModel.$test)
  const showQueryResultButtons = useStore(TestContentModel.$isQuestionForEditor)

  if (!hasData || !test) return <Navigate to={routesPaths.tasks} />

  const showTestHelp = Boolean(test.TestHelp)
  const showTestAdditions = Array.isArray(test.Additions) && Boolean(test.Additions.length)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2, mb: 4}}>
      <Box>
        <Typography gutterBottom variant="h2">
          {currentTheme?.ThemeName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {test.TestName}
        </Typography>
        <Divider sx={{mt: 2}} />
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

      <Paper sx={{my: 4, p: 2, userSelect: 'none'}}>
        <CurrentQuestion />

        <AnswerByType></AnswerByType>

        {showQueryResultButtons && <QueryResultButtons />}
      </Paper>

      <HelperButtons />
      {showTestHelp && <TestHelp />}
      {showTestAdditions && <TestAdditions />}

      <DBContentDialog />
      <IncorrectQsnDialog />
      <QueryResultDialog />
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
      <div style={{userSelect: 'none'}} dangerouslySetInnerHTML={{__html: currQsn.Content}} />
    </>
  )
}

const TestHelp = () => {
  const test = useStore(TestContentModel.$test)
  if (!test || !test.TestHelp) return <></>

  return (
    <>
      <Divider sx={{mt: 4}} />
      <Box>
        <div dangerouslySetInnerHTML={{__html: test.TestHelp}}></div>
      </Box>
    </>
  )
}

const TestAdditions = () => {
  const test = useStore(TestContentModel.$test)
  if (!test) return <></>

  return (
    <>
      <Divider sx={{mt: 4}} />
      <Box>
        {test.Additions.map((add, idx) => (
          <div key={idx} dangerouslySetInnerHTML={{__html: add.Content}}></div>
        ))}
      </Box>
    </>
  )
}

export default ThemeIdPage
