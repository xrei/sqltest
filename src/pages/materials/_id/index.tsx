import React from 'react'
import {Box, Typography, Divider, IconButton} from '@mui/material'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import {useParams, Link as RouterLink} from 'react-router-dom'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'

import * as model from './model'

export const MaterialArticlePage = () => {
  const params = useParams()
  useGate(model.ArticlePageGate, {id: Number(params.id)})

  const article = useStore(model.$article)

  if (!article) {
    return <CenteredLoader />
  }

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography variant="h3">
        <IconButton component={RouterLink} to={{pathname: '/materials'}} sx={{mr: 2}}>
          <ArrowBackIcon />
        </IconButton>
        {article.Name}
      </Typography>
      <Divider sx={{my: 2}}></Divider>
      <Typography gutterBottom>{article.Description}</Typography>

      {article.Content && <div dangerouslySetInnerHTML={{__html: article.Content}}></div>}
    </Box>
  )
}
