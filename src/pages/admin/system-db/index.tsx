import React from 'react'
import {
  Box,
  Stack,
  Button,
  Divider,
  Collapse,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Source as SourceIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import {Link as RouterLink} from 'react-router-dom'
import {DBInfo} from 'src/types'
import * as model from './model'
import {adminRoutes} from 'src/router/paths'
import {DBContentTables} from 'src/features/DBContentTables'
import {ExpandMoreButton} from 'src/ui/ExpandMoreButton'
import {CenteredLoader} from 'src/ui/CenteredLoader'

export const AdminSystemDbPage = () => {
  useGate(model.SystemDbPageGate)
  const isLoading = useStore(model.fetchDatabasesFx.pending)
  const dbs = useStore(model.$dbs)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box
        display="flex"
        sx={{flexFlow: {xs: 'column', md: 'row'}, alignItems: {sm: 'center'}, gap: {xs: 1, md: 2}}}
      >
        <Typography variant="h1" sx={{flex: 1}}>
          Базы данных
        </Typography>
        <Button component={RouterLink} to={adminRoutes.systemDbAdd} variant="contained">
          Новая база данных
        </Button>
      </Box>
      <Divider sx={{my: 2}}></Divider>

      {isLoading ? (
        <CenteredLoader boxProps={{mt: 4}} />
      ) : (
        <Stack gap={2}>
          {dbs.map((db) => (
            <DbCard db={db} key={db.id} />
          ))}
        </Stack>
      )}

      <DbContentDialog />
    </Box>
  )
}

const DbCard: React.FC<{db: DBInfo}> = ({db}) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{maxWidth: '100%'}}>
      <CardContent>
        <Typography>{db.name}</Typography>
      </CardContent>
      <CardActions sx={{p: 1, pt: 0}}>
        <ExpandMoreButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Контент"
        >
          <Tooltip title="Контент">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMoreButton>
        <Tooltip title="Содержание">
          <IconButton aria-label="Содержание" onClick={() => model.openDbContentClicked(db)}>
            <SourceIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Редактировать">
          <IconButton
            component={RouterLink}
            to={adminRoutes.systemDbEdit.replace(':id', String(db.id))}
            aria-label="Редактировать"
            onClick={() => model.addDbToEditClicked(db)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить">
          <IconButton aria-label="Удалить" onClick={() => model.deleteDbClicked(db)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div dangerouslySetInnerHTML={{__html: db.description}}></div>
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Свернуть"
          >
            <Tooltip title="Свернуть">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMoreButton>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const DbContentDialog = () => {
  const open = useStore(model.$dbContentDialog)
  const {tables, name} = useStore(model.$dbContent)

  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={open}
      onClose={() => model.dialogToggled()}
      scroll="paper"
    >
      <DialogTitle>Содержимое базы данных {name}</DialogTitle>
      <DialogContent>
        <DBContentTables tables={tables} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.dialogToggled()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminSystemDbPage
