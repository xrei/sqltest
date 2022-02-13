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
} from 'src/types'

// home
export const getSomeNews = createRequestFx<void, NewsPost[]>('Home/GetSomeNews')
export const getAbout = createRequestFx<void, string>('Home/GetAbout')
export const getGroupList = createRequestFx<void, StudentGroup[]>('Home/GetGroupList')
export const getStudentSuggestions = createRequestFx<{Login: number}>('Home/GetStudentSuggestions')
export const getMaterials = createRequestFx<void>('Home/GetMaterials')
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
export const getUserRatings = createRequestFx<{StuId: number; TestId: number}, TestResult[]>(
  'Home/GetUserRatings',
  'GET',
  true
)
export const getStudentsGroupsRatings = createRequestFx<{userId: number; subjId: number}>(
  'Prep/GetStudentsGroupsRatings',
  'GET',
  true
)

// admin
export const getAuthors = createRequestFx<void, Author[]>('Admin/GetAuthors')
export const getDBCreationScripts = createRequestFx<void>('Admin/GetDBCreationScripts')
export const getRegistrationRules = createRequestFx<void, string>('Admin/GetRegistrationRules')
export const getDBInfos = createRequestFx<void, DBInfo[]>('Admin/GetDBInfos')
export const getAdminGroups = createRequestFx<void, StudentGroup[]>('Admin/GetAdminGroups')

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
