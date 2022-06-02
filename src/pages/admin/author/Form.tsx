import {Button, Divider, TextField, Typography, Stack} from '@mui/material'
import {Box} from '@mui/system'
import {useStore} from 'effector-react'
import React, {ChangeEvent, useState} from 'react'
import {RichTextEditor} from 'src/shared/ui/TextEditor'
import * as model from './model'

type Props = {
  isEdit?: boolean
}
export const AuthorManageForm = (props: Props) => {
  const isEdit = props.isEdit
  const title = isEdit ? 'Редактировать аввтора' : 'Добавить автора'
  const authorForm = useStore(model.$authorForm)
  const [imgUploaded, setImgUploaded] = useState(false)

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result
      model.imageChanged(String(base64))
      setImgUploaded(true)
    }
    reader.readAsDataURL(files[0])
  }
  const clearImage = () => {
    const fileInput = document.getElementById('authorImg')
    if (fileInput) {
      // @ts-expect-error okey
      fileInput.value = null
      setImgUploaded(false)
      model.imageChanged('')
    }
  }

  const saveOrEdit = () => {
    if (isEdit) {
      model.isEditClicked()
    } else {
      model.addAuthorClicked()
    }
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
        <TextField
          value={authorForm.AuthorName}
          onChange={model.nameChanged}
          required
          sx={{mt: 1}}
          label="Введите фио"
        />

        <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
          <Typography variant="h4" gutterBottom>
            Изображение
          </Typography>
          <Button component="label" variant="outlined" sx={{maxWidth: '300px'}}>
            Загрузить изображение
            <input
              id="authorImg"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={(e) => onFileInput(e)}
              hidden
            />
          </Button>
          <Typography variant="subtitle2">
            {isEdit
              ? 'Для изменения изображения, добавьте его. В противном случае, ничего не делайте'
              : 'Добавьте изображение автора'}
          </Typography>
          {imgUploaded && (
            <Box sx={{p: 2, display: 'flex', flexFlow: 'column', alignItems: 'flex-start'}}>
              <img src={authorForm.AuthorImage} alt="uploaded image" width={100} height="100" />
              <Button sx={{mt: 1}} variant="outlined" onClick={() => clearImage()}>
                Очистить
              </Button>
            </Box>
          )}
        </Box>

        <Typography variant="h4" gutterBottom>
          Описание
        </Typography>
        <RichTextEditor
          EditorProps={{label: 'Введите описание'}}
          html={authorForm.AuthorDescription}
          onChange={(state) => model.descriptionChanged(state)}
        />
      </Stack>
      <Button variant="contained" sx={{mt: 4, maxWidth: '320px'}} onClick={() => saveOrEdit()}>
        {isEdit ? 'Редактировать' : 'Добавить'}
      </Button>
    </Box>
  )
}
