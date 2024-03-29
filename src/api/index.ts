import {createRequestFx} from './request'
import type {
  DBInfo,
  LoginDTO,
  User,
  StudentGroup,
  RegisterDTO,
  Subject,
  Theme,
  Test,
  Author,
  DBTableContent,
  NewsPost,
  TestResult,
  StudRating,
  Material,
  MaterialArticle,
  QueryPreset,
  NewGroupDto,
  Student,
  StudentDto,
  EditDbDto,
  AddDbDto,
  SystemUsers,
  NewSystemUserDto,
  SystemInfo,
  JournalData,
  StudentRating,
  GetStudentRatingParams,
  RatingQnA,
  QuestionStats,
  UserOnline,
  AdminSubject,
  Question,
  SubjectDTO,
  ThemeDTO,
  AdminAddTaskDTO,
  Answer,
  MaterialLinkDTO,
} from 'src/types'

// home
export const getSomeNews = createRequestFx<void, NewsPost[]>('Home/GetSomeNews')
export const getAbout = createRequestFx<void, string>('Home/GetAbout')
export const getGroupList = createRequestFx<void, StudentGroup[]>('Home/GetGroupList')
export const getStudentSuggestions = createRequestFx<{Login: number}>('Home/GetStudentSuggestions')
export const getMaterials = createRequestFx<void, Material[]>('Home/GetMaterials')
export const getAvailableSubjects = createRequestFx<{Id: number}, Subject[]>(
  'Home/GetAvailibleSubjects/',
  'GET',
  true
)
export const getThemeList = createRequestFx<{SubjectId: number; UserId: number}, Theme[]>(
  'Home/GetThemeList',
  'GET',
  true
)
export const getTestContent = createRequestFx<Theme, Test>('Home/GetTestContent', 'POST')
export const getDBContent = createRequestFx<{Id: number}, DBTableContent[]>(
  'Home/GetDBContent',
  'GET',
  true
)
export const getCompleteBasicQuery = createRequestFx<{Id: number}, DBTableContent[]>(
  'Home/CompleteBasicQuery',
  'GET',
  true
)
export const getCompleteUserQuery = createRequestFx<
  {Id: number; UserAnswer: string},
  DBTableContent[]
>('Home/CompleteUserQuery', 'GET', true)
export const saveTestResult = createRequestFx<Test, TestResult>('Home/SaveTestResult', 'POST')
export const getUserRatings = createRequestFx<{StuId: number; TestId: string}, TestResult[]>(
  'Home/GetUserRatings',
  'GET',
  true
)

export const getRA = createRequestFx<{Id: number}, string[]>('Home/GetRightAnswer', 'GET', true)

// admin
export const getAuthors = createRequestFx<void, Author[]>('Admin/GetAuthors')
export const getDBCreationScripts = createRequestFx<void>('Admin/GetDBCreationScripts')
export const getRegistrationRules = createRequestFx<void, string>('Admin/GetRegistrationRules')
export const postAddGroup = createRequestFx<NewGroupDto, string>('Admin/AddGroup', 'POST')
export const postDeleteGroup = createRequestFx<{GroupValue: number}, string>(
  'Admin/DeleteGroup',
  'POST'
)
export const postEditGroup = createRequestFx<NonNullable<NewGroupDto>, string>(
  'Admin/EditGroup',
  'POST'
)
export const getQueryPresets = createRequestFx<void, QueryPreset[]>('Admin/GetQueryPresets')
export const postExecQueryPresets = createRequestFx<
  {ID?: number; Name?: string; Query: string},
  DBTableContent[]
>('Admin/ExecuteQueryPreset', 'POST')
export const postAddQueryPreset = createRequestFx<QueryPreset, string>(
  'Admin/AddQueryPreset',
  'POST'
)
export const postDeleteQueryPreset = createRequestFx<QueryPreset, string>(
  'Admin/DeleteQueryPreset',
  'POST'
)
export const getStudentsForGroup = createRequestFx<{GroupValue: number}, Student[]>(
  'Admin/GetStudentsForGroup',
  'GET',
  true
)

