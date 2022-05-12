import React from 'react'
import {Box, Stack, TextField, Typography, Button, Divider, IconButton} from '@mui/material'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import {useParams} from 'react-router'
import {Link as RouterLink} from 'react-router-dom'
import * as model from './model'
import {adminRoutes} from 'src/router/paths'
import {CenteredLoader} from 'src/ui/CenteredLoader'

const AdminSystemDbEditPage = () => {
  const params = useParams()
  useGate(model.SysDbEditPageGate, {id: Number(params.id)})

  const isLoading = useStore(model.$isDbsLoading)
  const editDb = useStore(model.$editDbDto)
  const nameErr = useStore(model.$nameErr)
  const connStrErr = useStore(model.$connStrErr)
  const editDisabled = useStore(model.$editDisabled)

  if (isLoading) {
    return <CenteredLoader fullHeight />
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h3">
        <IconButton component={RouterLink} to={{pathname: adminRoutes.systemDb}} sx={{mr: 2}}>
          <ArrowBackIcon />
        </IconButton>
        Редактировать базу данных
      </Typography>
      <Divider sx={{my: 2}} />

      <Stack gap={3}>
        <TextField
          value={editDb.name}
          required
          label="Название"
          error={nameErr}
          onChange={model.nameChanged}
        />
        <TextField
          maxRows={10}
          value={editDb.description}
          label="Описание"
          multiline
          minRows={5}
          onChange={model.descriptionChanged}
        />
        <TextField
          maxRows={10}
          value={editDb.connection_string}
          required
          error={connStrErr}
          label="Строка подключения"
          multiline
          onChange={model.connStrChanged}
        />
        <TextField
          maxRows={10}
          value={editDb.creation_script}
          label="Скрипт"
          multiline
          onChange={model.creationScriptChanged}
        />

        <Button
          sx={{mt: 1}}
          variant="contained"
          disabled={editDisabled}
          onClick={() => model.editDbClicked()}
        >
          Редактировать
        </Button>
      </Stack>
    </Box>
  )
}

export default AdminSystemDbEditPage
