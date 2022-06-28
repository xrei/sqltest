import React from 'react'
import {useStore, useGate} from 'effector-react'
import {Box, Button} from '@mui/material'
import {AboutPageGate, $about} from './model'
import {RenderHtml} from 'src/shared/ui/RenderHtml'
import {UserModel} from 'src/entities/User'
import {EditAboutDialog, openToggled} from 'src/widgets/EditAboutDialog'

export const AboutPage = () => {
  useGate(AboutPageGate)
  const about = useStore($about)
  const isAdmin = useStore(UserModel.$userIsAdmin)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', wordBreak: 'break-all'}}>
      <RenderHtml htmlStr={about} />

      {isAdmin && (
        <Button sx={{mt: 4, maxWidth: '256px'}} variant="contained" onClick={() => openToggled()}>
          Редактировать
        </Button>
      )}

      <EditAboutDialog aboutContent={about} />
    </Box>
  )
}
