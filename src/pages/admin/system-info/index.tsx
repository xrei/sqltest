import React from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import * as model from './model'

export const SystemInfoPage = () => {
  useGate(model.SystemInfosGate)
  const infos = useStore(model.$systemInfos)

  return (
    <Box display="flex" flexDirection="column" my={2}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: {xs: 'column', md: 'row'},
          alignItems: {xs: 'flex-start', md: 'center'},
          justifyContent: 'space-between',
          gap: {xs: 4, md: 0},
        }}
      >
        <Typography variant="h3">Информация для режима студента</Typography>
        <Button variant="contained">Добавить информацию</Button>
      </Box>
      <Divider sx={{mb: 2}} />
      <Stack>
        {infos.map((info, idx) => (
          <Accordion key={idx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{info.name}</AccordionSummary>
            <AccordionDetails>
              <div dangerouslySetInnerHTML={{__html: info.info}}></div>
            </AccordionDetails>
            <AccordionActions>
              <Button color="warning" variant="outlined">
                Редактировать
              </Button>
              <Button variant="outlined" color="error">
                Удалить
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </Stack>
    </Box>
  )
}

export default SystemInfoPage
