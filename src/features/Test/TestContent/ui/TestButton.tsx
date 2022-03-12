/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {Button} from '@mui/material'
import {useStore} from 'effector-react'
import {Link} from 'react-router-dom'
import {routesPaths} from 'src/router/paths'
import {UserModel} from 'src/features/User'
import * as TestContentModel from '../model'

type TestButtonProps = {
  drawer?: boolean
  children?: React.ReactNode
}

export const TestButton = ({drawer}: TestButtonProps) => {
  const currTheme = useStore(TestContentModel.$currentTheme)
  const hasTest = useStore(TestContentModel.$hasTestAndTheme)
  const user = useStore(UserModel.$user)
  const isStudent = useStore(UserModel.$userIsStudent)

  if ((!user && !currTheme) || !isStudent) return <></>

  if (hasTest) {
    return (
      <Button
        component={Link}
        to={routesPaths.tasks + `/${currTheme?.ThemeId}`}
        variant="contained"
        disableElevation
        color={drawer ? 'primary' : 'success'}
      >
        Текущий тест
      </Button>
    )
  } else {
    return (
      <Button
        component={Link}
        to={routesPaths.tasks}
        variant="outlined"
        size="small"
        css={buttonCss(drawer)}
        color={drawer ? 'primary' : 'inherit'}
      >
        Пройти тест
      </Button>
    )
  }
}

const buttonCss = (drawer?: boolean) => (theme: any) =>
  css`
    width: 'auto';
    margin: ${drawer && theme.spacing(2)};
    margin-top: ${drawer && theme.spacing(4)};
  `
