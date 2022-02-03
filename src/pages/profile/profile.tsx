/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react'
import {Link, Outlet, Navigate, useLocation} from 'react-router-dom'
import {Box, Tab, Tabs, useTheme} from '@mui/material'
import {routesPaths} from 'src/router'

export const ProfilePage: React.FC = () => {
  const theme = useTheme()
  const [tab, setTab] = useState(0)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === routesPaths.profileMyResults) {
      setTab(1)
    }
    if (location.pathname === routesPaths.profileStudentsRating) {
      setTab(2)
    }
  }, [location])

  if (location.pathname === routesPaths.profile) {
    return <Navigate to={routesPaths.profileInfo} />
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
      <Tabs
        sx={{borderBottom: 1, borderBottomColor: theme.palette.grey[200]}}
        value={tab}
        variant="scrollable"
        onChange={(e, v) => setTab(v)}
      >
        <Tab component={Link} to={routesPaths.profileInfo} label="Информация"></Tab>
        <Tab component={Link} to={routesPaths.profileMyResults} label="Мои результаты"></Tab>
        <Tab
          component={Link}
          to={routesPaths.profileStudentsRating}
          label="Рейтинг студентов"
        ></Tab>
      </Tabs>
      <Outlet />
    </Box>
  )
}
