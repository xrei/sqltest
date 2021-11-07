import type {RouteObject} from 'react-router'
import * as Pages from 'src/pages'

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {index: true, element: Pages.HomePage},
      {path: '/about', element: Pages.AboutPage},
      {path: '/materials', element: Pages.MaterialsPage},
      {path: '/news', element: Pages.NewsPage},
      {path: '/authors', element: Pages.AuthorsPage},
    ],
  },
]
