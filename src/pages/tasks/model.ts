import {forward, attach} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel} from 'src/entities/Theme'
import {SubjectsModel} from 'src/entities/Subject'
import {TestContentModel} from 'src/features/Test'

export const TasksGate = createGate()

forward({
  from: TasksGate.close,
  to: [ThemesModel.clearThemes, SubjectsModel.resetSelectedSubject],
})

export const startTestFx = attach({
  source: [ThemesModel.$selectedTheme],
  async effect([theme]) {
    if (!theme) return false

    TestContentModel.setCurrentTheme(theme)
    await TestContentModel.fetchTestContentFx(theme)

    return theme
  },
})
