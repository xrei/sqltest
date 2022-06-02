import React from 'react'
import {
  Box,
  Divider,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Paper,
  Tooltip,
} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {useGate, useStore} from 'effector-react'
import {GroupModel, GroupSelector} from 'src/entities/Group'
import {SubjectsModel, SubjectSelector} from 'src/entities/Subject'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme/'
import {RatingsTable} from 'src/widgets/RatingsTable'
import * as model from './model'

export const AdminStudentRatingPage = () => {
  useGate(model.AdminStudentRatingPageGate)
  const ratingsData = useStore(model.$ratingsData)
  const loading = useStore(model.$isRatingsLoading)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', my: 2}}>
      <Box display="flex" alignItems="center">
        <SwitchRatingType />
      </Box>

      <Divider sx={{my: 2}} />

      <Form />
      <Divider sx={{my: 2}} />
      <RatingsTable results={ratingsData} loading={loading} />
    </Box>
  )
}

const SwitchRatingType = () => {
  const checked = useStore(model.$ratingTypeSwitchVal)
  const label = checked ? 'Рейтинг студентов по группам и теме' : 'Рейтинг студентов по группам'

  return (
    <Tooltip title="Переключить тип рейтинга" placement="bottom-start">
      <FormGroup sx={{userSelect: 'none'}}>
        <FormControlLabel
          control={<Switch size="medium" checked={checked} onChange={model.switchStateChanged} />}
          label={<Typography variant="h3">{label}</Typography>}
        />
      </FormGroup>
    </Tooltip>
  )
}

const Form = () => {
  const ratingSwitchState = useStore(model.$ratingTypeSwitchVal)
  const selectedSubject = useStore(model.$subjId)
  const selectedGroup = useStore(model.$groupId)
  const selectedTheme = useStore(model.$themeId)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const groups = useStore(GroupModel.$adminGroups)
  const themes = useStore(ThemesModel.$adminThemes)

  const ButtonsByGroup = () => {
    return (
      <>
        <Box sx={{flex: 1}}>
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={() => model.showGroupRatingClicked()}
          >
            Показать рейтинг
          </LoadingButton>
        </Box>
        <Box sx={{display: 'flex', flexFlow: 'column', flex: 1}}>
          <LoadingButton
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => model.showGroupRatingSuccessClicked()}
          >
            Показать рейтинг
          </LoadingButton>
          <Typography variant="body2">Без учета попыток с двойками</Typography>
        </Box>
      </>
    )
  }

  return (
    <Box
      component={Paper}
      sx={{display: 'flex', flexFlow: 'column', my: 2, gap: 2, p: 2, maxWidth: 'sm'}}
    >
      <SubjectSelector
        value={selectedSubject}
        list={subjects}
        onSelectChange={model.subjSelected}
      />
      <GroupSelector value={selectedGroup} list={groups} onChange={model.groupSelected} />
      {ratingSwitchState && (
        <ThemeSelector
          disabled={!selectedSubject}
          value={selectedTheme}
          list={themes}
          onChange={model.themeSelected}
        />
      )}

      <Box sx={{display: 'flex', gap: {xs: 1, sm: 4}, flexFlow: {xs: 'column', sm: 'row'}}}>
        {ratingSwitchState ? (
          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => model.showRatingByThemeClicked()}
          >
            Показать рейтинг по теме
          </LoadingButton>
        ) : (
          <ButtonsByGroup />
        )}
      </Box>
    </Box>
  )
}

export default AdminStudentRatingPage
