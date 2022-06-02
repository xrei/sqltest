import React from 'react'
import {Stack, TextField, Typography, Button} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {SubjectSelector, SubjectsModel} from 'src/entities/Subject'
import {RichTextEditor} from 'src/shared/ui/TextEditor'
import * as model from './model'

type ManageThemeFormProps = {
  isEdit?: boolean
  themeId?: number
  subjId?: number
}
export const ManageThemeForm = (props: ManageThemeFormProps) => {
  const {isEdit, themeId, subjId} = props

  useGate(model.ManageThemeFormGate, {themeId, subjId} as {themeId: number; subjId: number})

  const subjects = useStore(SubjectsModel.$adminSubjects)
  const {Description, ThemeSubjId, ThemeName} = useStore(model.$themeDto)

  const onBtnClick = () => {
    isEdit ? model.editClicked() : model.addClicked()
  }

  return (
    <Stack gap={3}>
      <SubjectSelector
        required
        sx={{maxWidth: '100%'}}
        value={String(ThemeSubjId)}
        list={subjects}
        onSelectChange={model.subjSelected}
      />
      <TextField
        size="small"
        value={ThemeName}
        onChange={model.themeNameChanged}
        label="Название темы"
        required
      />

      <Stack>
        <Typography variant="h4" gutterBottom>
          Описание
        </Typography>
        <RichTextEditor
          EditorProps={{label: 'Введите описание'}}
          html={Description}
          onChange={(state) => model.descriptionChanged(state)}
        />
      </Stack>

      <Button variant="contained" sx={{maxWidth: 'sm'}} onClick={onBtnClick}>
        {isEdit ? 'Редактировать' : 'Создать'}
      </Button>
    </Stack>
  )
}
