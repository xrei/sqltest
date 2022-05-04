import React from 'react'
import {InputLabel, MenuItem, Select, FormControl} from '@mui/material'
import {useStore} from 'effector-react'
import * as SubjectsModel from '../Subjects/model'

type SubjectSelectProps = {
  dense?: boolean
  size?: 'small' | 'medium'
}
export const SubjectSelect = (props: SubjectSelectProps) => {
  const subjVal = useStore(SubjectsModel.$selectedSubjectId)
  const subjList = useStore(SubjectsModel.$availableSubjects)

  return (
    <FormControl variant="outlined" sx={{width: '100%'}} size={props.size}>
      <InputLabel id="stud-subj-sel">Дисциплина</InputLabel>
      <Select
        value={subjVal}
        labelId="stud-subj-sel"
        label="Дисциплина"
        required
        onChange={SubjectsModel.selectSubject}
      >
        {subjList.map((s) => (
          <MenuItem key={s.SubjectId} value={s.SubjectId}>
            {s.SubjectName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
