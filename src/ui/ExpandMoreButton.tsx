import React from 'react'
import {styled, IconButton, IconButtonProps} from '@mui/material'
import {ExpandMore} from '@mui/icons-material'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export const ExpandMoreButton = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props
  return <IconButton {...other} />
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

interface ExpandMoreIconProps {
  expand: boolean
}
export const ExpandMoreIcon = styled((props: ExpandMoreIconProps) => {
  const {expand, ...other} = props
  return <ExpandMore {...other} />
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