export const getAdminGroups = createRequestFx<void, StudentGroup[]>('Admin/GetAdminGroups')
export const postDeleteStudent = createRequestFx<{id: number}, string>(
  'Admin/DeleteStudent',
  'POST'
)
export const postEditStudent = createRequestFx<NonNullable<StudentDto>, string>(
  'Admin/EditStudent',
  'POST'
)
export const postAddAdminStudent = createRequestFx<{FIO: string; groupId: number}, string>(
  'Admin/AddAdminStudent',
  'POST'
)
export const postChangeSuggestAbility = createRequestFx<{id: number}, string>(
  'Admin/ChangeSuggestionAbility',
  'POST'
)

export const getDBInfos = createRequestFx<void, DBInfo[]>('Admin/GetDBInfos')
export const getAdminDBContent = createRequestFx<{id: number}, DBTableContent[]>(
  'Admin/GetAdminDBContent',
  'GET',
  true
)
export const postAddDatabase = createRequestFx<AddDbDto, string>('Admin/AddDatabase', 'POST')
export const postEditDatabase = createRequestFx<EditDbDto, string>('Admin/EditDatabase', 'POST')
export const postDeleteDatabase = createRequestFx<{id: number}, string>(
  'Admin/DeleteDatabase',
  'POST'
)

export const getSystemUsers = createRequestFx<void, SystemUsers>('Admin/GetSystemUsers')
export const postDeleteSystemUser = createRequestFx<{user: {id: number}}, string>(
  'Admin/DeleteSystemUser',
  'POST'
)
export const postAddSystemUser = createRequestFx<NonNullable<NewSystemUserDto>, string>(
  'Admin/AddSystemUser',
  'POST'
)
export const postEditSystemUser = createRequestFx<NonNullable<NewSystemUserDto>, string>(
  'Admin/EditSystemUser',
  'POST'
)
export const getSystemInfos = createRequestFx<void, SystemInfo[]>('Admin/GetSystemInfos')
export const editSystemInfo = createRequestFx<SystemInfo, string>('Admin/EditSystemInfo', 'POST')
export const deleteSystemInfo = createRequestFx<SystemInfo, string>(
  'Admin/DeleteSystemInfo',
  'POST'
)

export const editAuthor = createRequestFx<Author, string>('Admin/EditAuthor', 'POST')
export const addAuthor = createRequestFx<Omit<Author, 'AuthorId'>, string>(
  'Admin/AddAuthor',
  'POST'
)
export const deleteAuthor = createRequestFx<{AuthorId: number}, string>(
  'Admin/DeleteAuthor',
  'POST'
)

export const getStudentsGroupsRatings = createRequestFx<
  {userId: number; subjId: string},
  StudRating[]
>('Prep/GetStudentsGroupsRatings', 'GET', true)

export const getArticle = createRequestFx<{Id: number}, MaterialArticle>(
  'Admin/GetArticle',
  'GET',
  true
)

export const getAdminJournal = createRequestFx<{groupId: string; subjId: string}, JournalData[]>(
  'Admin/GetCorrectJournalModal',
  'GET',
  true
)
export const getAdminSubjects = createRequestFx<{Id: number}, Subject[]>(
  'Admin/GetAdminSubjects',
  'GET',
  true
)
export const getPrepSubjects = createRequestFx<{Id: number}, Subject[]>(
  'Prep/GetAdminSubjects',
  'GET',
  true
)

export const getTaskErrors = createRequestFx<{Query: string}, DBTableContent[]>(
  'Admin/GetTaskErrors',
  'POST'
)

export const getAdminTheme = createRequestFx<{SubjectId: number}, Theme[]>(
  'Admin/GetAdminTheme',
  'GET',
  true
)
export const getPrepTheme = createRequestFx<{SubjectId: number}, Theme[]>(
  'Prep/GetAdminTheme',
  'GET',
  true
)
export const getAdminTest = createRequestFx<{ThemeId: number}, Test[]>(
  'Admin/GetAdminTest',
  'GET',
  true
)
export const getPrepTest = createRequestFx<{ThemeId: number}, Test[]>(
  'Prep/GetAdminTest',
  'GET',
  true
)

