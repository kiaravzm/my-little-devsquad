import { createClient } from '@/lib/supabase/client'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

const supabase = createClient()
export const signIn = async (email: string, password: string): Promise<Session> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message, { cause: error })
  if (!data.session) throw new Error('Sessão não retornada')
  return data.session
}

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut()
}

export const getSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw new Error(error.message, { cause: error })
  return data.session
}
export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) => {
  return supabase.auth.onAuthStateChange(callback)
}
