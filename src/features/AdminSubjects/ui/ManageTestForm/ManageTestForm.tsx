import React from 'react'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Divider,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {SubjectSelector, SubjectsModel} from 'src/entities/Subject'
import {RichTextEditor} from 'src/shared/ui/TextEditor'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme'
import * as model from './model'

type ManageTestFormProps = {
  isEdit?: boolean
  testId?: number
}

export const ManageTestForm = ({isEdit, testId}: ManageTestFormProps) => {
  useGate(model.ManageTestFormGate, {testId})

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
      <BlockCommon />
      <BlockThemeSettings />
      <BlockQsnCategories />
      <BlockScoresPercent />
      <BlockTestHelp />
    </Box>
  )
}

const BlockCommon = () => {
  const testName = useStore(model.$testName)
  const testTime = useStore(model.$testTime)
  const testTryCount = useStore(model.$testTryCount)
  const type = useStore(model.$testType)
  const mode = useStore(model.$testLearnMode)

  return (
    <Stack component={Paper} sx={{p: 2}} gap={2}>
      <Typography variant="h3">Общие настройки</Typography>
      <TextField
        size="small"
        label="Название теста"
        required
        value={testName}
        onChange={model.testNameChanged}
      />
      <Stack>
        <Typography variant="h4" gutterBottom>
          Описание
        </Typography>
        <RichTextEditor
          EditorProps={{label: 'Введите описание'}}
          onChange={(state) => model.testDescriptionChanged(state)}
        />
      </Stack>
      <Box sx={{display: 'flex', gap: 4, mb: 2}}>
        <Box>
          <FormControl size="small">
            <FormLabel id="test-type-radio">Тип теста</FormLabel>
            <RadioGroup
              row
              aria-labelledby="test-type-radio"
              defaultValue={'0'}
              value={type}
              name="radio-buttons-group"
              onChange={model.testTypeChanged}
            >
              <FormControlLabel value={'0'} control={<Radio size="small" />} label="Обычный" />
              <FormControlLabel value={'1'} control={<Radio size="small" />} label="Итоговый" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box>
          <FormControl size="small">
            <FormLabel id="test-mode-radio">Режим обучения</FormLabel>
            <RadioGroup
              row
              aria-labelledby="test-mode-radio"
              defaultValue={'0'}
              value={mode}
              name="radio-buttons-group"
              onChange={model.testLearnModeChanged}
            >
              <FormControlLabel
                value={'0'}
                control={<Radio size="small" />}
                label="Не использовать"
              />
              <FormControlLabel
                value={'1'}
                control={<Radio size="small" />}
                label="Показывать правильный результат"
              />
              <FormControlLabel
                value={'2'}
                control={<Radio size="small" />}
                label="Показывать правильность ответа"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{display: 'flex', gap: 4, maxWidth: 'sm'}}>
        <Box sx={{flex: 1}}>
          <TextField
            fullWidth
            size="small"
            label="Времени ответа на вопрос (минуты)"
            required
            value={testTime}
            onChange={model.testTimeChanged}
          />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{flex: 1}}>
          <TextField
            fullWidth
            size="small"
            label="Кол-во попыток тестирования"
            required
            value={testTryCount}
            onChange={model.testTryCountChanged}
          />
        </Box>
      </Box>
    </Stack>
  )
}

const BlockThemeSettings = () => {
  const selectedSubj = useStore(model.$testSubjectId)
  const selectedTheme = useStore(model.$testThemeId)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const themes = useStore(ThemesModel.$adminThemes)

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <Typography variant="h3">Настройки вопросов</Typography>
      <Box sx={{display: 'flex', gap: 2}}>
        <SubjectSelector value={selectedSubj} list={subjects} onSelectChange={model.subjSelected} />
        <ThemeSelector
          sx={{maxWidth: '100%'}}
          disabled={!selectedSubj}
          value={selectedTheme}
          list={themes}
          onChange={model.themeSelected}
        />
      </Box>
    </Stack>
  )
}

