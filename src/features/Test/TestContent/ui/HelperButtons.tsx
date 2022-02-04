import React from 'react'
import {Box, Button} from '@mui/material'
import {fetchDBContentFx} from './DBContentDialog/model'
import {LoadingButton} from '@mui/lab'
import {useStore} from 'effector-react'
import {TestContentModel} from '../..'
import {DBInfoModel} from 'src/features/DBInfo'
import {toggleIncorrectQsnDialog} from './IncorrectQsnDialog/model'

export const HelperButtons = () => {
  const test = useStore(TestContentModel.$test)
  const loading = useStore(fetchDBContentFx.pending)

  return (
    <Box display="flex" gap={2}>
      <LoadingButton loading={loading} variant="outlined" onClick={() => fetchDBContentFx()}>
        Содержимое РБД
      </LoadingButton>
      <Button variant="outlined" onClick={() => DBInfoModel.toggleDialog()}>
        Описание баз данных
      </Button>
      {test?.ViewRight ? <Button variant="outlined">Правильный ответ</Button> : <></>}
      <Button variant="outlined" color="warning" onClick={() => toggleIncorrectQsnDialog()}>
        Сообщить о некорректности задания
      </Button>
    </Box>
  )
}
