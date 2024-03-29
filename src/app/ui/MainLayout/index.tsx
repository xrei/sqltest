/** @jsxImportSource @emotion/react */
import React from 'react'
import {styled} from '@mui/material/styles'
import {
  Container,
  SwipeableDrawer,
  Drawer,
  Hidden,
  Box,
  AppBarProps as MuiAppBarProps,
  AppBar as MuiAppBar,
} from '@mui/material'
import {useStore} from 'effector-react'
import {AppLinks} from './AppLinks'
import * as drawerModel from './drawerModel'
import {$userIsStudent} from 'src/entities/User/model'
import {AppToolbar} from './Toolbar'
import {AdminDrawerLinks} from './AdminDrawerLinks'
import {Footer} from './Footer'
import {useLocation} from 'react-router'

const drawerWidth = 280

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean
}>(({theme, open}) => ({
  paddingTop: '52px',
  flexGrow: 1,
  display: 'flex',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  },
}))
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  },
}))

type Props = {
  children?: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({children}) => {
  const location = useLocation()
  const isMain = location.pathname === '/'
  const isNotStudent = !useStore($userIsStudent)

  const isDrawerOpen = useStore(drawerModel.$drawer)
  const isAdminDrawerOpen = useStore(drawerModel.$adminDrawer)
  const isAdminDrawerMobOpen = useStore(drawerModel.$adminMobDrawer)

  return (
    <div style={{display: 'flex', flexFlow: 'column', minHeight: '100vh'}}>
      <AppBar position="fixed" open={isAdminDrawerOpen}>
        <AppToolbar />
      </AppBar>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => drawerModel.onClose()}
          onOpen={() => drawerModel.onOpen()}
        >
          <AppLinks drawer></AppLinks>
        </SwipeableDrawer>
      </Hidden>
      <Main open={isAdminDrawerOpen}>
        {isMain ? children : <Container maxWidth="xl">{children}</Container>}
      </Main>
      {isNotStudent ? (
        <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}>
          <Drawer
            sx={{
              display: {xs: 'none', md: 'block'},
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={isAdminDrawerOpen}
          >
            <AdminDrawerLinks />
          </Drawer>

          <Drawer
            anchor="right"
            variant="temporary"
            open={isAdminDrawerMobOpen}
            onClose={() => drawerModel.adminDrawerMobClosed()}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs: 'block', md: 'none'},
              '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
            }}
          >
            <AdminDrawerLinks />
          </Drawer>
        </Box>
      ) : (
        <></>
      )}

      <Footer />
    </div>
  )
}
