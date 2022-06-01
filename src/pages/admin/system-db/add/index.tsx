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
import {adminRoutes} from 'src/app/router/paths'
import {RichTextEditor} from 'src/features/TextEditor'

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
        <Box sx={{display: 'flex', flexFlow: 'column', my: 1}}>
          <Typography gutterBottom>Описание</Typography>
          <RichTextEditor
            EditorProps={{
              label: 'Описание',
            }}
            onChange={(html) => model.descriptionChanged(html)}
          />
        </Box>
        <TextField
          value={newDb.connection_string}
          required
          error={connStrErr}
          label="Строка подключения"
          multiline
          onChange={model.connStrChanged}
        />
        <Box sx={{display: 'flex', flexFlow: 'column', my: 1}}>
          <Typography gutterBottom>Скрипт подключения</Typography>
          <RichTextEditor
            EditorProps={{
              label: 'Скрипт подключения',
            }}
            onChange={(html) => model.creationScriptChanged(html)}
          />
        </Box>

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
