import React from 'react'
import {Box, Divider, Typography, Paper, Button} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {GroupModel, GroupSelector} from 'src/entities/Group'
import {SubjectsModel, SubjectSelector} from 'src/entities/Subject'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme/'
import * as model from './model'

export const AdminDeleteTestForGroupPage = () => {
  useGate(model.AdminDeleteTestForGroupPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Typography variant="h3">Удаление назначения теста у группы</Typography>

      <Divider sx={{my: 2}} />
      <Form />
    </Box>
  )
}

const Form = () => {
  const selectedSubject = useStore(model.$subjId)
  const selectedGroup = useStore(model.$groupId)
  const selectedTheme = useStore(model.$themeId)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const groups = useStore(GroupModel.$adminGroups)
  const themes = useStore(ThemesModel.$adminThemes)

  return (
    <Box component={Paper} sx={{display: 'flex', flexFlow: 'column', gap: 2, p: 2, maxWidth: 'sm'}}>
      <SubjectSelector
        sx={{maxWidth: '100%'}}
        value={selectedSubject}
        list={subjects}
        onSelectChange={model.subjSelected}
      />
      <ThemeSelector
        disabled={!selectedSubject}
        value={selectedTheme}
        list={themes}
        onChange={model.themeSelected}
      />
      <GroupSelector
        disabled={!selectedSubject || !selectedTheme}
        value={selectedGroup}
        list={groups}
        onChange={model.groupSelected}
      />

      <Button variant="contained" onClick={() => model.deleteTestForGroupClicked()}>
        Удалить назначение теста
      </Button>
    </Box>
  )
}

export default AdminDeleteTestForGroupPage
