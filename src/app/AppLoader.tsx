import React from 'react'
import {Zoom, CircularProgress, Box} from '@mui/material'

type AppLoaderProps = {
  appLoading?: boolean
}
const AppLoader = ({appLoading}: AppLoaderProps) => {
  return (
    <Box sx={{display: 'grid', placeItems: 'center', minHeight: '100vh', height: '100vh'}}>
      <Zoom in={appLoading}>
        <CircularProgress size={60} />
      </Zoom>
    </Box>
  )
}

export default AppLoader
