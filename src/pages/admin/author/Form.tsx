import {Button, Divider, TextField, Typography, Stack} from '@mui/material'
import {Box} from '@mui/system'
import {useStore} from 'effector-react'
import React from 'react'
import {RichTextEditor} from 'src/features/TextEditor'
import * as model from './model'

export const AuthorManageForm = () => {
  const isEdit = useStore(model.$isEdit)
  const title = isEdit ? 'Редактировать аввтора' : 'Добавить автора'

  const rteSave = (data: string) => {
    console.log(data)
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Stack sx={{mt: 4}}>
        <Typography variant="h4" gutterBottom>
          Ф.И.О
        </Typography>
        <TextField label="Введите фио" />

        <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
          <Typography variant="h4" gutterBottom>
            Изображение
          </Typography>
          <Button component="label" variant="outlined" sx={{maxWidth: '300px'}}>
            Загрузить изображение
            <input type="file" hidden />
          </Button>
          <Typography variant="subtitle2">
            {isEdit
              ? 'Для изменения изображения, добавьте его. В противном случае, ничего не делайте'
              : 'Добавьте изображение автора'}
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Описание
        </Typography>
        <RichTextEditor label="Введите описание" onSave={rteSave} />
      </Stack>
    </Box>
  )
}
