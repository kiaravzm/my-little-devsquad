import type { User, Session } from '@supabase/supabase-js'
import { createContext } from 'react'

interface AuthContextType {
  user: User | null
  session: Session | null
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  isInitializing: boolean
  isSigningIn: boolean
  error: string | null
  setError: (error: string | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
