import { apiClient } from './client'
import type { LoginPayload, RegisterPayload, AuthResponse, AuthUser } from '@/types/auth.types'

export const authApi = {
  login: (data: LoginPayload) =>
    apiClient.post<AuthResponse>('/api/auth/login', data),

  register: (data: RegisterPayload) =>
    apiClient.post<AuthResponse>('/api/auth/register', data),

  forgotPassword: (email: string) =>
    apiClient.post('/api/auth/forgot-password', { email }),

  resetPassword: (password: string) =>
    apiClient.post('/api/auth/reset-password', { password }),

  google: (data: { email: string; fullName: string; googleId: string }) =>
    apiClient.post<AuthResponse>('/api/auth/google', data),

  refresh: (refreshToken: string) =>
    apiClient.post<AuthResponse>('/api/auth/refresh', { refreshToken }),

  logout: () => apiClient.post('/api/auth/logout'),

  me: () => apiClient.get<{ user: AuthUser }>('/api/auth/me'),
}
