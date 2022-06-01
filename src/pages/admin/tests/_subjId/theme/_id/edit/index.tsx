import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {useParams, Navigate} from 'react-router-dom'
import {adminRoutes} from 'src/app/router/paths'
import {ArrowBackButton} from 'src/ui/ArrowBackButton'
import {ManageThemeForm} from 'src/features/AdminSubjects/ui'
import {any} from 'ramda'

export const AdminThemeIdEditPage = () => {
  const params = useParams()
  const themeId = Number(params.themeId)
  const subjId = Number(params.subjId)

  if (any(isParamIdNotValid, [themeId, subjId])) return <Navigate to={adminRoutes.tests} />

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <ArrowBackButton to={adminRoutes.tests} />
        <Typography variant="h1">Редактировать тему</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <ManageThemeForm isEdit={true} subjId={subjId} themeId={themeId} />
    </Box>
  )
}

const isParamIdNotValid = <T,>(param: T) =>
  Number.isNaN(param) || Number(param) === 0 || !Number.isInteger(param)

export default AdminThemeIdEditPage
