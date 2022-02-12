import React from 'react'
import {CircularProgress, Box, BoxProps} from '@mui/material'

type Props = {
  fullHeight?: boolean
  boxProps?: BoxProps
}
export const CenteredLoader = (props: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={props.fullHeight ? '100%' : 'auto'}
      {...props.boxProps}
    >
      <CircularProgress />
    </Box>
  )
}
