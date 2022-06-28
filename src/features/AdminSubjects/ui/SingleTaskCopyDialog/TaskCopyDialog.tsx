import React from 'react'
import {Typography, Button, Box, Divider, Dialog, DialogTitle, DialogContent} from '@mui/material'
import {useStore} from 'effector-react'
import {SubjectsModel, SubjectSelector} from 'src/entities/Subject'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme/'
import * as model from './model'

export const SingleTaskCopyDialog = () => {
  const open = useStore(model.$singleTaskCopyDialogOpen)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const themes = useStore(ThemesModel.$adminThemes)
  const selectedSubject = useStore(model.$selectedSubject)
  const selectedTheme = useStore(model.$selectedTheme)
  const taskToCopy = useStore(model.$taskToCopy)

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="sm" onClose={() => model.dialogClosed()}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Выберите новую тему
        <Button variant="outlined" onClick={() => model.dialogClosed()}>
          Закрыть
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{mb: 2}}>Копирование учебного задания № - {taskToCopy?.Id}</Typography>
        <Box sx={{display: 'flex', flexFlow: 'column'}}>
          <SubjectSelector
            sx={{maxWidth: '100%', mb: 1}}
            value={selectedSubject}
            list={subjects}
            onSelectChange={model.subjSelected}
          />
          <Typography variant="subtitle1" gutterBottom>
            Из темы <i>{taskToCopy?.ThemeName}</i> в тему:
          </Typography>
          <ThemeSelector
            sx={{maxWidth: '100%'}}
            disabled={!selectedSubject}
            value={selectedTheme}
            list={themes}
            onChange={model.themeSelected}
          />
          <Button
            sx={{mt: 2}}
            disabled={!selectedSubject}
            variant="contained"
            onClick={() => model.copyTaskClicked()}
          >
            Скопировать
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
