import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import {DBInfoModel} from '.'
import {useStore} from 'effector-react'
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'

export const DBInfoDialog = () => {
  const open = useStore(DBInfoModel.$isOpen)
  const list = useStore(DBInfoModel.$dbInfosList)

  return (
    <Dialog maxWidth="lg" fullWidth open={open} onClose={() => DBInfoModel.toggleDialog()}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Описание учебных баз данных:
        <Button variant="outlined" onClick={() => DBInfoModel.toggleDialog()}>
          Закрыть
        </Button>
      </DialogTitle>
      <DialogContent>
        {list.map((val) => {
          return (
            <Accordion elevation={3} key={val.id} TransitionProps={{unmountOnExit: true}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`db-${val.id}`}
                id={`db-${val.id}`}
              >
                <Typography>{val.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div dangerouslySetInnerHTML={{__html: val.description}} />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}
