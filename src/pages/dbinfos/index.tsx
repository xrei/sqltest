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
  DialogContent,
} from '@mui/material'
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import {useStore, useGate} from 'effector-react'
import {DBInfoModel} from 'src/features/DBInfo'
import {DbInfoPage} from './model'

const DBInfosPage = () => {
  useGate(DbInfoPage)
  const list = useStore(DBInfoModel.$dbInfosList)
  const [openedDialog, setDialog] = useState(0)
  const [expanded, setExpanded] = useState<number | false>(false)

  const handleExpand = (v: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? v : false)
  }

  const onClose = () => {
    setDialog(0)
  }

  return (
    <>
      <Box sx={{flexFlow: 'column', mt: 2}}>
        <Typography variant="h1" gutterBottom>
          Описание баз данных
        </Typography>
        <Typography gutterBottom>
          Ниже представлено описание учебных БД, а так же скрипты для их создания
        </Typography>
        {list.map((val) => {
          return (
            <Accordion
              expanded={expanded === val.id}
              elevation={3}
              key={val.id}
              TransitionProps={{unmountOnExit: true}}
              onChange={handleExpand(val.id)}
            >
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
                {expanded === val.id ? (
                  <div dangerouslySetInnerHTML={{__html: val.description}} />
                ) : (
                  <div />
                )}
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
      <DialogActions sx={{mt: 2}}>
        <Button variant="contained" color={copied ? 'success' : 'primary'} onClick={copy}>
          {copied ? 'Успешно скопировано' : 'Скопировать скрипт'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DBInfosPage