export const getPrepGroupRating = createRequestFx<GetStudentRatingParams, StudentRating[]>(
  'Prep/GetGroupRatings',
  'GET',
  true
)
export const getAdminGroupRating = createRequestFx<GetStudentRatingParams, StudentRating[]>(
  'Admin/GetGroupRatings',
  'GET',
  true
)
export const deleteAdminGroupRating = createRequestFx<{RatingId: number}, string>(
  'Admin/DeleteRating',
  'POST'
)
export const reCalcAdminGroupRating = createRequestFx<{RatingId: number}, string>(
  'Admin/ReCalcRating',
  'POST'
)

export const deleteAdminNews = createRequestFx<{Id: number}, string>('Admin/DeleteNews', 'POST')
export const editAdminNews = createRequestFx<{Id: number; Content: string}, string>(
  'Admin/EditNews',
  'POST'
)
export const createAdminNews = createRequestFx<{Content: string}, string>(
  'Admin/CreateNews',
  'POST'
)

export const getAdminUserQnA = createRequestFx<{RatingId: number}, RatingQnA[]>(
  'Admin/GetUserQnA',
  'GET',
  true
)

export const adminGetQuestionsByTheme = createRequestFx<{ThemeId: number | string}, Question[]>(
  'Admin/GetQuestionsForTheme',
  'GET',
  true
)

export const adminGetQsnStats = createRequestFx<{Id: number | string}, QuestionStats>(
  'Admin/GetQsnStats',
  'GET',
  true
)

export const adminGetAllQsnStats = createRequestFx<{ThemeId: number | string}, QuestionStats[]>(
  'Admin/GetAllQsnStats',
  'GET',
  true
)
export const adminGetAllQsnStatsGroupOne = createRequestFx<
  {
    themeId: number | string
    groupId: number | string
  },
  QuestionStats[]
>('Admin/GetAllQsnStatsGroupOne', 'GET', true)

export const adminGetGroupsRatings = createRequestFx<
  {subjId: string | number; groupId: string | number},
  StudRating[]
>('Admin/GetAdminGroupsRatings', 'GET', true)

export const adminGetGroupsRatingsSuccess = createRequestFx<
  {subjId: string | number; groupId: string | number},
  StudRating[]
>('Admin/GetAdminGroupsRatingsSuccess', 'GET', true)

export const adminGetGroupsThemeRatings = createRequestFx<
  {
    themeId: number | string
    groupId: number | string
  },
  StudRating[]
>('Admin/GetAdminGroupsThemeRatings', 'GET', true)

export const adminGetAllUsersOnline = createRequestFx<void, UserOnline[]>('Admin/GetAllUsersOnline')
export const adminDeleteUserOnline = createRequestFx<void, string>('Admin/DeleteUserOnline', 'POST')

export const adminDeleteGroupForTest = createRequestFx<
  {
    themeId: number | string
    groupId: number | string
  },
  string
>('Admin/DeleteGroupForTest', 'POST')

// admin subjects
export const getAdminTestsList = createRequestFx<void, AdminSubject[]>('Admin/GetTests')
export const adminChangeSubjectActivity = createRequestFx<{SubjId: number}, string>(
  'Admin/ChangeSubjectActivity',
  'GET',
  true
)
export const adminChangeThemeActivity = createRequestFx<{ThemeId: number}, string>(
  'Admin/ChangeThemeActivity',
  'GET',
  true
)
export const adminAddSubject = createRequestFx<SubjectDTO, string>('Admin/AddSubject', 'POST')
export const adminEditSubject = createRequestFx<SubjectDTO, string>(
  'Admin/ChangeSubjectInfo',
  'POST'
)

export const adminAddTheme = createRequestFx<ThemeDTO, string>('Admin/AddTheme', 'POST')
export const adminEditTheme = createRequestFx<ThemeDTO, string>('Admin/EditTheme', 'POST')

