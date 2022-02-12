import {Test, Theme, Question} from 'src/types'
import type {ChangeAnswerCheckboxPayload, ChangeAnswerGenericPayload} from './types'

export const mapCheckboxAnswer = (test: Test, payload: ChangeAnswerCheckboxPayload) => {
  return {
    ...test,
    Questions: test.Questions.map((qsn) => {
      if (qsn.Id === payload.qId) {
        const answs = qsn.Answers.map((answ) =>
          answ.Id === payload.answId ? {...answ, Correct: payload.value} : answ
        )
        return {
          ...qsn,
          Answers: answs,
          UserAnswer: true,
        }
      } else return qsn
    }),
  }
}

export const mapAnswer = (test: Test, payload: ChangeAnswerGenericPayload) => {
  return {
    ...test,
    Questions: test.Questions.map((q) =>
      q.Id === payload.qId ? {...q, UserAnswer: payload.value} : q
    ),
  }
}
