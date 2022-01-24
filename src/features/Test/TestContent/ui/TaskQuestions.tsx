import {useStore} from 'effector-react'
import React from 'react'
import {Box, Typography, Button, useTheme} from '@mui/material'
import {TestContentModel} from 'src/features/Test/'
import {grey, orange, green, lightBlue, blue, common} from '@mui/material/colors'

export const TaskQuestions = () => {
  const test = useStore(TestContentModel.$test)
  const currQId = useStore(TestContentModel.$currentQestionId)

  if (!test) return <></>

  const qsns = test.Questions
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {qsns.map((q, idx) => {
        return (
          <QuestionBtn
            key={q.Id}
            index={idx}
            lastIdx={qsns.length - 1}
            qsnDifficulty={q.Difficulty}
            current={q.Id === currQId}
            hasAnswer={Boolean(q.UserAnswer)}
            onClick={() => TestContentModel.changeCurrentQuestionId(q.Id)}
          >
            {q.NumInTest + 1}
          </QuestionBtn>
        )
      })}

      <Button sx={{ml: 4}} variant="contained" color="error">
        Закончить тест
      </Button>
    </Box>
  )
}

interface QsnBtnProps {
  index: number
  lastIdx: number
  qsnDifficulty: number
  current?: boolean
  hasAnswer?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const QuestionBtn: React.FC<QsnBtnProps> = (props) => {
  const theme = useTheme()

  const diffColors: {[key: number]: {bg: string; text: string}} = {
    0: {bg: grey[100], text: common.black},
    1: {bg: blue[800], text: common.white},
    2: {bg: orange[400], text: common.white},
  }
  const hasAnswColorBg = props.hasAnswer ? theme.palette.success.main : false
  const currAnswBg = props.current ? theme.palette.info.light : false
  const hasAnswTextColor = props.hasAnswer ? theme.palette.common.white : false
  const currAnswTextColor = props.current ? theme.palette.common.white : false

  const btnBgColor = currAnswBg || hasAnswColorBg || diffColors[props.qsnDifficulty].bg
  const btnTextColor = currAnswTextColor || hasAnswTextColor || diffColors[props.qsnDifficulty].text
  const hideBorder = props.index > 0 && props.index < props.lastIdx
  const hideRightBorder = props.index === 0
  const hideLeftBorder = props.lastIdx === props.index

  return (
    <Button
      variant="contained"
      sx={{
        borderBottomRightRadius: hideRightBorder ? 0 : 3,
        borderBottomLeftRadius: hideLeftBorder ? 0 : 3,
        borderTopRightRadius: hideRightBorder ? 0 : 3,
        borderTopLeftRadius: hideLeftBorder ? 0 : 3,
        ...(hideBorder ? {borderRadius: 0} : {}),
        minWidth: 'auto',
        p: 0,
        fontSize: theme.typography.pxToRem(16),
        width: '48px',
        height: '48px',
        backgroundColor: btnBgColor,
        color: btnTextColor,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.black,
        },
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  )
}
