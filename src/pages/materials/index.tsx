import {Box, Typography, Link, Stack, Divider} from '@mui/material'
import {useGate, useList} from 'effector-react'
import React from 'react'
import {useNavigate} from 'react-router'
import * as model from './model'
import type {MaterialArticle} from 'src/types'

export const MaterialsPage: React.FC = () => {
  useGate(model.MaterialsPageGate)

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography gutterBottom variant="h1">
        Материалы:
      </Typography>
      <Stack gap={4}>
        <MaterialsList />
      </Stack>
    </Box>
  )
}

const MaterialsList = () => {
  const navigate = useNavigate()

  const goToArticle = (article: MaterialArticle) => {
    navigate(`/materials/${article.Id}`)
  }

  const materials = useList(model.$materials, (m) => {
    return (
      <Box display="flex" flexDirection="column">
        <Divider sx={{mb: 4}}></Divider>

        <Typography variant="h3">{m.SubjName}</Typography>
        <div dangerouslySetInnerHTML={{__html: m.Description}}></div>

        {m.ListOfLinks.length ? (
          <>
            <Typography variant="h4">Ссылки:</Typography>
            <Box display="flex" flexDirection="column" mb={2}>
              {m.ListOfLinks.map((link) => (
                <Link key={link.Id} href={link.Name}>
                  {link.Name}
                </Link>
              ))}
            </Box>
          </>
        ) : null}

        {m.ListOfArticles.length ? (
          <>
            <Typography variant="h4" gutterBottom>
              Статьи:
            </Typography>
            {m.ListOfArticles.map((article) => (
              <Link sx={{cursor: 'pointer'}} key={article.Id} onClick={() => goToArticle(article)}>
                {article.Name}
              </Link>
            ))}
          </>
        ) : null}
      </Box>
    )
  })

  return materials
}
