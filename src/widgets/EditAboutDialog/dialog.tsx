import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material'
import {useStore} from 'effector-react'
import * as model from './model'
import {RichTextEditor} from 'src/shared/ui/TextEditor'

export const EditAboutDialog = ({aboutContent = ''}: {aboutContent: string}) => {
  const open = useStore(model.$open)

  return (
    <Dialog maxWidth="xl" fullWidth open={open} onClose={() => model.openToggled()} scroll="paper">
      <DialogTitle>Редактировать описание</DialogTitle>
      <DialogContent>
        <RichTextEditor
          html={aboutContent}
          onChange={(state) => model.contentChanged(state)}
          EditorProps={{}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.openToggled()}>Закрыть</Button>
        <Button variant="contained" onClick={() => model.editAboutClicked()}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
