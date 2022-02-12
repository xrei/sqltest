import React from 'react'
import {Stack, Typography, Link, Box} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useNavigate} from 'react-router'
import {useGate, useStore} from 'effector-react'
import {TestResultsGate} from './model'
import {UserModel} from 'src/features/User'
import {TestContentModel} from 'src/features/Test'

export const TaskResultPage = () => {
  useGate(TestResultsGate)
  const navigate = useNavigate()
  const results = useStore(TestContentModel.$testResults)
  const user = useStore(UserModel.$user)
  const loading = useStore(TestContentModel.startTestAgainFx.pending)

  const startTestAgain = async () => {
    const res = await TestContentModel.startTestAgainFx()
    if (res) {
      navigate(`/tasks/${res.ThemeId}`)
    }
  }

  return (
    <Stack mt={2} rowGap={2} maxWidth="md">
      <Typography variant="h3">{results?.completedTheme.ThemeName}</Typography>
      <Typography variant="h4">Тест прошел: {user?.Name}</Typography>
      <Typography variant="h4">
        Заданий в тесте: <b>{results?.testResult.AnswerCount}</b>
      </Typography>
      <Typography variant="h4">
        Правильных ответов на <b>{results?.testResult.CountRightAnswers}</b> заданий
      </Typography>
      <Typography variant="h4">
        Оценка: <b>{results?.testResult.Mark}</b>
      </Typography>
      <Typography variant="h4">
        Процент: <b>{results?.testResult.percent}</b>
      </Typography>
      <Typography variant="h4">
        Если тест выполнен успешно просьба сообщить об этом преподавателю, выслав сообщение с
        номером группы, ФИО и скриншотом результата на почту{' '}
        <Link href="mailto:avm@rgrty.ru" type="email">
          avm@rgrty.ru
        </Link>
        . Тема сообщения соответствует теме теста.
      </Typography>
      <Box>
        <LoadingButton loading={loading} sx={{mb: 2}} variant="contained" onClick={startTestAgain}>
          Пройти этот тест еще раз
        </LoadingButton>
      </Box>
    </Stack>
  )
}
