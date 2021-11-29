import React, {useState} from 'react'
import {useStore} from 'effector-react'
import {Link} from 'react-router-dom'
import {AccountCircle, Logout as LogoutIcn} from '@mui/icons-material'
import {
  Button,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {authLogOff} from 'src/api'
import {routesPaths} from 'src/router'
import {$user} from 'src/features/User/model'

export const UserBlock: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const user = useStore($user)

  return (
    <React.Fragment>
      <Tooltip title="Профиль">
        <Button
          size="large"
          variant="text"
          color="inherit"
          sx={{textTransform: 'none', height: '100%'}}
          startIcon={<AccountCircle />}
          onClick={handleClick}
        >
          <Typography>{user?.Name ?? 'Username'}</Typography>
        </Button>
      </Tooltip>

      <Menu
        MenuListProps={{dense: true}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem component={Link} to={routesPaths.profile}>
          <Avatar sx={{mr: 2, width: 32, height: 32}} /> Профиль
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to={routesPaths.tasks}>
          Пройти тест
        </MenuItem>
        <MenuItem component={Link} to={routesPaths.profileMyResults}>
          Последние попытки
        </MenuItem>
        <MenuItem component={Link} to={routesPaths.profileStudentsRating}>
          Рейтинг студентов
        </MenuItem>
        <MenuItem component={Link} to={routesPaths.dbinfos}>
          Описание баз данных
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => authLogOff()}>
          <ListItemIcon>
            <LogoutIcn></LogoutIcn>
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