const BlockScoresPercent = () => {
  const scorePerc = useStore(model.$scorePerc)
  const min = 0
  const max = 100

  const onInputChange = (val: string, key: number) => {
    let value = parseInt(val, 10)

    if (value > max) value = max
    if (value < min) value = min

    model.scorePercKeyChanged({key, value: String(value)})
  }

  return (
    <Box
      component={Paper}
      sx={{p: 2, display: 'flex', gap: 1, '.MuiFormHelperText-root': {m: 0, ml: 0.5}}}
    >
      <Box sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
        <Typography sx={{fontWeight: 500}}>Опция/оценка</Typography>
        <Typography>Количество процентов:</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>2</Typography>
        <TextField
          helperText="0-100%"
          type="number"
          InputProps={{inputProps: {min, max}}}
          size="small"
          value={scorePerc[2]}
          onChange={(e) => onInputChange(e.target.value, 2)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>3</Typography>
        <TextField
          helperText="0-100%"
          type="number"
          InputProps={{inputProps: {min, max}}}
          size="small"
          value={scorePerc[3]}
          onChange={(e) => onInputChange(e.target.value, 3)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>4</Typography>
        <TextField
          helperText="0-100%"
          type="number"
          InputProps={{inputProps: {min, max}}}
          size="small"
          value={scorePerc[4]}
          onChange={(e) => onInputChange(e.target.value, 4)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>5</Typography>
        <TextField
          helperText="0-100%"
          type="number"
          InputProps={{inputProps: {min, max}}}
          size="small"
          value={scorePerc[5]}
          onChange={(e) => onInputChange(e.target.value, 5)}
        />
      </Box>
    </Box>
  )
}

const BlockQsnCategories = () => {
  const categories = useStore(model.$qsnCategories)
  const countsMap = useStore(model.$countQsnsForThemeMap)
  const min = 0

  const onInputChange = (val: string, key: string) => {
    let value = parseInt(val, 10)

    if (value > countsMap[key]) value = countsMap[key]
    if (value < min) value = min

    model.qsnCategoriesChanged({key, value: value})
  }

  return (
    <Box
      component={Paper}
      sx={{p: 2, display: 'flex', gap: 1, '.MuiFormHelperText-root': {m: 0, ml: 1}}}
    >
      <Box sx={{display: 'flex', flexFlow: 'column', gap: 2}}>
        <Typography sx={{fontWeight: 500}}>Опция/Категория вопроса</Typography>
        <Typography>Количество вопросов в категории:</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>Знать</Typography>
        <TextField
          helperText={`0-${countsMap.know}`}
          type="number"
          InputProps={{inputProps: {min, max: countsMap.know}}}
          size="small"
          value={categories.know}
          onChange={(e) => onInputChange(e.target.value, 'know')}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>Уметь</Typography>
        <TextField
          helperText={`0-${countsMap.can}`}
          type="number"
          InputProps={{inputProps: {min, max: countsMap.can}}}
          size="small"
          value={categories.can}
          onChange={(e) => onInputChange(e.target.value, 'can')}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          gap: 1,
          maxWidth: 80,
        }}
      >
        <Typography>Владеть</Typography>
        <TextField
          helperText={`0-${countsMap.own}`}
          type="number"
          InputProps={{inputProps: {min, max: countsMap.own}}}
          size="small"
          value={categories.own}
          onChange={(e) => onInputChange(e.target.value, 'own')}
        />
      </Box>
    </Box>
  )
}

const BlockTestHelp = () => {
  return (
    <Stack gap={2} component={Paper} sx={{p: 2}}>
      <Typography variant="h4" gutterBottom>
        Подсказка к тесту
      </Typography>
      <RichTextEditor
        EditorProps={{label: 'Введите подсказку'}}
        onChange={(state) => model.testHelpChanged(state)}
      />
    </Stack>
  )
}
