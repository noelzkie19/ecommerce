import { useState } from 'react'
import { authService } from '../services/auth.service'

export function useForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const send = async (email: string) => {
    setLoading(true)
    setMessage('')
    try {
      await authService.forgotPassword(email)
      setMessage('Reset email sent! Check your inbox.')
    } catch {
      setMessage('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return { send, loading, message }
}