export const adminDeleteSubject = createRequestFx<{SubjId: number}, string>(
  'Admin/DeleteSubject',
  'GET',
  true
)
export const adminDeleteTheme = createRequestFx<{ThemeId: number}, string>(
  'Admin/DeleteTheme',
  'GET',
  true
)
export const adminDeleteTest = createRequestFx<{TestId: number}, string>('Admin/DeleteTest', 'POST')

// questions

export const adminGetQuestionsWithWrongAnswers = createRequestFx<{ThemeId: number}, Question[]>(
  'Admin/GetQuestionsWithWrongAnswers',
  'GET',
  true
)
export const adminGetQuestionsWithWrongAnswersMongoDB = createRequestFx<{ThemeId: number}, string>(
  'Admin/GetQuestionsWithWrongAnswersMongoDB'
)

export const adminCopyThemeQuestions = createRequestFx<
  {ThemeId: number; ThemeName: number},
  string
>('Admin/CopyThemeQuestions', 'POST')
export const adminCopyThemeAllQuestions = createRequestFx<
  {ThemeId: number; ThemeName: number},
  string
>('Admin/CopyThemeAllQuestions', 'POST')

export const adminCopyTaskToOtherTheme = createRequestFx<Question, string>(
  'Admin/CopyTaskToOtherTheme',
  'POST'
)

export const adminDeleteQuestion = createRequestFx<{Id: number}, string>(
  'Admin/DeleteQuestion',
  'POST'
)

export const adminGetCountQuestionsForThemeCategory = createRequestFx<{ThemeId: string}, number[]>(
  'Admin/GetCountQuestionsForThemeCategory',
  'GET',
  true
)
export const adminGetCountQuestionsForTheme = createRequestFx<{ThemeId: string}, number[]>(
  'Admin/GetCountQuestionsForTheme',
  'GET',
  true
)
export const adminGetQuestion = createRequestFx<{QsnId: string | number}, Question>(
  'Admin/GetQuestion',
  'GET',
  true
)
export const adminAddQuestion = createRequestFx<AdminAddTaskDTO, string>(
  'Admin/AddQuestion',
  'POST'
)
export const adminEditQuestion = createRequestFx<AdminAddTaskDTO, string>(
  'Admin/EditQuestion',
  'POST'
)
export const adminEditAnswer = createRequestFx<Answer, string>('Admin/EditAnswer', 'POST')

export const adminGetResultForTaskToAdd = createRequestFx<
  {DatabaseId: string; Type: string; UserAnswer: string},
  DBTableContent[]
>('Admin/GetResultForTaskToAdd', 'GET', true)

export const adminCreateTest = createRequestFx<any, string>('Admin/AddTestNew', 'POST')

export const adminEditAbout = createRequestFx<{Content: string}, string>('Admin/EditAbout', 'POST')

export const adminEditLink = createRequestFx<MaterialLinkDTO, string>('Admin/EditLink', 'POST')
export const adminAddLink = createRequestFx<MaterialLinkDTO, string>('Admin/AddLink', 'POST')
export const adminDeleteLink = createRequestFx<{Id: number}, string>('Admin/DeleteLink', 'POST')
export const prepEditLink = createRequestFx<MaterialLinkDTO, string>('Prep/EditLink', 'POST')
export const prepAddLink = createRequestFx<MaterialLinkDTO, string>('Prep/AddLink', 'POST')
export const prepDeleteLink = createRequestFx<{Id: number}, string>('Prep/DeleteLink', 'POST')

// auth
export const getUser = createRequestFx<void, User>('Auth/GetUser', 'POST')
export const authLogOn = createRequestFx<LoginDTO, User>('Auth/LogOn', 'POST')
export const authLogOff = createRequestFx<void, void>('Auth/LogOff', 'POST')
export const authRegister = createRequestFx<RegisterDTO, User>('Auth/Register', 'POST')

type sendErrorMessageWithInfoPayload = {
  ErrorMessage: string
  QuestionId: number
  StuId: number
  TestId: number
}
export const sendErrorMessageWithInfo = createRequestFx<sendErrorMessageWithInfoPayload, string>(
  'Home/SendErrorMessageWithInfo',
  'GET',
  true
)
