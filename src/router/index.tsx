import React from 'react'
import type {RouteObject} from 'react-router'
import * as Pages from 'src/pages'
import {AuthOnly} from './AuthOnly'

const TasksPage = React.lazy(() => import('src/pages/tasks'))
const DBInfosPage = React.lazy(() => import('src/pages/dbinfos'))

export const routesPaths = {
  index: '/',
  about: '/about',
  materials: '/materials',
  news: '/news',
  authors: '/authors',
  tasks: '/tasks',
  dbinfos: '/dbinfos',
  profile: '/profile',
  profileInfo: '/profile/info',
  profileMyResults: '/profile/my-results',
  profileStudentsRating: '/profile/students-rating',
}

const WithAuth = (children: JSX.Element) => {
  return (
    <React.Suspense fallback={<></>}>
      <AuthOnly>{children}</AuthOnly>
    </React.Suspense>
  )
}

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {path: routesPaths.index, index: true, element: <Pages.HomePage />},
      {path: routesPaths.about, element: <Pages.AboutPage />},
      {path: routesPaths.materials, element: <Pages.MaterialsPage />},
      {path: routesPaths.news, element: <Pages.NewsPage />},
      {path: routesPaths.authors, element: <Pages.AuthorsPage />},
      {path: routesPaths.tasks, element: WithAuth(<TasksPage />)},
      {path: routesPaths.dbinfos, element: WithAuth(<DBInfosPage />)},
      {
        path: routesPaths.profile,
        element: WithAuth(<Pages.ProfilePage />),
        children: [
          {path: routesPaths.profileInfo, element: <Pages.ProfileInfoPage />},
          {path: routesPaths.profileMyResults, element: <Pages.MyResultsPage />},
          {path: routesPaths.profileStudentsRating, element: <Pages.StudentsRatingPage />},
        ],
      },
    ],
  },
]
