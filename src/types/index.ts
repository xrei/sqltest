export interface LoginDTO {
  Login: string
  Password: string
  RememberMe?: boolean
}

export interface User {
  Group: number
  Id: number
  Login: string
  name: string
  online: number
  role: number
}
