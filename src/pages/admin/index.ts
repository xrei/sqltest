import React from 'react'

const createLazyAdminPages = () => {
  const pages = {
    AdminManageStudentsPage: React.lazy(() => import('src/pages/admin/manage-students')),
    AdminJournalPage: React.lazy(() => import('src/pages/admin/journal')),
    AdminManageGroupsPage: React.lazy(() => import('src/pages/admin/manage-groups')),
    AdminManageTestsPage: React.lazy(() => import('src/pages/admin/manage-tests')),
    AdminSystemDbPage: React.lazy(() => import('src/pages/admin/system-db')),
    AdminSystemDbAddPage: React.lazy(() => import('src/pages/admin/system-db/add')),
    AdminSystemDbEditPage: React.lazy(() => import('src/pages/admin/system-db/_id/edit')),
    AdminSystemQueryPage: React.lazy(() => import('src/pages/admin/system-query')),
    AdminSystemUsersPage: React.lazy(() => import('src/pages/admin/system-users')),
    AdminSystemInfosPage: React.lazy(() => import('src/pages/admin/system-info')),
    AdminAddAuthorPage: React.lazy(() => import('src/pages/admin/author/add')),
    AdminEditAuthorPage: React.lazy(() => import('src/pages/admin/author/_id/edit')),
  }
  return pages
}

export {createLazyAdminPages}
