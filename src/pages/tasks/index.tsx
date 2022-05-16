import React from 'react'
import {Box, Typography, Grid, Stack} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {useNavigate} from 'react-router'
import {useGate, useStore} from 'effector-react'
import {ThemesModel, ThemeSelect} from 'src/entities/Theme'
import {SubjectSelect} from 'src/entities/Subject'
import {TasksGate, startTestFx} from './model'

const TasksPage = () => {
  const navigate = useNavigate()
  useGate(TasksGate)
  const selectedTheme = useStore(ThemesModel.$selectedTheme)
  const isLoading = useStore(startTestFx.pending)

  const startTest = async () => {
    const res = await startTestFx()
    if (res) {
      navigate(`/tasks/${res.ThemeId}`)
    }
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Typography variant="h1" sx={{mb: 4}}>
        Параметры тестирования:
      </Typography>

      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Stack>
            <Box sx={{mb: 2}}>
              <Typography sx={{mb: 3}} variant="h4">
                Выберите дисциплину:
              </Typography>
              <SubjectSelect />
            </Box>
            <Box>
              <Typography sx={{mb: 3}} variant="h4">
                Выберите тему:
              </Typography>
              <ThemeSelect />
              {selectedTheme && (
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  fullWidth
                  sx={{mt: 2}}
                  onClick={startTest}
                >
                  Начать тест
                </LoadingButton>
              )}
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          sx={{display: 'flex', justifyContent: 'flex-end', flexFlow: 'column'}}
        >
          <TestMeta />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TasksPage

const TestMeta = () => {
  const selectedTheme = useStore(ThemesModel.$selectedTheme)
  if (!selectedTheme) return <></>
  const time = selectedTheme.Test.TestTimeFromDB
  const timeText = time ? (
    <>
      <b>{time}</b> минут
    </>
  ) : (
    <b>Не ограничено</b>
  )

  return (
    <>
      <Typography variant="h6" sx={{mb: 1}}>
        {selectedTheme.Test.TestName}
      </Typography>
      <Box sx={{display: 'flex'}}>
        <Typography sx={{mr: 2}}>Всего попыток тестирования: </Typography>
        <Typography fontWeight="bold">{selectedTheme.Test.TestCount || 'Не ограничено'}</Typography>
      </Box>
      <Box sx={{display: 'flex'}}>
        <Typography sx={{mr: 2}}>Время тестирования: {timeText}</Typography>
      </Box>
      <Box sx={{display: 'flex'}}>
        <Typography sx={{mr: 2}}>Заданий в тесте: </Typography>
        <Typography fontWeight="bold">{selectedTheme.Test.QsnCount}</Typography>
      </Box>
    </>
  )
}
