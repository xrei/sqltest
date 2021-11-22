export interface LoginDTO {
  Login: string
  Password: string
  RememberMe?: boolean
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
