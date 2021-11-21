import {createRequestFx} from './request'
import type {LoginDTO, User} from 'src/types'

// home
export const getSomeNews = createRequestFx('Home/GetSomeNews')
export const getAbout = createRequestFx('Home/GetAbout')
export const getGroupList = createRequestFx('Home/GetGroupList')
export const getMaterials = createRequestFx('Home/GetMaterials')
export const getAvailableSubjects = createRequestFx<{Id: number}>('Home/GetAvailableSubjects')
export const getStudentSuggestions = createRequestFx<{Login: number}>('Home/GetStudentSuggestions')

// admin
export const getAuthors = createRequestFx('Admin/GetAuthors')
export const getDBCreationScripts = createRequestFx('Admin/GetDBCreationScripts')
export const getRegistrationRules = createRequestFx('Admin/GetRegistrationRules')
export const getDBInfos = createRequestFx('Admin/GetDBInfos')

// auth
export const getUser = createRequestFx<void, User>('Auth/GetUser', 'POST')
export const authLogOn = createRequestFx<LoginDTO, User>('Auth/LogOn', 'POST')
export const authLogOff = createRequestFx<void, void>('Auth/LogOff', 'POST')
