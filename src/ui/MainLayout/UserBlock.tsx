import React, {useState} from 'react'
import {useStore} from 'effector-react'
import {Link} from 'react-router-dom'
import {AccountCircle, Logout as LogoutIcn} from '@mui/icons-material'
import {
  useTheme,
  useMediaQuery,
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
import {routesPaths} from 'src/app/router/paths'
import {$user, $userNameLetters, $userIsStudent} from 'src/entities/User/model'
import {adminDrawerToggled, adminDrawerMobToggled} from './drawerModel'
import {ModeButton} from './ThemeModeSwitch'

export const UserBlock: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const user = useStore($user)
  const isUserStudent = useStore($userIsStudent)
  const userLetters = useStore($userNameLetters)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isUserStudent) {
      setAnchorEl(event.currentTarget)
    } else {
      if (isMobile) {
        adminDrawerMobToggled()
      } else {
        adminDrawerToggled()
      }
    }
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
          <Typography>{user?.Name ?? 'Username'}</Typography>
        </Button>
      </Tooltip>

      <Menu
        MenuListProps={{dense: false}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem component={Link} to={routesPaths.profile}>
          <Avatar
            sx={{
              mr: 2,
              width: 32,
              height: 32,
              fontSize: '12px',
              color: 'inherit',
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            {userLetters}
          </Avatar>
          Профиль
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
        <ModeButton />
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
