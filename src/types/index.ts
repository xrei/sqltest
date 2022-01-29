export interface LoginDTO {
  Login: string
  Password: string
  RememberMe?: boolean
}

export interface RegisterDTO {
  FIO: string
  Login: string
  Password: string
  RepeatPassword: string
  Group: string
}

export interface User {
  Group: number
  Id: number
  Login: string
  Name: string
  Online: number
  Role: number
}

export interface DBInfo {
  connection_string: string
  creation_script: string
  description: string
  name: string
  id: number
}

export interface StudentGroup {
  GroupNumber: string
  GroupValue: number
  register: boolean
}

export interface Subject {
  SubjectId: number
  SubjectName: string
}

export interface TestTime {
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
export interface Answer {
  Content: string
  Correct: boolean
  Id: number
}
export interface Question {
  Answers: Answer[]
  Category: number
  Content: string
  DatabaseId: number
  /** 0 - easy | 1 - middle | 2 - hard */
  Difficulty: number
  Id: number
  NumInTest: number
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
export interface Test {
  AdditionToAdd: unknown
  Additions: unknown[]
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
  themesList: unknown[]
  valueComplex: number
  valueEasy: number
  valueMiddle: number
  viewCorrectAndRight: number
}

export interface Theme {
  Test: Test
  ThemeId: number
  ThemeName: string
}
