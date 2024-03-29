import React from 'react'
import {Box, Divider, IconButton, Typography} from '@mui/material'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import {StudentAnswersView} from 'src/widgets/StudentAnswers'
import {AnswersSelectForm} from 'src/widgets/StudentAnswers/Form'
import * as model from './model'

export const AdminStudentAnswersPage = () => {
  const resultsView = useStore(model.$resultsView)
  useGate(model.StudentAnswersPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box display="flex" alignItems="center">
        {resultsView && (
          <IconButton sx={{mr: 2}} onClick={() => model.resultsViewToggled()}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h3">Информация о тесте</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      {resultsView ? <StudentAnswersView /> : <AnswersSelectForm />}
    </Box>
  )
}

export default AdminStudentAnswersPage
