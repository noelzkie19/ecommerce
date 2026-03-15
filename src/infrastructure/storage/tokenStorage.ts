const ACCESS_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`
}

const getCookie = (name: string): string | null => {
  if (globalThis.window === undefined) return null
  const match = new RegExp(`(^| )${name}=([^;]+)`).exec(document.cookie)
  return match ? match[2] : null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export const tokenStorage = {
  set: (access: string, refresh: string) => {
    setCookie(ACCESS_KEY, access)
    setCookie(REFRESH_KEY, refresh)
  },
  getAccessToken: (): string | null => getCookie(ACCESS_KEY),
  getRefreshToken: (): string | null => getCookie(REFRESH_KEY),
  clear: () => {
    deleteCookie(ACCESS_KEY)
    deleteCookie(REFRESH_KEY)
  },
}