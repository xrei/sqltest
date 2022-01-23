import {forward, attach} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel, SubjectsModel, TestContentModel} from 'src/features/Test'

export const TasksGate = createGate()

forward({
  from: TasksGate.close,
  to: ThemesModel.clearThemes,
})
forward({
  from: TasksGate.close,
  to: SubjectsModel.resetSelectedSubject,
})

TasksGate.close.watch(() => {
  console.log('tasks page unmount')
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
