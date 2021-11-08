import React from 'react'
import type {RouteObject} from 'react-router'
import * as Pages from 'src/pages'

export const routesPaths = {
  index: '/',
  about: '/about',
  materials: '/materials',
  news: '/news',
  authors: '/authors',
  tasks: '/tasks',
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
    ],
  },
]
