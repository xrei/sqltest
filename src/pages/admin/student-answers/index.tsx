import {Box, Divider, IconButton, Typography, Button} from '@mui/material'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import React from 'react'
import {GroupSelector} from 'src/ui/GroupSelector'
import {SubjectSelector} from 'src/ui/SubjectSelector'
import * as model from './model'
import {useGate, useStore} from 'effector-react'
import {AdminGroupsModel, AdminModel} from 'src/features/User/Admin'
import {SubjectsModel} from 'src/features/Test'
import {ThemeSelector} from 'src/ui/ThemeSelector'
import {TestSelector} from 'src/ui/TestSelector'
import {LoadingButton} from '@mui/lab'

export const AdminStudentAnswersPage = () => {
  const resultsView = useStore(model.$resultsView)
  useGate(model.StudentAnswersPageGate)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box display="flex" alignItems="center">
        {resultsView && (
          <IconButton sx={{mr: 2}} onClick={() => model.resultsViewToggled()}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h3">Информация о тесте</Typography>
      </Box>
      <Divider sx={{my: 2}} />
      <Form />
    </Box>
  )
}

const Form = () => {
  const groups = useStore(AdminGroupsModel.$adminGroups)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const selectedGroup = useStore(model.$groupId)
  const selectedSubject = useStore(model.$subjId)
  const selectedTheme = useStore(model.$themeId)
  const selectedTest = useStore(model.$testId)
  const themes = useStore(AdminModel.$adminThemes)
  const tests = useStore(AdminModel.$adminTests)
  const disabled = useStore(model.$isFormButtonDisabled)
  const loading = useStore(AdminModel.fetchAdminGroupRatingsFx.pending)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2, gap: 2, maxWidth: 'sm'}}>
      <SubjectSelector value={selectedSubject} list={subjects} onChange={model.subjSelected} />
      <ThemeSelector
        disabled={!selectedSubject}
        value={selectedTheme}
        list={themes}
        onChange={model.themeSelected}
      />
      <TestSelector
        disabled={!selectedTheme}
        value={selectedTest}
        list={tests}
        onChange={model.testSelected}
      />
      <GroupSelector value={selectedGroup} list={groups} onChange={model.groupSelected} />
      <LoadingButton
        loading={loading}
        disabled={disabled}
        variant="contained"
        onClick={() => model.formResultClicked()}
      >
        Сформировать результат
      </LoadingButton>
    </Box>
  )
}

export default AdminStudentAnswersPage
