import ky from 'ky'

const apiUrl = () => {
  const url = import.meta.env.VITE_API_URL as string | undefined
  if (!url)
    throw Error('[ERROR]: VITE_API_URL is not defined. VITE_API_URL must be declared in .env file')
  return url
}

export const api = ky.create({retry: 2})
