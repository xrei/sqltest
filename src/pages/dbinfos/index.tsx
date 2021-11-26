/** @jsxImportSource @emotion/react */
import React, {useState} from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
} from '@mui/material'
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import {useStore} from 'effector-react'
import * as DbInfoModel from './model'

export const DBInfosPage = () => {
  const list = useStore(DbInfoModel.$dbInfosList)
  const [openedDialog, setDialog] = useState(0)
  const onClose = () => {
    setDialog(0)
  }

  return (
    <>
      <DbInfoModel.DbInfoPage />
      <Box sx={{flexFlow: 'column', mt: 2}}>
        <Typography variant="h1" gutterBottom>
          Описание баз данных:
        </Typography>
        <Typography gutterBottom>
          Ниже представлено описание учебных БД, а так же скрипты для их создания
        </Typography>
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
                <Button variant="contained" size="large" onClick={() => setDialog(val.id)}>
                  Скрипт для создания базы данных
                </Button>
                <div dangerouslySetInnerHTML={{__html: val.description}}></div>
              </AccordionDetails>

              <DBScriptDialog
                script={val.creation_script}
                open={openedDialog === val.id}
                onClose={onClose}
              ></DBScriptDialog>
            </Accordion>
          )
        })}
      </Box>
    </>
  )
}

type DialogProps = {
  script: string
  open: boolean
  onClose: (event: unknown) => void
}
const DBScriptDialog: React.FC<DialogProps> = ({script, open, onClose}) => {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      const el = document.createElement('div')
      el.innerHTML = script
      await navigator.clipboard.writeText(el.innerText)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Dialog open={open} scroll="paper" onClose={onClose}>
      <DialogContent>
        <div dangerouslySetInnerHTML={{__html: script}}></div>
      </DialogContent>
      <DialogActions>
        <Button
          variant={copied ? 'contained' : 'outlined'}
          color={copied ? 'success' : 'primary'}
          onClick={copy}
        >
          {copied ? 'Успешно скопировано' : 'Скопировать скрипт'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DBInfosPage