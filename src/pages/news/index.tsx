import React from 'react'
import {useStore} from 'effector-react'
import {Card, Typography, CircularProgress, Stack, Box} from '@mui/material'
import {RenderHtml} from 'src/ui/RenderHtml'
import {NewsPageGate, $posts, $isLoading} from './model'

export const NewsPage: React.FC = () => {
  const isLoading = useStore($isLoading)

  return (
    <>
      <NewsPageGate></NewsPageGate>
      <Box sx={{display: 'flex', flexFlow: 'column', mt: 2, height: '100%'}}>
        <Typography variant="h1" gutterBottom>
          Последние публикации:
        </Typography>

        {isLoading ? <CircularProgress /> : <NewsList />}
      </Box>
    </>
  )
}

const NewsList = () => {
  const posts = useStore($posts)

  return (
    <Stack spacing={2}>
      {posts.map((val) => (
        <Card sx={{p: 1}} key={val.Id} elevation={1} aria-label="Post">
          <Typography variant="caption" title={val.NewsDate}>
            {val.NewsDate}
          </Typography>
          <RenderHtml htmlStr={val.Content}></RenderHtml>
        </Card>
      ))}
    </Stack>
  )
}
