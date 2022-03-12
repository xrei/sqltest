import React, {useEffect} from 'react'
import {Typography, Box} from '@mui/material'
import {useStore, useGate} from 'effector-react'
import {RenderHtml} from 'src/ui/RenderHtml'
import {MainPageGate, $about} from './model'

export const HomePage: React.FC = () => {
  useGate(MainPageGate)
  const about = useStore($about)

  return (
    <Box display="flex" flexDirection="column" mt={4} sx={{wordBreak: 'break-word'}}>
      <Typography variant="h1" gutterBottom>
        Дистанционное обучение
      </Typography>
      <Typography variant="h3">SQL & NoSQL тренажер</Typography>
      <RenderHtml htmlStr={about}></RenderHtml>
    </Box>
  )
}
