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
  Grid,
} from '@mui/material'
import {useGate, useStore} from 'effector-react'
import {SubjectSelector, SubjectsModel} from 'src/entities/Subject'
import {RichTextEditor} from 'src/shared/ui/TextEditor'
import {ThemeSelector, ThemesModel} from 'src/entities/Theme'
import * as model from './model'
import {MultipleThemesSelector} from 'src/entities/Theme/MultipleThemeSelector'
import {
  $categoriesForms,
  $themeForms,
  QuestionCategoriesFields,
  QuestionCountsFields,
  ThemeForm,
} from './createForm'

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
      <ThemeTaskForms />
      <BlockQsnCategories />
      <BlockScoresPercent />
      <BlockTestHelp />
      <Box sx={{mt: 4}}>
        <Button variant="contained" onClick={() => model.addTestClicked()}>
          Добавить тест
        </Button>
      </Box>
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
  const selectedThemes = useStore(model.$testManyThemeId)
  const subjects = useStore(SubjectsModel.$adminSubjects)
  const themes = useStore(ThemesModel.$adminThemes)
  const testType = useStore(model.$testType)
  const isMultiple = testType === '1'

  return (
    <Stack component={Paper} gap={2} sx={{p: 2}}>
      <Typography variant="h3">Настройки темы</Typography>
      <Box sx={{display: 'flex', gap: 2}}>
        <SubjectSelector value={selectedSubj} list={subjects} onSelectChange={model.subjSelected} />
        {isMultiple ? (
          <MultipleThemesSelector
            disabled={!selectedSubj}
            value={selectedThemes}
            list={themes}
            onSelectChange={model.manyThemesSelected}
          />
        ) : (
          <ThemeSelector
            sx={{maxWidth: '100%'}}
            disabled={!selectedSubj}
            value={selectedTheme}
            list={themes}
            onChange={model.themeSelected}
          />
        )}
      </Box>
    </Stack>
  )
}

const CountsForm = ({themeForm}: {themeForm: ThemeForm<QuestionCountsFields>}) => {
  const fields = useStore(themeForm.$fields)
  const themes = useStore(ThemesModel.$adminThemes)
  const themeName = themes.find((t) => t.ThemeId === Number(themeForm.optionId))?.ThemeName || ''
  const countsStore = useStore(model.$countQsnsForThemes)
  const counts = countsStore.questions.find((val) => val.themeId === Number(themeForm.optionId))
    ?.counts || ['??', '??', '??']

  return (
    <>
      <Grid item xs={3}>
        <Typography sx={{fontWeight: 500}}>Количество вопросов:</Typography>
        <Typography variant="subtitle1">{themeName}</Typography>
      </Grid>
      <Grid item xs={1}>
        <TextField
          helperText={`<= ${counts[0]}`}
          type="number"
          size="small"
          value={fields.countEasy}
          onChange={(e) => themeForm.changeField({key: 'countEasy', value: e.target.value})}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          helperText={`<= ${counts[1]}`}
          type="number"
          size="small"
          value={fields.countMiddle}
          onChange={(e) => themeForm.changeField({key: 'countMiddle', value: e.target.value})}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          helperText={`<= ${counts[2]}`}
          type="number"
          size="small"
          value={fields.countHard}
          onChange={(e) => themeForm.changeField({key: 'countHard', value: e.target.value})}
        />
      </Grid>
    </>
  )
}

const ThemeTaskForms = () => {
  const forms = useStore($themeForms)

  return (
    <Box
      component={Paper}
      sx={{
        p: 2,
        display: 'flex',
        flexFlow: 'column',
        gap: 2,
        '.MuiFormHelperText-root': {m: 0, ml: 0.5},
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography sx={{fontWeight: 500}}>Опция/сложность</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{fontWeight: 500}}>Легкий</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{fontWeight: 500}}>Средний</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{fontWeight: 500}}>Сложный</Typography>
        </Grid>
      </Grid>
      {forms.map((form) => (
        <Grid key={form.optionId} container spacing={2}>
          <CountsForm themeForm={form} />
        </Grid>
      ))}
    </Box>
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

const CategoriesCountsForm = ({themeForm}: {themeForm: ThemeForm<QuestionCategoriesFields>}) => {
  const fields = useStore(themeForm.$fields)
  const themes = useStore(ThemesModel.$adminThemes)
  const themeName = themes.find((t) => t.ThemeId === Number(themeForm.optionId))?.ThemeName || ''
  const countsStore = useStore(model.$countQsnsForThemes)
  const counts = countsStore.categories.find((val) => val.themeId === Number(themeForm.optionId))
    ?.counts || ['??', '??', '??']

  return (
    <>
      <Grid item xs={3}>
        <Typography sx={{fontWeight: 500}}>Количество вопросов в категории:</Typography>
        <Typography variant="subtitle1">{themeName}</Typography>
      </Grid>
      <Grid item xs={1}>
        <TextField
          helperText={`<= ${counts[0]}`}
          type="number"
          size="small"
          value={fields.countCan}
          onChange={(e) => themeForm.changeField({key: 'countCan', value: e.target.value})}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          helperText={`<= ${counts[1]}`}
          type="number"
          size="small"
          value={fields.countKnow}
          onChange={(e) => themeForm.changeField({key: 'countKnow', value: e.target.value})}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          helperText={`<= ${counts[2]}`}
          type="number"
          size="small"
          value={fields.countOwn}
          onChange={(e) => themeForm.changeField({key: 'countOwn', value: e.target.value})}
        />
      </Grid>
    </>
  )
}

const BlockQsnCategories = () => {
  const forms = useStore($categoriesForms)

  return (
    <Box
      component={Paper}
      sx={{
        p: 2,
        display: 'flex',
        flexFlow: 'column',
        gap: 2,
        '.MuiFormHelperText-root': {m: 0, ml: 0.5},
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography sx={{fontWeight: 500}}>Опция/Категория вопроса</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{fontWeight: 500}}>Знать</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{fontWeight: 500}}>Уметь</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{fontWeight: 500}}>Владеть</Typography>
        </Grid>
      </Grid>
      {forms.map((form) => (
        <Grid key={form.optionId} container spacing={2}>
          <CategoriesCountsForm themeForm={form} />
        </Grid>
      ))}
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
