import {createRequestFx} from './request'

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
export const getRegistrationRules = createRequestFx<void>('Admin/GetRegistrationRules')
export const getDBInfos = createRequestFx<void>('Admin/GetDBInfos')

// auth
export const getUser = createRequestFx<void>('Auth/GetUser', 'POST')
