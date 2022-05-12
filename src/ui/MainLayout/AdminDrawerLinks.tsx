import React from 'react'
import {Link} from 'react-router-dom'
import {useStore} from 'effector-react'
import {
  styled,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
  Typography,
} from '@mui/material'
import {
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcn,
} from '@mui/icons-material'
import {
  adminDrawerClosed,
  $adminMobDrawer,
  adminDrawersResetted,
  adminDrawerMobClosed,
} from './drawerModel'
import {authLogOff} from 'src/api'
import {adminRoutes} from 'src/router/paths'
import {$userRole} from 'src/features/User/model'
import {ModeButton} from './ThemeModeSwitch'
import {AdminNewsModel} from 'src/features/User/Admin/AdminNews'

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  minHeight: '48px',
}))

const adminPages = [
  {to: adminRoutes.studentAnswers, text: 'Ответы студентов'},
  {to: adminRoutes.journal, text: 'Журнал'},
  {to: adminRoutes.manageTests, text: 'Тесты'},
  {to: adminRoutes.groups, text: 'Группы'},
  {to: adminRoutes.students, text: 'Студенты'},
]

const adminEntitiesPages = [
  {to: adminRoutes.systemUsers, text: 'Доступы'},
  {to: adminRoutes.systemDb, text: 'Базы данных'},
  {to: adminRoutes.systemQuery, text: 'Системные запросы'},
  {to: adminRoutes.materials, text: 'Материалы'},
  {to: '#', text: 'Добавить новость', onClick: AdminNewsModel.manageNewsDialogToggled},
  {to: adminRoutes.addAuthor, text: 'Добавить автора'},
  {to: adminRoutes.systemInfo, text: 'Информация для режима студента'},
]

const adminStatsPages = [
  {to: '/admin/student-rating', text: 'Рейтинги студентов'},
  {to: '/admin/tasks-stats', text: 'Статистика по заданиям'},
  {to: '/admin/online-users', text: 'Пользователи онлайн'},
  {to: adminRoutes.studentComplaints, text: 'Замечания студентов'},
]

export const AdminDrawerLinks = () => {
  const userRole = useStore($userRole)
  const isMobDrawerOpen = useStore($adminMobDrawer)
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const onLogout = () => {
    adminDrawersResetted()
    authLogOff()
  }

  const closeMobDrawerOnClick = () => {
    adminDrawerMobClosed()
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', flex: 1}}>
      <DrawerHeader>
        {!isMobDrawerOpen && (
          <IconButton onClick={() => adminDrawerClosed()}>
            <ChevronRightIcon />
          </IconButton>
        )}
        <Typography>{userRole}</Typography>
        <ModeButton />
      </DrawerHeader>
      <Divider />
      <List>
        {adminPages.map((page, index) => (
          <ListItem
            component={Link}
            to={page.to}
            button
            dense
            key={index}
            onClick={() => {
              closeMobDrawerOnClick()
            }}
          >
            <ListItemText primary={page.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List disablePadding>
        <ListItem dense button onClick={handleClick}>
          <ListItemText primary="Управление" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {adminEntitiesPages.map((page, index) => (
            <ListItem
              sx={{ml: 2}}
              component={Link}
              to={page.to}
              button
              dense
              key={index}
              onClick={() => {
                closeMobDrawerOnClick()
                if (typeof page.onClick === 'function') {
                  page.onClick()
                }
              }}
            >
              <ListItemText primary={page.text} />
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />
      <List sx={{flexGrow: 1}}>
        {adminStatsPages.map((page, index) => (
          <ListItem
            component={Link}
            to={page.to}
            dense
            button
            key={index}
            onClick={closeMobDrawerOnClick}
          >
            <ListItemText primary={page.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List dense>
        <ListItem button onClick={onLogout}>
          <IconButton>
            <LogoutIcn />
          </IconButton>
          <ListItemText primary={'Выйти'} />
        </ListItem>
      </List>
    </Box>
  )
}
