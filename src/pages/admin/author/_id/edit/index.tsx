import {useGate} from 'effector-react'
import React from 'react'
import {useLocation, useParams} from 'react-router'
import {AuthorManageForm} from '../../Form'
import * as model from '../../model'

export const EditAuthorPage = () => {
  const route = useLocation()
  const isEdit = route.pathname.includes('edit')
  const params = useParams()
  useGate(model.EditAuthorPageGate, {id: Number(params?.id)})

  return <AuthorManageForm isEdit={isEdit} />
}

export default EditAuthorPage
