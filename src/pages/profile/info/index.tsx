import React from 'react'
import {Box, Typography, Grid} from '@mui/material'
import {useStore} from 'effector-react'
import {$user} from 'src/features/User/model'

export const ProfileInfoPage = () => {
  const user = useStore($user)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', flex: 1, mt: 2}}>
      <Typography variant="h1" sx={{mb: 4}}>
        Информация о пользователе
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Grid container sx={{mb: 1}}>
            <Grid item xs={3}>
              <Typography variant="h4" sx={{mr: 4}}>
                Пользователь:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h4" fontWeight="bold">
                {user?.Name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{mb: 1}}>
            <Grid item xs={3}>
              <Typography variant="h4" sx={{mr: 4}}>
                Логин:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h4" fontWeight="bold">
                {user?.Login}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h4" sx={{mr: 4}}>
                Группа:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h4" fontWeight="bold">
                group
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  )
}
