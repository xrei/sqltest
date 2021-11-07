import React from 'react'
import type {RouteObject} from 'react-router'
import {MainLayout} from 'src/components/MainLayout'
import * as Pages from 'src/pages'

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {path: '/', index: true, element: <Pages.HomePage />},
      {path: '/about', element: <Pages.AboutPage />},
      {path: '/materials', element: <Pages.MaterialsPage />},
      {path: '/news', element: <Pages.NewsPage />},
      {path: '/authors', element: <Pages.AuthorsPage />},
    ],
  },
]
