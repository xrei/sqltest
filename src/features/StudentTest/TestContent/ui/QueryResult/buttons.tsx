import React from 'react'
import {Box, Button} from '@mui/material'
import * as QueryResultModel from './model'

export const QueryResultButtons = () => {
  return (
    <Box display="flex" gap={2} sx={{mt: 2, flexFlow: {xs: 'column', md: 'row'}}}>
      <Button variant="contained" onClick={() => QueryResultModel.openDialogWithType('user')}>
        Проверить запрос
      </Button>
      <Button variant="contained" onClick={() => QueryResultModel.openDialogWithType('reference')}>
        Посмотреть верный результат
      </Button>
    </Box>
  )
}
