import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function AdminPage() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Phase 2: applicant list, filters, and squad builder coming next.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleSignOut}>
          Sair
        </Button>
      </header>

      <section className="rounded-xl border p-4">
        <p className="text-sm">
          Signed in as <strong>{user?.email}</strong>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          You can read applicants once the list service is wired to Supabase SELECT (authenticated
          RLS).
        </p>
      </section>
    </main>
  )
}
