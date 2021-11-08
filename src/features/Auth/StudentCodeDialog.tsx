import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import {useStore} from 'effector-react'
import {DialogModel} from '.'
import {acceptStudCode, rejectStudCode} from './registerModel'

export const StudentCodeDialog = () => {
  const open = useStore(DialogModel.$studentCodeOpen)
  const handleAgree = () => {
    acceptStudCode()
    DialogModel.studentCodeClosed()
  }
  const handleDisagree = () => {
    rejectStudCode()
    DialogModel.studentCodeClosed()
  }
  return (
    <Dialog open={open} scroll="paper" onClose={() => DialogModel.studentCodeClosed()}>
      <DialogTitle>Кодекс чести</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Я обещаю: 1. Иметь только одну учетную запись на сайте. 2. Самостоятельно выполнять все
          задания (тесты, экзамены, домашние и контрольные работы, лабораторные работы, рефераты и
          др.), за исключением совместных работ, в которых это явно указано. 3. Не заниматься
          плагиатом. 4. Не распространять ответы, которые используются для оценки обучения, не
          публиковать их на сайте и других ресурсах, а также в личной переписке. 5. Не участвовать в
          любой деятельности, которая может нечестно изменить как собственные результаты учебы, так
          и улучшить или ухудшить результаты учебы других участников проекта. 6. Способствовать
          распространению знаний, помогать другим в учебе и администрации в исправлении ошибок. 7.
          Не приступать к прохождению теста предварительно не изучив должным образом соответствующую
          теоретическую часть. Не пытаться наугад отвечать на задания. 8. Вести себя корректно и
          уважительно в отношении всех участников проекта, включая авторов курсов, кураторов учебных
          групп и администрацию, не использовать недопустимую лексику и не унижать достоинство
          других.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button color="secondary" variant="contained" onClick={handleDisagree}>
          Не Согласен
        </Button>
        <Button color="primary" variant="contained" onClick={handleAgree}>
          Согласен
        </Button>
      </DialogActions>
    </Dialog>
  )
}
