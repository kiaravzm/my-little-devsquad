import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSession, onAuthStateChange, signIn, signOut } from '../services/auth.service'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    getSession()
      .then((session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsInitializing(false)
      })
      .catch((error) => {
        setError(error.message)
        setIsInitializing(false)
      })

    const {
      data: { subscription },
    } = onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsInitializing(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUserOut = async () => {
    await signOut()
    setSession(null)
    setUser(null)
  }

  const signUserIn = async (email: string, password: string) => {
    try {
      setError(null)
      setIsSigningIn(true)
      await signIn(email, password)
    } catch (error) {
      setError((error as Error).message)
      setIsSigningIn(false)
      throw error
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signOut: signUserOut,
        signIn: signUserIn,
        isInitializing,
        isSigningIn,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
