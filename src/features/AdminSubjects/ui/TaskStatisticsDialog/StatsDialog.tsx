import React from 'react'
import {Typography, Button, Divider, Stack, Dialog, DialogTitle, DialogContent} from '@mui/material'
import {useStore} from 'effector-react'
import {CenteredLoader} from 'src/shared/ui/CenteredLoader'
import * as model from './model'

export const TaskStatisticsDialog = () => {
  const open = useStore(model.$dialogOpen)
  const stats = useStore(model.$qsnStats)
  const isEmpty = useStore(model.$statsIsEmpty)

  return (
    <Dialog maxWidth="lg" fullWidth open={open} onClose={() => model.closeStatisticsDialog()}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Статистические характеристики задания
        <Button variant="outlined" onClick={() => model.closeStatisticsDialog()}>
          Закрыть
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {isEmpty ? (
          <CenteredLoader />
        ) : (
          <Stack gap={1}>
            <Typography>
              Номер задания: <b>{stats?.qsn_id}</b>
            </Typography>
            <Typography>
              Коэффициент лёгкости: <b>{stats?.easy_coefficient}</b>
            </Typography>
            <Typography>
              Коэффициент сложности: <b>{stats?.hard_coefficient}</b>
            </Typography>
            <Typography>
              Среднеквадратическое отклонение: <b>{stats?.standart_deviation}</b>
            </Typography>
            <Typography>
              Количество выпадений: <b>{stats?.discriminate_coefficient}</b>
            </Typography>
            <Typography>
              Уровень сложности: <b>{stats?.exit_difficulty}</b>
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  )
}
