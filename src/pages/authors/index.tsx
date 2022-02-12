import React from 'react'
import {useStore} from 'effector-react'
import {Card, CardContent, Typography, Stack, Box} from '@mui/material'
import {AuthorsPageGate, $authors, $isLoading} from './model'
import {RenderHtml} from 'src/ui/RenderHtml'
import {CenteredLoader} from 'src/ui/CenteredLoader'

export const AuthorsPage: React.FC = () => {
  const isLoading = useStore($isLoading)

  return (
    <>
      <AuthorsPageGate></AuthorsPageGate>
      <Box sx={{display: 'flex', flexFlow: 'column', mt: 2}}>
        <Typography variant="h1" gutterBottom>
          Авторы
        </Typography>

        {isLoading ? <CenteredLoader /> : <AuthorList />}
      </Box>
    </>
  )
}

const AuthorList = () => {
  const authors = useStore($authors)

  return (
    <Stack spacing={2}>
      {authors.map((author) => (
        <Card key={author.AuthorId} sx={{pt: 2, pl: 2}} elevation={3} aria-label="Author">
          <Typography variant="h4">{author.AuthorName}</Typography>
          <Box display="flex">
            <Box
              sx={{display: 'flex', alignItems: 'center'}}
              dangerouslySetInnerHTML={{__html: author.AuthorImage}}
            ></Box>
            <CardContent>
              <RenderHtml htmlStr={author.AuthorDescription}></RenderHtml>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  )
}
