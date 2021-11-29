import React from 'react'
import {Box, Typography, Grid} from '@mui/material'
import {useStore} from 'effector-react'
import {$user, $userRole} from 'src/features/User/model'
import {$currentGroup} from 'src/features/User/Student/model'

export const ProfileInfoPage = () => {
  const user = useStore($user)
  const userRole = useStore($userRole)
  const currStudGroup = useStore($currentGroup)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', flex: 1, mt: 2}}>
      <Typography variant="h1" sx={{mb: 4}}>
        Информация о пользователе
      </Typography>
      <Typography variant="h4" sx={{mb: 2}}>
        {userRole}
      </Typography>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Grid container sx={{mb: 1}}>
            <Grid item xs={5} md={3}>
              <Typography variant="h4" sx={{mr: 4}}>
                Пользователь:
              </Typography>
            </Grid>
            <Grid item xs={7} md={9}>
              <Typography variant="h4" fontWeight="bold">
                {user?.Name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{mb: 1}}>
            <Grid item xs={5} md={3}>
              <Typography variant="h4" sx={{mr: 4}}>
                Логин:
              </Typography>
            </Grid>
            <Grid item xs={7} md={9}>
              <Typography variant="h4" fontWeight="bold">
                {user?.Login}
              </Typography>
            </Grid>
          </Grid>
          {currStudGroup && (
            <Grid container>
              <Grid item xs={5} md={3}>
                <Typography variant="h4" sx={{mr: 4}}>
                  Группа:
                </Typography>
              </Grid>
              <Grid item xs={7} md={9}>
                <Typography variant="h4" fontWeight="bold">
                  {currStudGroup.GroupNumber}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item md={6} xs={12}></Grid>
      </Grid>
    </Box>
  )
}
