import {Box, Typography, Divider} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import React from 'react'
import {useParams} from 'react-router-dom'
import {CenteredLoader} from 'src/ui/CenteredLoader'

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
      <Typography variant="h3">{article.Name}</Typography>
      <Divider sx={{my: 2}}></Divider>
      <Typography gutterBottom>{article.Description}</Typography>

      {article.Content && <div dangerouslySetInnerHTML={{__html: article.Content}}></div>}
    </Box>
  )
}
