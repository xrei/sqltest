import React from 'react'
import type {RouteObject} from 'react-router'
import * as Pages from 'src/pages'
import {AuthOnly} from './AuthOnly'
import {routesPaths} from './paths'

const WithAuth = (children: JSX.Element) => {
  return (
    <React.Suspense fallback={<></>}>
      <AuthOnly>{children}</AuthOnly>
    </React.Suspense>
  )
}

export const createRoutes = (): RouteObject[] => [
  {path: routesPaths.index, index: true, element: <Pages.HomePage />},
  {path: routesPaths.materials, element: <Pages.MaterialsPage />},
  {path: routesPaths.materialId, element: <Pages.MaterialArticlePage />},
  {path: routesPaths.news, element: <Pages.NewsPage />},
  {path: routesPaths.authors, element: <Pages.AuthorsPage />},
  {path: routesPaths.dbinfos, element: WithAuth(<Pages.DBInfosPage />)},
  {path: routesPaths.tasks, element: WithAuth(<Pages.TasksPage />)},
  {path: routesPaths.themeId, element: WithAuth(<Pages.ThemeIdPage />)},
  {path: routesPaths.tasksResult, element: WithAuth(<Pages.TaskResultPage />)},
  {
    path: routesPaths.profile,
    element: WithAuth(<Pages.ProfilePage />),
    children: [
      {path: routesPaths.profileInfo, element: <Pages.ProfileInfoPage />},
      {path: routesPaths.profileMyResults, element: <Pages.MyResultsPage />},
      {path: routesPaths.profileStudentsRating, element: <Pages.StudentsRatingPage />},
    ],
  },
]
