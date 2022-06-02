import React from 'react'
import {Box, Button, TextField, Typography, Divider} from '@mui/material'
import {useStore} from 'effector-react'
import {DBContentTables} from 'src/shared/ui/DBContentTables'
import * as model from './model'

export const AdminStudentsComplaintsPage = () => {
  const value = useStore(model.$date)
  const tables = useStore(model.$complaintsData)
  const hasData = Boolean(tables.length)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1">Замечания студентов</Typography>
      <Divider sx={{my: 2}} />

      <Box sx={{display: 'flex', gap: {xs: 2, sm: 4}, flexFlow: {xs: 'column', md: 'row'}}}>
        <TextField
          size="small"
          id="date"
          label="Дата"
          type="date"
          sx={{width: 220}}
          InputLabelProps={{
            shrink: true,
          }}
          value={value}
          onChange={model.dateChanged}
        />
        <Button variant="contained" onClick={() => model.viewBtnClicked()}>
          Отобразить
        </Button>
      </Box>

      {hasData && (
        <Box sx={{display: 'flex', flexFlow: 'column', mt: 5, gap: 2}}>
          <Typography variant="h3">Результат</Typography>
          <DBContentTables tables={tables} />
        </Box>
      )}
    </Box>
  )
}

export default AdminStudentsComplaintsPage
