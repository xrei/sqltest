import React from 'react'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'
import {IconButton, SxProps, Theme as MuiTheme} from '@mui/material'

type ArrowBackButtonProps = {
  to: string
  sx?: SxProps<MuiTheme>
}
export const ArrowBackButton = ({to, sx = {}}: ArrowBackButtonProps) => {
  return (
    <IconButton component={RouterLink} to={to} sx={sx}>
      <ArrowBackIcon />
    </IconButton>
  )
}
