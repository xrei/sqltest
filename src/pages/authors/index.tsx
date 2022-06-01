import React from 'react'
import {useStore} from 'effector-react'
import {Card, CardContent, Typography, Stack, Box, CardActions, Button} from '@mui/material'
import {AuthorsPageGate, $authors, $isLoading} from './model'
import {RenderHtml} from 'src/ui/RenderHtml'
import {CenteredLoader} from 'src/ui/CenteredLoader'
import {UserModel} from 'src/entities/User'
import {Link as RouterLink} from 'react-router-dom'
import {adminRoutes} from 'src/app/router/paths'
import {deleteAuthorClicked} from '../admin/author/model'

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
  const isAdmin = useStore(UserModel.$userIsAdmin)

  return (
    <Stack spacing={2}>
      {authors.map((author) => (
        <Card key={author.AuthorId} sx={{pt: 2, pl: 2}} elevation={3} aria-label="Author">
          <Typography variant="h4" gutterBottom>
            {author.AuthorName}
          </Typography>
          <Box display="flex">
            <Box
              sx={{display: 'flex', alignItems: 'center'}}
              dangerouslySetInnerHTML={{__html: author.AuthorImage}}
            ></Box>
            <CardContent>
              <RenderHtml htmlStr={author.AuthorDescription}></RenderHtml>
            </CardContent>
          </Box>
          {isAdmin && (
            <CardActions>
              <Button
                component={RouterLink}
                to={adminRoutes.editAuthor.replace(':id', String(author.AuthorId))}
                color="warning"
                variant="outlined"
                sx={{mr: 1}}
              >
                Редактировать
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => deleteAuthorClicked(author.AuthorId)}
              >
                Удалить
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </Stack>
  )
}
