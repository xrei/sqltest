import React from 'react'
import {AuthorsPage} from './authors'
import {HomePage} from './home'
import {MaterialsPage} from './materials'
import {MaterialArticlePage} from './materials/_id'
import {NewsPage} from './news'
import {ProfilePage, MyResultsPage, StudentsRatingPage, ProfileInfoPage} from './profile'
import {TaskResultPage} from './tasks/result'

const TasksPage = React.lazy(() => import('src/pages/tasks'))
const ThemeIdPage = React.lazy(() => import('src/pages/tasks/_themeId'))
const DBInfosPage = React.lazy(() => import('src/pages/dbinfos'))

export {
  TasksPage,
  ThemeIdPage,
  DBInfosPage,
  AuthorsPage,
  HomePage,
  NewsPage,
  MaterialsPage,
  MaterialArticlePage,
  ProfilePage,
  ProfileInfoPage,
  MyResultsPage,
  StudentsRatingPage,
  TaskResultPage,
}
