import React from 'react'
import {
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
} from '@mui/material'
import {useStore} from 'effector-react'
import * as model from './model'

export const ManageMaterialLinkDialog = () => {
  const open = useStore(model.$dialogOpen)
  const isEdit = useStore(model.$isEdit)
  const {Name, Description} = useStore(model.$link)

  const onSave = () => {
    if (isEdit) {
      model.editLinkFxWithUser({})
    } else {
      model.createLinkFxWithUser({})
    }
  }

  return (
    <Dialog
      open={open}
      scroll="paper"
      fullWidth
      maxWidth="sm"
      onClose={() => model.linkDialogToggled()}
    >
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        {isEdit ? 'Редактирование ссылки' : 'Новая ссылка'}
        <Button variant="outlined" onClick={() => model.linkDialogToggled()}>
          Закрыть
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
        <TextField
          label="Ссылка:"
          value={Name}
          placeholder="Введите ссылку"
          onChange={model.nameChanged}
        />
        <TextField
          label="Описание:"
          value={Description}
          placeholder="Введите описание ссылки"
          onChange={model.descriptionChanged}
        />

        <Button sx={{mt: 4}} variant="contained" onClick={onSave}>
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  )
}
