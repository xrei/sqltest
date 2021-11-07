import React, {useState, useEffect} from 'react'
import {AppBar as MuiAppBar, Toolbar, Typography, IconButton} from '@mui/material'
import {AccountCircle} from '@mui/icons-material'

export const AppBar: React.FC = () => {
  return (
    <MuiAppBar elevation={0} position="fixed">
      <Toolbar variant="dense">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}
