import {forward} from 'effector'
import {createGate} from 'effector-react'
import {ThemesModel, SubjectsModel} from 'src/features/Test'

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
