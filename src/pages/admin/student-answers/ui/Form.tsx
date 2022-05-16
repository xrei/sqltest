import React from 'react'
import {Box} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useStore} from 'effector-react'
import {GroupSelector} from 'src/ui/GroupSelector'
import {SubjectSelector} from 'src/ui/SubjectSelector'
import {AdminGroupsModel, AdminModel} from 'src/features/Admin'
import {SubjectsModel} from 'src/features/Test'
import {ThemeSelector} from 'src/ui/ThemeSelector'
import {TestSelector} from 'src/ui/TestSelector'
import * as FormModel from './FormModel'

export const AnswersSelectForm = () => {
  const selectedGroup = useStore(FormModel.$groupId)
  const selectedSubject = useStore(FormModel.$subjId)
  const selectedTheme = useStore(FormModel.$themeId)
  const selectedTest = useStore(FormModel.$testId)
  const disabled = useStore(FormModel.$isFormButtonDisabled)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const groups = useStore(AdminGroupsModel.$adminGroups)
  const themes = useStore(AdminModel.$adminThemes)
  const tests = useStore(AdminModel.$adminTests)
  const loading = useStore(AdminModel.fetchAdminGroupRatingsFx.pending)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2, gap: 2, maxWidth: 'sm'}}>
      <SubjectSelector value={selectedSubject} list={subjects} onChange={FormModel.subjSelected} />
      <ThemeSelector
        disabled={!selectedSubject}
        value={selectedTheme}
        list={themes}
        onChange={FormModel.themeSelected}
      />
      <TestSelector
        disabled={!selectedTheme}
        value={selectedTest}
        list={tests}
        onChange={FormModel.testSelected}
      />
      <GroupSelector value={selectedGroup} list={groups} onChange={FormModel.groupSelected} />
      <LoadingButton
        loading={loading}
        disabled={disabled}
        variant="contained"
        onClick={() => FormModel.formResultClicked()}
      >
        Сформировать результат
      </LoadingButton>
    </Box>
  )
}
