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
