import React from 'react'
import {Box} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useStore} from 'effector-react'
import {GroupModel, GroupSelector} from 'src/entities/Group'
import {AdminModel} from 'src/features/Admin'
import {SubjectsModel, SubjectSelector} from 'src/entities/Subject'
import {ThemeSelector} from 'src/entities/Theme/'
import {TestSelector} from 'src/entities/Test/'
import * as FormModel from './FormModel'

export const AnswersSelectForm = () => {
  const selectedGroup = useStore(FormModel.$groupId)
  const selectedSubject = useStore(FormModel.$subjId)
  const selectedTheme = useStore(FormModel.$themeId)
  const selectedTest = useStore(FormModel.$testId)
  const disabled = useStore(FormModel.$isFormButtonDisabled)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const groups = useStore(GroupModel.$adminGroups)
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
