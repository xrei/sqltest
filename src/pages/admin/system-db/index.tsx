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
  IconButtonProps,
  Tooltip,
  styled,
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
import {Link as NavLink} from 'react-router-dom'
import {DBInfo} from 'src/types'
import * as model from './model'
import {adminRoutes} from 'src/router/paths'
import {DBContentTables} from 'src/features/DBContentTables'

export const AdminSystemDbPage = () => {
  useGate(model.SystemDbPageGate)

  const dbs = useStore(model.$dbs)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box
        display="flex"
        sx={{flexFlow: {xs: 'column', md: 'row'}, alignItems: {sm: 'center'}, gap: {xs: 1, md: 2}}}
      >
        <Typography variant="h3" sx={{flex: 1}}>
          Базы данных
        </Typography>
        <Button component={NavLink} to={adminRoutes.systemDbAdd} variant="contained">
          Новая база данных
        </Button>
      </Box>
      <Divider sx={{my: 2}}></Divider>

      <Stack gap={2}>
        {dbs.map((db) => (
          <DbCard db={db} key={db.id} />
        ))}
      </Stack>

      <DbContentDialog />
    </Box>
  )
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props
  return <IconButton {...other} />
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
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
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Контент"
        >
          <Tooltip title="Контент">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
        <Tooltip title="Содержание">
          <IconButton aria-label="Содержание" onClick={() => model.openDbContentClicked(db)}>
            <SourceIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Редактировать">
          <IconButton aria-label="Редактировать">
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
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Свернуть"
          >
            <Tooltip title="Свернуть">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
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
