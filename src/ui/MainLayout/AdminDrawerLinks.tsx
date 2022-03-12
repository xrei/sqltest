import React from 'react'
import {Link} from 'react-router-dom'
import {styled} from '@mui/material/styles'
import {Box, List, ListItem, ListItemText, IconButton, Divider, Collapse, Typography} from '@mui/material'
import {
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcn,
} from '@mui/icons-material'
import {adminDrawerClosed, $adminMobDrawer} from './drawerModel'
import {authLogOff} from 'src/api'
import {adminRoutes} from 'src/router/paths'
import {useStore} from 'effector-react'
import {$userRole} from 'src/features/User/model'

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
  minHeight: '48px',
}))

const adminPages = [
  {to: adminRoutes.manageTests, text: 'Тесты'},
  {to: adminRoutes.groups, text: 'Группы'},
  {to: adminRoutes.students, text: 'Студенты'},
  {to: adminRoutes.systemUsers, text: 'Доступы'},
  {to: adminRoutes.systemQuery, text: 'Системные запросы'},
]

const adminEntitiesPages = [
  {to: adminRoutes.systemDb, text: 'Базы данных'},
  {to: adminRoutes.addTheory, text: 'Добавить теорию'},
  {to: adminRoutes.addNews, text: 'Добавить новость'},
  {to: adminRoutes.addAuthor, text: 'Добавить автора'},
  {to: adminRoutes.addStudInfo, text: 'Информация для студента'},
]

const adminStatsPages = [
  {to: '/admin/student-answers', text: 'Ответы студентов'},
  {to: '/admin/journal', text: 'Журнал'},
  {to: '/admin/student-rating', text: 'Рейтинги студентов'},
  {to: '/admin/tasks-stats', text: 'Статистика по заданиям'},
  {to: '/admin/online-users', text: 'Пользователи онлайн'},
  {to: '/admin/user-complaints', text: 'Замечания студентов'},
]

export const AdminDrawerLinks = () => {
  const userRole = useStore($userRole)
  const isMobDrawerOpen = useStore($adminMobDrawer)
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box>
      <DrawerHeader>
        {!isMobDrawerOpen && (
          <IconButton onClick={() => adminDrawerClosed()}>
            <ChevronRightIcon />
          </IconButton>
        )}
        <Typography sx={{ml: 1}}>{userRole}</Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {adminPages.map((page, index) => (
          <ListItem component={Link} to={page.to} button dense key={index}>
            <ListItemText primary={page.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem dense button onClick={handleClick}>
          <ListItemText primary="Управление" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {adminEntitiesPages.map((page, index) => (
            <ListItem sx={{ml: 2}} component={Link} to={page.to} button dense key={index}>
              <ListItemText primary={page.text} />
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />
      <List>
        {adminStatsPages.map((page, index) => (
          <ListItem component={Link} to={page.to} button dense key={index}>
            <ListItemText primary={page.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => authLogOff()}>
          <IconButton>
            <LogoutIcn />
          </IconButton>
          <ListItemText primary={'Выйти'} />
        </ListItem>
      </List>
    </Box>
  )
}
