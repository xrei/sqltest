import React from 'react'
import {useStore} from 'effector-react'
import {Card, Typography, Stack, Box, Button, CardActions} from '@mui/material'
import {RenderHtml} from 'src/shared/ui/RenderHtml'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import {UserModel} from 'src/entities/User'
import {AdminNewsModel} from 'src/features/ManageAdminNews'
import {NewsPageGate, $posts, $isLoading} from './model'

export const NewsPage: React.FC = () => {
  const isLoading = useStore($isLoading)

  return (
    <>
      <NewsPageGate></NewsPageGate>
      <Box sx={{display: 'flex', flexFlow: 'column', mt: 2, height: '100%'}}>
        <Typography variant="h1" gutterBottom>
          Последние публикации
        </Typography>

        {isLoading ? <CenteredLoader fullHeight /> : <NewsList />}
      </Box>
    </>
  )
}

const NewsList = () => {
  const posts = useStore($posts)
  const isAdmin = useStore(UserModel.$userIsAdmin)

  return (
    <Stack spacing={2}>
      {posts.map((val) => (
        <Card sx={{p: 1}} key={val.Id} elevation={1} aria-label="Post">
          <Typography variant="caption" title={val.NewsDate}>
            {val.NewsDate}
          </Typography>
          <RenderHtml htmlStr={val.Content}></RenderHtml>
          {isAdmin && (
            <CardActions>
              <Button
                color="warning"
                variant="outlined"
                sx={{mr: 1}}
                onClick={() => {
                  AdminNewsModel.manageNewsDialogToggled()
                  AdminNewsModel.editNewsClicked(val)
                }}
              >
                Редактировать
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => AdminNewsModel.deleteNewsClicked(val.Id)}
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
