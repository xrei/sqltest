import React from 'react'
import type {RouteObject} from 'react-router'
import * as Pages from 'src/pages'
import {createLazyAdminPages} from 'src/pages/admin'
import {AuthOnly} from './AuthOnly'
import {routesPaths, adminRoutes} from './paths'

const WithAuth = (children: JSX.Element) => {
  return (
    <React.Suspense fallback={<></>}>
      <AuthOnly>{children}</AuthOnly>
    </React.Suspense>
  )
}

export const createRoutes = (createAdminRoutes: boolean): RouteObject[] => {
  let adminRoutesArr: RouteObject[] = []
  if (createAdminRoutes) {
    const AdminPages = createLazyAdminPages()
    adminRoutesArr = [
      {path: adminRoutes.tests, element: WithAuth(<AdminPages.AdminTestsPage />)},
      {path: adminRoutes.testsAdd, element: WithAuth(<AdminPages.AdminSubjectAddPage />)},
      {path: adminRoutes.testsSubjIdEdit, element: WithAuth(<AdminPages.AdminSubjectIdEditPage />)},
      {path: adminRoutes.testsSubjId, element: WithAuth(<AdminPages.AdminSubjectIdPage />)},
      {
        path: adminRoutes.testsSubjIdQuestionsThemeId,
        element: WithAuth(<AdminPages.AdminTestsQuestionsThemeIdPage />),
      },
      {path: adminRoutes.testsThemeAdd, element: WithAuth(<AdminPages.AdminThemeAddPage />)},
      {
        path: adminRoutes.testsSubjIdThemeIdEdit,
        element: WithAuth(<AdminPages.AdminThemeIdEditPage />),
      },
      {path: adminRoutes.testsTestAdd, element: WithAuth(<AdminPages.AdminTestsTestAddPage />)},
      {
        path: adminRoutes.testsTestIdEdit,
        element: WithAuth(<AdminPages.AdminTestsTestIdEditPage />),
      },
      {path: adminRoutes.testsTaskAdd, element: WithAuth(<AdminPages.AdminTestsTaskAddPage />)},
      {
        path: adminRoutes.testsTaskIdEdit,
        element: WithAuth(<AdminPages.AdminTestsTaskIdEditPage />),
      },
      {path: adminRoutes.students, element: WithAuth(<AdminPages.AdminManageStudentsPage />)},
      {path: adminRoutes.groups, element: WithAuth(<AdminPages.AdminManageGroupsPage />)},
      {path: adminRoutes.journal, element: WithAuth(<AdminPages.AdminJournalPage />)},
      {path: adminRoutes.systemDb, element: WithAuth(<AdminPages.AdminSystemDbPage />)},
      {path: adminRoutes.systemDbAdd, element: WithAuth(<AdminPages.AdminSystemDbAddPage />)},
      {path: adminRoutes.systemDbEdit, element: WithAuth(<AdminPages.AdminSystemDbEditPage />)},
      {path: adminRoutes.systemQuery, element: WithAuth(<AdminPages.AdminSystemQueryPage />)},
      {path: adminRoutes.systemUsers, element: WithAuth(<AdminPages.AdminSystemUsersPage />)},
      {path: adminRoutes.addAuthor, element: WithAuth(<AdminPages.AdminAddAuthorPage />)},
      {path: adminRoutes.editAuthor, element: WithAuth(<AdminPages.AdminEditAuthorPage />)},
      {path: adminRoutes.studentAnswers, element: WithAuth(<AdminPages.AdminStudentAnswersPage />)},
      {
        path: adminRoutes.studentAnswersRatingId,
        element: WithAuth(<AdminPages.AdminStudentAnswersRatingIdPage />),
      },
      {
        path: adminRoutes.studentComplaints,
        element: WithAuth(<AdminPages.AdminStudentComplaintsPage />),
      },
      {path: adminRoutes.studentRating, element: WithAuth(<AdminPages.AdminStudentRatingPage />)},
      {path: adminRoutes.taskStatistics, element: WithAuth(<AdminPages.AdminTaskStatisticsPage />)},
      {path: adminRoutes.usersOnline, element: WithAuth(<AdminPages.AdminUsersOnlinePage />)},
      {
        path: adminRoutes.deleteTestForGroup,
        element: WithAuth(<AdminPages.AdminDeleteTestForGroupPage />),
      },
    ]
  }

  return [
    {path: routesPaths.index, index: true, element: <Pages.HomePage />},
    {path: routesPaths.about, element: <Pages.AboutPage />},
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
    ...adminRoutesArr,
    {path: '*', element: <Pages.NotFoundPage />},
  ]
}
