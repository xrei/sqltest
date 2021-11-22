import {createRequestFx} from './request'
import type {DBInfo, LoginDTO, User} from 'src/types'

// home
export const getSomeNews = createRequestFx<void>('Home/GetSomeNews')
export const getAbout = createRequestFx<void>('Home/GetAbout')
export const getGroupList = createRequestFx<void>('Home/GetGroupList')
export const getMaterials = createRequestFx<void>('Home/GetMaterials')
export const getAvailableSubjects = createRequestFx<{Id: number}>('Home/GetAvailableSubjects')
export const getStudentSuggestions = createRequestFx<{Login: number}>('Home/GetStudentSuggestions')

// admin
export const getAuthors = createRequestFx<void>('Admin/GetAuthors')
export const getDBCreationScripts = createRequestFx<void>('Admin/GetDBCreationScripts')
export const getRegistrationRules = createRequestFx<void, string>('Admin/GetRegistrationRules')
export const getDBInfos = createRequestFx<void, DBInfo[]>('Admin/GetDBInfos')

// auth
export const getUser = createRequestFx<void, User>('Auth/GetUser', 'POST')
export const authLogOn = createRequestFx<LoginDTO, User>('Auth/LogOn', 'POST')
export const authLogOff = createRequestFx<void, void>('Auth/LogOff', 'POST')
