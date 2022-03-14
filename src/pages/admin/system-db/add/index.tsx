import React from 'react'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  Slide,
  SlideProps,
} from '@mui/material'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import {useStore} from 'effector-react'
import {Link as RouterLink} from 'react-router-dom'
import * as model from './model'
import {adminRoutes} from 'src/router/paths'

const AdminSystemDbAddPage = () => {
  const newDb = useStore(model.$dbDto)
  const nameErr = useStore(model.$nameErr)
  const connStrErr = useStore(model.$connStrErr)
  const createDisabled = useStore(model.$createDisabled)
  const isCreateSucc = useStore(model.$createSuccess)

  const handleAlertClose = () => {
    model.createSuccessChanged(false)
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h3">
        <IconButton component={RouterLink} to={{pathname: adminRoutes.systemDb}} sx={{mr: 2}}>
          <ArrowBackIcon />
        </IconButton>
        Добавить новую базу данных
      </Typography>
      <Divider sx={{my: 2}} />

      <Stack gap={3}>
        <TextField
          value={newDb.name}
          required
          label="Название"
          error={nameErr}
          onChange={model.nameChanged}
        />
        <TextField
          value={newDb.description}
          label="Описание"
          multiline
          minRows={5}
          onChange={model.descriptionChanged}
        />
        <TextField
          value={newDb.connection_string}
          required
          error={connStrErr}
          label="Строка подключения"
          multiline
          onChange={model.connStrChanged}
        />
        <TextField
          value={newDb.creation_script}
          label="Скрипт"
          multiline
          onChange={model.creationScriptChanged}
        />

        <Button
          sx={{mt: 1}}
          variant="contained"
          disabled={createDisabled}
          onClick={() => model.createDbClicked()}
        >
          Создать
        </Button>
      </Stack>

      <Snackbar
        open={isCreateSucc}
        autoHideDuration={3000}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        onClose={handleAlertClose}
        TransitionComponent={SlideTransition}
      >
        <Alert variant="filled" severity="success">
          Новая база успешно добавлена!
        </Alert>
      </Snackbar>
    </Box>
  )
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />
}

export default AdminSystemDbAddPage
