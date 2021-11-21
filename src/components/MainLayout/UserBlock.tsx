import React, {useState} from 'react'
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

export const UserBlock: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <Typography>user name</Typography>
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
        <MenuItem>
          <Avatar sx={{mr: 2, width: 32, height: 32}} /> Профиль
        </MenuItem>
        <Divider />
        <MenuItem>Пройти тест</MenuItem>
        <MenuItem>Последние попытки</MenuItem>
        <MenuItem>Рейтинг студентов</MenuItem>
        <MenuItem>Скрипты для создания БД</MenuItem>
        <MenuItem>Описание баз данных</MenuItem>
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
