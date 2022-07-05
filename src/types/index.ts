export type LoginDTO = {
  Login: string
  Password: string
  RememberMe?: boolean
}

export type RegisterDTO = {
  FIO: string
  Login: string
  Password: string
  RepeatPassword: string
  Group: string
}

export type User = {
  Group: number
  Id: number
  Login: string
  Name: string
  Online: number
  Role: number
}

export type DBInfo = {
  connection_string: string
  creation_script: string
  description: string
  name: string
  id: number
}

export type AddDbDto = {
  name: string
  connection_string: string
  creation_script?: string
  description?: string
}

export type EditDbDto = AddDbDto & {id: number}

export type Student = {
  FIO: string
  creationDate: string
  creationDateTime: string
  groupId: number
  groupName: string
  id: number
  stu_activity: string
  stu_test: string
  suggest_questions: boolean
}

export type StudentDto = {
  FIO: string
  groupId: string
  id?: number
}

export type StudentGroup = {
  GroupNumber: string
  GroupValue: number
  register: boolean
}

export type NewGroupDto = {
  GroupValue?: number
  GroupNumber: string
  register?: boolean
}

export type Subject = {
  SubjectId: number
  SubjectName: string
  UserId?: number | boolean
}

export type TestTime = {
  Days: number
  Hours: number
  Milliseconds: number
  Minutes: number
  Seconds: number
  Ticks: number
  TotalDays: number
  TotalHours: number
  TotalMilliseconds: number
  TotalMinutes: number
  TotalSeconds: number
}
export type Answer = {
  Content: string
  Correct: boolean
  Id: number
}
export type Question = {
  Answers: Answer[]
  Category: number
  Content: string
  DatabaseId: number
  /** 0 - easy | 1 - middle | 2 - hard */
  Difficulty: number
  Id: number
  NumInTest: number
  SubjectId: number
  ThemeId: number
  ThemeName: string | null
  /** Type of task
   *
   * 0 - Множественный выбор
   *
   * 1 - Одиночный выбор
   *
   * 2 - Да \ нет
   *
   * 3 - Точный ответ
   *
   * 4 - SQL-Запрос (чтение)
   *
   * 5 - SQL-Запрос (определение данных)
   *
   * 6 - SQL-Запрос (модификация данных)
   *
   * 7 - MongoDB (чтение)
   *
   * 8 - Neo4j (чтение)
   */
  Type: number
  UserAnswer: boolean | string | null
}
export type Addition = {
  Id: number
  Content: string
}
export type Test = {
  AdditionToAdd: unknown
  Additions: Addition[]
  /** Заданий в тесте */
  QsnCount: number
  Questions: Question[]
  StartTime: string
  /** Всего попыток тестирования */
  TestCount: number
  TestDescription: string
  TestHelp: string | null
  TestId: number
  TestName: string
  TestTime: TestTime
  /** Время тестирования */
  TestTimeFromDB: number
  TestType: number
  ViewCorrect: boolean
  ViewRight: boolean
  addingNewTestCountComplex: number
  addingNewTestCountEasy: number
  addingNewTestCountMiddle: number
  appointmentsForCurrentTest: unknown[]
  perc2: number
  perc3: number
  perc4: number
  perc5: number
  subjId: number
  themeId: number
  themeName: string
  themesList: unknown[] | null
  valueCan: number
  valueComplex: number
  valueEasy: number
  valueKnow: number
  valueMiddle: number
  valueOwn: number
  viewCorrectAndRight: number
}

export type TestResult = {
  ErrorQsn: string[]
  AnswerCount: number
  CountRightAnswers: number
  Mark: number
  RatingId: number
  TimeEnd: number | null
  TimeStart: number | null
  countComplex: number
  countEasy: number
  countMiddle: number
  countUser: number
  percent: number
}

export type Theme = {
  Test: Test
  ThemeId: number
  ThemeName: string
}

export type DBTableContent = {
  Content: Array<string[]>
  Header: string[]
  HeaderCount: number
  Name: string
  TotalRowsCount: number
}

export type Author = {
  AuthorDescription: string
  AuthorId: number
  AuthorImage: string
  AuthorName: string
}

export type NewsPost = {
  Id: number
  Content: string
  NewsDate: string
}

export type StudRating = {
  avgMark: number
  stuFIO: string
  testCount: number
}

export type MaterialArticle = {
  Id: number
  Content?: string
  Directory?: string
  Description: string
  Name: string
  SubjectId?: number
}

export type MaterialLink = {Id: number; Name: string; Description: string; SubjectId: number}
export type MaterialLinkDTO = {id: number; name: string; description: string; subjectId: number}

export type Material = {
  SubjId: number
  Description: string
  ListOfArticles: MaterialArticle[]
  ListOfLinks: MaterialLink[]
  SubjName: string
}

export type QueryPreset = {
  ID?: number
  Name?: string
  Query: string
}

export type SystemUser = {
  id: number
  role: number
  user_name: string
  login?: string
  password?: string
  repeat_password?: string
}

export type SystemUsers = {
  administrators: SystemUser[]
  groups: StudentGroup[]
  students: SystemUser[]
  teachers: SystemUser[]
  subjects: Subject[]
}

export type SystemUserDto = Partial<SystemUser>

export type NewSystemUserDto = {
  groups: {GroupValue: number; register: boolean}[]
  subjects: {SubjectId: number; UserId: boolean}[]
  user: SystemUserDto
}

export type SystemInfo = {
  name: string
  info: string
}

export type JournalData = {
  avgMark: number
  stuFIO: string
  testCount: number
  themeName: string
}

export type StudentsRatings = {
  AnswerCount: number
  CountRightAnswers: number
  ErrorQsn: any
  Mark: number
  RatingId: number
  TimeEnd: string
  TimeStart: string
  countComplex: number
  countEasy: number
  countMiddle: number
  countUser: number
  percent: number
  studentRatingId: number
}

export type StudentRating = {
  BestMark: number
  RatingCount: number
  StudentsFIO: string
  StudentsRatings: StudentsRatings[]
  id: number
}

export type GetStudentRatingParams = {StuId: number; TestId: number}

export type RatingQnA = {
  AnswersText: string[]
  IsRight: boolean
  QsnDifficulty: string
  QsnID: number
  QsnType: string
  QsnTypeId: number
  QuestionText: string
  QsnCategory: string
  RatingId: number
  StudentName: string
  SystemAnswersText: string[]
  ThemeName: string
}

export type QuestionStats = {
  countInThemesQsn: number
  discriminate_coefficient: number
  easy_coefficient: number
  exit_difficulty: string
  group_id: string | null
  hard_coefficient: number
  qsn_id: number
  qsn_type: number
  standart_deviation: number
}

export type UserOnline = {
  FIO: string
  groupName: string
  creationDate: string
}

export type AdminTest = Test

export type AdminTheme = {
  Availible: boolean
  Description: string
  ThemeId: number
  ThemeName: string
  ThemeSubjId: number
  ThemeTests: AdminTest[]
}

export type AdminSubject = {
  Availible: boolean
  Description: string
  SubjId: number
  SubjName: string
  ThemesList: AdminTheme[]
}

export type SubjectDTO = {
  Description: string
  SubjId?: number
  SubjName: string
}

export type ThemeDTO = {
  Description: string
  ThemeId?: number
  ThemeName: string
  ThemeSubjId: number | string
}

export type AdminAddTaskDTO = {
  Answers: Omit<Answer, 'Id'>[]
  Category: string | number
  Content: string
  Difficulty: string | number
  NumInTest: string | number
  SubjectId: string | number
  Type: string | number
}
