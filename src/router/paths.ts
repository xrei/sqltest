export const adminRoutes = {
  manageTests: '/admin/manage-tests',
  groups: '/admin/manage-groups',
  students: '/admin/manage-students',
  journal: '/admin/journal',
  systemUsers: '/admin/system-users',
  systemQuery: '/admin/system-query',
  systemDb: '/admin/system-db',
  systemDbAdd: '/admin/system-db/add',
  systemDbEdit: '/admin/system-db/:id/edit',
  materials: '/admin/materials',
  addAuthor: '/admin/author/add',
  editAuthor: '/admin/author/:id/edit',
  systemInfo: '/admin/system-info/',
  studentAnswers: '/admin/student-answers',
  studentAnswersRatingId: '/admin/student-answers/:ratingId',
  studentComplaints: '/admin/student-complaints',
  studentRating: '/admin/student-rating',
}

export const routesPaths = {
  index: '/',
  about: '/about',
  materials: '/materials',
  materialId: '/materials/:id',
  news: '/news',
  authors: '/authors',
  dbinfos: '/dbinfos',
  tasks: '/tasks',
  themeId: '/tasks/:themeId',
  tasksResult: '/tasks/result',
  profile: '/profile',
  profileInfo: '/profile/info',
  profileMyResults: '/profile/my-results',
  profileStudentsRating: '/profile/students-rating',
}
