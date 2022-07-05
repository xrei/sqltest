import {Box, Typography, Link, Stack, Divider, IconButton, Button} from '@mui/material'
import {Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import React from 'react'
import {useNavigate} from 'react-router'
import * as model from './model'
import type {MaterialArticle} from 'src/types'
import {UserModel} from 'src/entities/User'
import {
  ManageMaterialLinkDialog,
  linkDialogOpened,
  linkDialogToEditOpened,
  deleteLinkFx,
} from 'src/features/AdminMaterials'

export const MaterialsPage: React.FC = () => {
  useGate(model.MaterialsPageGate)

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Typography gutterBottom variant="h1">
        Материалы
      </Typography>
      <Stack gap={4}>
        <MaterialsList />
      </Stack>
      <ManageMaterialLinkDialog />
    </Box>
  )
}

const MaterialsList = () => {
  const navigate = useNavigate()
  const isUserAdmin = useStore(UserModel.$userIsAdmin)

  const goToArticle = (article: MaterialArticle) => {
    navigate(`/materials/${article.Id}`)
  }

  const materials = useStore(model.$materials)

  return (
    <>
      {materials.map((m, idx) => {
        return (
          <Box key={idx} display="flex" flexDirection="column">
            <Divider sx={{mb: 4}}></Divider>

            <Typography variant="h3">{m.SubjName}</Typography>
            <div dangerouslySetInnerHTML={{__html: m.Description}}></div>

            {m.ListOfLinks.length ? (
              <>
                <Typography variant="h4">Ссылки:</Typography>
                <Box display="flex" flexDirection="column" mb={2}>
                  {m.ListOfLinks.map((link) => (
                    <Box key={link.Id} sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Link
                        href={link.Name}
                        dangerouslySetInnerHTML={{__html: link.Description}}
                      ></Link>
                      {isUserAdmin && (
                        <Box>
                          <IconButton
                            onClick={() =>
                              linkDialogToEditOpened({
                                ...link,
                                SubjectId: m.SubjId,
                              })
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteLinkFx(link.Id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
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
                  <Link
                    sx={{cursor: 'pointer'}}
                    key={article.Id}
                    onClick={() => goToArticle(article)}
                  >
                    {article.Name}
                  </Link>
                ))}
              </>
            ) : null}

            <AdminActions isAdmin={isUserAdmin} SubjectId={m.SubjId} />
          </Box>
        )
      })}
    </>
  )
}

const AdminActions = ({isAdmin, SubjectId}: {isAdmin: boolean; SubjectId: number}) => {
  if (isAdmin) {
    return (
      <Box sx={{display: 'flex', gap: 2, alignItems: 'center', mt: 2}}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => linkDialogOpened({SubjectId})}
        >
          Новая ссылка
        </Button>
        <Button variant="outlined" color="secondary" size="small">
          Новая статья
        </Button>
      </Box>
    )
  }

  return <></>
}
