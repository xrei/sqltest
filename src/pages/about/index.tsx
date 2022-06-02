import React from 'react'
import {useStore, useGate} from 'effector-react'
import {Box} from '@mui/material'
import {AboutPageGate, $about} from './model'
import {RenderHtml} from 'src/shared/ui/RenderHtml'

export const AboutPage = () => {
  useGate(AboutPageGate)
  const about = useStore($about)

  return (
    <Box sx={{display: 'flex', wordBreak: 'break-all'}}>
      <RenderHtml htmlStr={about} />
    </Box>
  )
}
