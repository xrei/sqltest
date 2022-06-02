import React from 'react'
import {Stack, TextField, Typography, Button} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {RichTextEditor} from 'src/shared/ui/TextEditor'
import * as model from './model'

type ManageSubjectFormProps = {
  isEdit?: boolean
  subjId?: number
}
export const ManageSubjectForm = (props: ManageSubjectFormProps) => {
  const {isEdit, subjId} = props
  useGate(model.ManageSubjectFormGate, {subjId})
  const subjDto = useStore(model.$subjectDto)

  const onBtnClick = () => {
    isEdit ? model.editSubjectClicked() : model.addSubjectClicked()
  }

  return (
    <Stack gap={2}>
      <TextField
        value={subjDto.SubjName}
        onChange={model.subjectNameChanged}
        label="Название дисциплины"
        required
      />

      <Typography variant="h4" gutterBottom>
        Описание
      </Typography>
      <RichTextEditor
        EditorProps={{label: 'Введите описание'}}
        html={subjDto.Description}
        onChange={(state) => model.subjectDescrChanged(state)}
      />

      <Button variant="contained" sx={{maxWidth: 300}} onClick={onBtnClick}>
        {isEdit ? 'Редактировать' : 'Добавить'}
      </Button>
    </Stack>
  )
}
