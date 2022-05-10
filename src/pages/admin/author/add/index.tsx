import {useGate} from 'effector-react'
import React from 'react'
import {AuthorManageForm} from '../Form'
import * as model from '../model'

export const AddAuthorPage = () => {
  useGate(model.AddAuthorPageGate)

  return <AuthorManageForm />
}

export default AddAuthorPage
