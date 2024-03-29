import React from 'react'

const createLazyAdminPages = () => {
  const pages = {
    AdminManageStudentsPage: React.lazy(() => import('src/pages/admin/manage-students')),
    AdminJournalPage: React.lazy(() => import('src/pages/admin/journal')),
    AdminManageGroupsPage: React.lazy(() => import('src/pages/admin/manage-groups')),
    AdminSystemDbPage: React.lazy(() => import('src/pages/admin/system-db')),
    AdminSystemDbAddPage: React.lazy(() => import('src/pages/admin/system-db/add')),
    AdminSystemDbEditPage: React.lazy(() => import('src/pages/admin/system-db/_id/edit')),
    AdminSystemQueryPage: React.lazy(() => import('src/pages/admin/system-query')),
    AdminSystemUsersPage: React.lazy(() => import('src/pages/admin/system-users')),
    AdminAddAuthorPage: React.lazy(() => import('src/pages/admin/author/add')),
    AdminEditAuthorPage: React.lazy(() => import('src/pages/admin/author/_id/edit')),
    AdminStudentComplaintsPage: React.lazy(() => import('src/pages/admin/student-complaints')),
    AdminStudentAnswersPage: React.lazy(() => import('src/pages/admin/student-answers')),
    AdminStudentAnswersRatingIdPage: React.lazy(
      () => import('src/pages/admin/student-answers/_ratingId')
    ),
    AdminStudentRatingPage: React.lazy(() => import('src/pages/admin/student-rating')),
    AdminTaskStatisticsPage: React.lazy(() => import('src/pages/admin/task-statistics')),
    AdminUsersOnlinePage: React.lazy(() => import('src/pages/admin/users-online')),
    AdminDeleteTestForGroupPage: React.lazy(() => import('src/pages/admin/delete-test-for-group')),
    AdminTestsPage: React.lazy(() => import('src/pages/admin/tests')),
    AdminSubjectAddPage: React.lazy(() => import('src/pages/admin/tests/add')),
    AdminSubjectIdPage: React.lazy(() => import('src/pages/admin/tests/_subjId')),
    AdminSubjectIdEditPage: React.lazy(() => import('src/pages/admin/tests/_subjId/edit')),
    AdminTestsQuestionsThemeIdPage: React.lazy(
      () => import('src/pages/admin/tests/_subjId/questions/_themeId')
    ),
    AdminThemeAddPage: React.lazy(() => import('src/pages/admin/tests/theme/add')),
    AdminThemeIdEditPage: React.lazy(() => import('src/pages/admin/tests/_subjId/theme/_id/edit')),
    AdminTestsTestAddPage: React.lazy(() => import('src/pages/admin/tests/test/add')),
    AdminTestsTestIdEditPage: React.lazy(() => import('src/pages/admin/tests/test/_testId/edit')),
    AdminTestsTaskAddPage: React.lazy(() => import('src/pages/admin/tests/task/add')),
    AdminTestsTaskIdEditPage: React.lazy(() => import('src/pages/admin/tests/task/_taskId/edit')),
  }
  return pages
}

export {createLazyAdminPages}
