import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material'
import {useStore} from 'effector-react'
import * as model from './model'
import {RichTextEditor} from 'src/shared/ui/TextEditor'

export const ManageNewsDialog = () => {
  const open = useStore(model.$manageNewsDialog)
  const isEdit = useStore(model.$isEdit)
  const text = isEdit ? isEdit.Content : ''

  const onClick = () => {
    if (isEdit) {
      model.actualEditNewsClicked()
    } else {
      model.addNewsClicked()
    }
  }

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={() => model.manageNewsDialogToggled()}
      scroll="paper"
    >
      <DialogTitle>{isEdit ? 'Редактировать новость' : 'Добавить новость'}</DialogTitle>
      <DialogContent>
        <Typography variant="h4" gutterBottom>
          Текст новости
        </Typography>
        <RichTextEditor
          html={text}
          onChange={(state) => model.textChanged(state)}
          EditorProps={{label: 'Текст новости'}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.manageNewsDialogToggled()}>Закрыть</Button>
        <Button variant="contained" onClick={() => onClick()}>
          {isEdit ? 'Редактировать' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
