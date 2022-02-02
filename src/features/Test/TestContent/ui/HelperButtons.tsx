import React from 'react'
import {Box, Button} from '@mui/material'
import {fetchDBContentFx} from './DBInfoDialog/model'
import {LoadingButton} from '@mui/lab'
import {useStore} from 'effector-react'

export const HelperButtons = () => {
  const loading = useStore(fetchDBContentFx.pending)

  return (
    <Box display="flex" gap={2}>
      <LoadingButton loading={loading} variant="outlined" onClick={() => fetchDBContentFx()}>
        Содержимое РБД
      </LoadingButton>
      <Button variant="outlined">Описание баз данных</Button>
      <Button variant="outlined">Правильный ответ</Button>
      <Button variant="outlined" color="warning">
        Сообщить о некорректности задания
      </Button>
    </Box>
  )
}
