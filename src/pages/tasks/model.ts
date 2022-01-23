import {forward} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel} from 'src/features/Test'

export const TasksGate = createGate()

forward({
  from: TasksGate.open,
  to: ThemesModel.fetchThemeListFx,
})

forward({
  from: TasksGate.close,
  to: ThemesModel.clearThemes,
})

TasksGate.close.watch(() => {
  console.log('tasks closed')
})
