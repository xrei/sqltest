import React from 'react'
import {Box, Button} from '@mui/material'
import * as QueryResultModel from './model'

export const QueryResultButtons = () => {
  return (
    <Box display="flex" gap={2} sx={{mt: 2}}>
      <Button variant="contained" onClick={() => QueryResultModel.openDialogWithType('user')}>
        Посмотреть ТРЗ
      </Button>
      <Button variant="contained" onClick={() => QueryResultModel.openDialogWithType('reference')}>
        Правильная ТРЗ
      </Button>
    </Box>
  )
}
