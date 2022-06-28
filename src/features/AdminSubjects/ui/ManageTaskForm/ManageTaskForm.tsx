import React from 'react'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Divider,
  Button,
  Checkbox,
  Paper,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  IconButton,
  Tooltip,
} from '@mui/material'
import {Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material'
import {useGate, useStore} from 'effector-react'
import {RichTextEditor} from 'src/shared/ui/TextEditor'
import {SubjectSelector, SubjectsModel} from 'src/entities/Subject'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme'
import {QuestionTypes} from 'src/shared/lib/questionMaps'
import {$databases} from './dbModel'
import * as model from './model'
import {taskFormQueryDialogOpened, TaskFormAnswerQueryDialog} from './QueryDialog'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'

type ManageTaskFormProps = {
  isEdit?: boolean
  taskId?: number
}

export const ManageTaskForm = ({isEdit, taskId}: ManageTaskFormProps) => {
  useGate(model.ManageTaskFormGate, {taskId})
  const taskAnswers = useStore(model.$taskAnswers)

  const isEditTaskLoading = useStore(model.getTaskByIdFx.pending)

  if (isEdit && isEditTaskLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CenteredLoader />
      </Box>
    )
  }

  const onClick = () => {
    if (isEdit) {
      model.editTaskFx()
    } else {
      model.addTaskFx()
    }
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
      <TaskText />
      <SubjectThemeSelect />
      <DifficultyAndCategory />
      <TaskType />
      <AddAnswers isEdit={Boolean(isEdit)} />
      <TaskAnswers />

      <Box sx={{maxWidth: 300, width: '100%', margin: '0 auto', mt: 4}}>
        <Tooltip title="Необходимо добавить ответы" arrow>
          <span>
            <Button
              disabled={!isEdit && !taskAnswers.length}
              size="large"
              fullWidth
              variant="contained"
              onClick={onClick}
            >
              {isEdit ? 'Редактировать задание' : 'Добавить задание'}
            </Button>
          </span>
        </Tooltip>
      </Box>

      <TaskFormAnswerQueryDialog />
    </Box>
  )
}

const TaskText = () => {
  const defState = useStore(model.$taskDefaultContent)
  return (
    <Stack component={Paper} sx={{gap: 2, p: 2}}>
      <Typography variant="h3" gutterBottom>
        Текст задания
      </Typography>
      <RichTextEditor
        html={defState}
        EditorProps={{label: 'Введите текст задания'}}
        onChange={(state) => model.taskTextChanged(state)}
      />
    </Stack>
  )
}

const SubjectThemeSelect = () => {
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const themes = useStore(ThemesModel.$adminThemes)
  const selectedSubject = useStore(model.$taskSubjectId)
  const selectedTheme = useStore(model.$taskThemeId)

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <Typography variant="h3">Выбор темы для задания</Typography>
      <Box sx={{display: 'flex', gap: 2}}>
        <SubjectSelector
          value={selectedSubject}
          list={subjects}
          onSelectChange={model.subjSelected}
        />
        <ThemeSelector
          sx={{maxWidth: '100%'}}
          disabled={!selectedSubject}
          value={selectedTheme}
          list={themes}
          onChange={model.themeSelected}
        />
      </Box>
    </Stack>
  )
}

const DifficultyAndCategory = () => {
  const difficulty = useStore(model.$taskDifficulty)
  const category = useStore(model.$taskCategory)

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <Typography variant="h3">Сложность и категория</Typography>
      <Box sx={{display: 'flex', gap: 2}}>
        <Box>
          <FormControl size="small">
            <FormLabel id="task-type-radio">Сложность</FormLabel>
            <RadioGroup
              row
              aria-labelledby="task-type-radio"
              defaultValue={'0'}
              value={difficulty}
              name="radio-buttons-group"
              onChange={model.taskDifficultyChanged}
            >
              <FormControlLabel value={'0'} control={<Radio size="small" />} label="Легкий" />
              <FormControlLabel value={'1'} control={<Radio size="small" />} label="Средний" />
              <FormControlLabel value={'2'} control={<Radio size="small" />} label="Сложный" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box>
          <FormControl size="small">
            <FormLabel id="task-category-radio">Категория</FormLabel>
            <RadioGroup
              row
              aria-labelledby="task-category-radio"
              defaultValue={'0'}
              value={category}
              name="radio-buttons-group"
              onChange={model.taskCategoryChanged}
            >
              <FormControlLabel value={'0'} control={<Radio size="small" />} label="Знать" />
              <FormControlLabel value={'1'} control={<Radio size="small" />} label="Уметь" />
              <FormControlLabel value={'2'} control={<Radio size="small" />} label="Владеть" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Stack>
  )
}

