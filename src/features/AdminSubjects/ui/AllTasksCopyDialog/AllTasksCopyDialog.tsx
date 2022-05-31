import React from 'react'
import {
  Typography,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material'
import {useStore} from 'effector-react'
import {SubjectsModel, SubjectSelector} from 'src/entities/Subject'
import * as model from './model'

export const AllTasksCopyDialog = () => {
  const open = useStore(model.$copyAllTasksDialogOpen)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const selectedSubject = useStore(model.$selectedSubject)
  const switchTypeValue = useStore(model.$copyTypeSwitchVal)
  const label = switchTypeValue ? 'Копировать все задания' : 'Копировать только легкие задания'

  const onCopyClick = () => {
    if (switchTypeValue) {
      model.copyThemeClicked('all')
    } else {
      model.copyThemeClicked('easy')
    }
  }

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="sm" onClose={() => model.dialogClosed()}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h3">Выберите новую дисциплину:</Typography>
        <Button variant="outlined" onClick={() => model.dialogClosed()}>
          Закрыть
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{mb: 4}}>
          <CopyTypeSwitcher label={label} />
        </Box>
        <SubjectSelector
          sx={{maxWidth: '100%', mb: 1}}
          value={selectedSubject}
          list={subjects}
          onSelectChange={model.subjSelected}
        />

        <Button
          sx={{mt: 2}}
          fullWidth
          disabled={!selectedSubject}
          variant="contained"
          onClick={() => onCopyClick()}
        >
          {label}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

type CopyTypeSwitcherProps = {
  label: string
}
const CopyTypeSwitcher = ({label}: CopyTypeSwitcherProps) => {
  const checked = useStore(model.$copyTypeSwitchVal)

  return (
    <Tooltip title="Переключить тип копирования" placement="bottom-start">
      <FormGroup sx={{userSelect: 'none'}}>
        <FormControlLabel
          control={<Switch size="medium" checked={checked} onChange={model.switchStateChanged} />}
          label={<Typography>{label}</Typography>}
        />
      </FormGroup>
    </Tooltip>
  )
}
