import type {User} from 'src/types'
import {adminRoutes} from 'src/router/paths'
import {AdminNewsModel} from 'src/features/Admin/'
import {UserModel} from 'src/features/User'

const adminPages = [
  {to: adminRoutes.studentAnswers, text: 'Ответы студентов'},
  {to: adminRoutes.journal, text: 'Журнал'},
  {to: adminRoutes.manageTests, text: 'Тесты', isAdmin: true},
  {to: adminRoutes.groups, text: 'Группы'},
  {to: adminRoutes.students, text: 'Студенты'},
]

const adminEntitiesPages = [
  {to: adminRoutes.systemUsers, text: 'Доступы'},
  {to: adminRoutes.systemDb, text: 'Базы данных'},
  {to: adminRoutes.systemQuery, text: 'Системные запросы'},
  {to: adminRoutes.materials, text: 'Материалы'},
  {to: '#', text: 'Добавить новость', onClick: AdminNewsModel.manageNewsDialogToggled},
  {to: adminRoutes.addAuthor, text: 'Добавить автора'},
  {to: adminRoutes.systemInfo, text: 'Информация для режима студента'},
]

const adminStatsPages = [
  {to: adminRoutes.studentRating, text: 'Рейтинги студентов'},
  {to: adminRoutes.taskStatistics, text: 'Статистика по заданиям', isAdmin: true},
  {to: adminRoutes.usersOnline, text: 'Пользователи онлайн', isAdmin: true},
  {to: adminRoutes.studentComplaints, text: 'Замечания студентов', isAdmin: true},
  {to: '#', text: 'Удаление доступа группы к тесту'},
]

const createAdminNavigation = (user: User) => {
  const isAdmin = user.Role === 2
  const mapRoutes = (xs: any[]) => xs.filter((v) => (isAdmin ? true : !v.isAdmin))

  return {
    adminPages: mapRoutes(adminPages),
    adminEntitiesPages: isAdmin ? adminEntitiesPages : [],
    adminStatsPages: mapRoutes(adminStatsPages),
  }
}

export const $adminNavigationPages = UserModel.$user.map((user) => {
  if (!user)
    return {
      adminPages: [],
      adminEntitiesPages: [],
      adminStatsPages: [],
    }
  return createAdminNavigation(user)
})