const TaskType = () => {
  const taskTypesMap = Object.entries(QuestionTypes)
  const type = useStore(model.$taskType)

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <Typography variant="h3">Выбор типа</Typography>
      <Box>
        <FormControl size="small">
          <FormLabel id="task-type-radio">Тип задания</FormLabel>
          <RadioGroup
            row
            aria-labelledby="task-type-radio"
            value={type}
            name="radio-buttons-group"
            onChange={model.taskTypeChanged}
          >
            {taskTypesMap.map((type, key) => (
              <FormControlLabel
                key={key}
                value={type[0]}
                control={<Radio size="small" />}
                label={type[1]}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Stack>
  )
}

const DBSelector = () => {
  const value = useStore(model.$selectedDbId)
  const list = useStore($databases)

  return (
    <FormControl sx={{maxWidth: 'sm', mr: 2}} fullWidth variant="outlined" size="small">
      <InputLabel id="adm-db-sel">Учебная БД</InputLabel>
      <Select value={value} labelId="adm-db-sel" label="Учебная БД" onChange={model.dbSelected}>
        {list.map((x) => (
          <MenuItem dense key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type PropsChildren = {children?: React.ReactNode}

const AddAnswers = ({isEdit}: {isEdit: boolean}) => {
  const taskType = useStore(model.$taskType)

  const Components: {[key: number | string]: React.FC<PropsChildren>} = {
    0: AnswerTypeMultiple,
    1: AnswerTypeMultiple,
    2: AnswerTypeMultiple,
    3: AnswerTypeSingle,
    4: AnswerTypeCode,
    5: AnswerTypeCode,
    6: AnswerTypeCode,
    7: AnswerTypeCode,
    8: AnswerTypeCode,
  }

  const CurrAnsComponent = Components[taskType] || Unimplemented
  // const isAnswerTypeCode = [4, 5, 6, 7, 8].some((v) => v === Number(taskType))

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <CurrAnsComponent>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
          <Button variant="contained" color="info" onClick={() => model.answerAddClicked()}>
            Добавить ответ
          </Button>
        </Box>
      </CurrAnsComponent>
    </Stack>
  )
}

const AnswerTypeMultiple: React.FC<PropsChildren> = ({children}) => {
  const {Content, Correct} = useStore(model.$answToAdd)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', gap: 1}}>
      <Typography variant="h3">Новый ответ:</Typography>
      <TextField multiline rows={3} value={Content} onChange={model.answerContentChanged} />
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <FormControlLabel
          label="Правильный"
          control={<Checkbox checked={Correct} onChange={model.answerCorrectChanged} />}
        />
        {children}
      </Box>
    </Box>
  )
}

const AnswerTypeSingle: React.FC<PropsChildren> = ({children}) => {
  const {Content} = useStore(model.$answToAdd)

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
      <Typography variant="h3">Новый ответ:</Typography>
      <TextField value={Content} onChange={model.answerContentChanged} />
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>{children}</Box>
    </Box>
  )
}

const AnswerTypeCode: React.FC<PropsChildren> = ({children}) => {
  const {Content} = useStore(model.$answToAdd)
  const dbId = useStore(model.$selectedDbId)
  const taskType = useStore(model.$taskType)

  const titles: {[key: string]: string} = {
    '7': 'Запрос MongoDB:',
    '8': 'Запрос Neo4j:',
  }

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
      <DBSelector />
      <Typography variant="h3">{titles[taskType] || 'SQL-Запрос:'}</Typography>
      <TextField
        multiline
        rows={3}
        placeholder="Введите запрос"
        value={Content}
        onChange={model.answerContentChanged}
      />
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button
          variant="outlined"
          onClick={() =>
            taskFormQueryDialogOpened({DatabaseId: dbId, Type: taskType, UserAnswer: Content})
          }
        >
          ТРЗ
        </Button>
        {children}
      </Box>
    </Box>
  )
}

const TaskAnswers = () => {
  const taskAnswers = useStore(model.$taskAnswers)

  const renderAnswers = taskAnswers.map((answer, idx) => (
    <Box key={idx} sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
      <Typography
        sx={{cursor: 'pointer'}}
        color={answer.Correct ? 'success.main' : 'error.main'}
        onClick={() => model.changeAnswerVisibilityClicked(answer.Id)}
      >
        {answer.Content}
      </Typography>

      <IconButton onClick={() => model.deleteAnswerClicked(answer.Id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => model.editAnswerClicked(answer)}>
        <EditIcon />
      </IconButton>
    </Box>
  ))

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <Typography variant="h3">Ответы:</Typography>
      {taskAnswers.length ? renderAnswers : <Typography>Необходимо добавить ответы!</Typography>}
    </Stack>
  )
}

const Unimplemented: React.FC = () => {
  return <div>unimplemented</div>
}
