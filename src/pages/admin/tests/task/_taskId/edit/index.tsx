import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useParams, Navigate} from 'react-router-dom'
import {useGate} from 'effector-react'
import {ArrowBackButton} from 'src/shared/ui/ArrowBackButton'
import {adminRoutes} from 'src/app/router/paths'
import {ManageTaskForm} from 'src/features/AdminSubjects/ui/ManageTaskForm'
import * as model from './model'

const AdminTestsTaskIdEditPage = () => {
  const params = useParams()
  const taskId = Number(params.taskId)

  if (Number.isNaN(taskId) || taskId === 0 || !Number.isInteger(taskId))
    return <Navigate to={adminRoutes.tests} />

  useGate(model.TaskIdPageGate, {taskId})

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Редактировать учебное задание</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <ManageTaskForm isEdit={true} taskId={taskId} />
    </Box>
  )
}

export default AdminTestsTaskIdEditPage
