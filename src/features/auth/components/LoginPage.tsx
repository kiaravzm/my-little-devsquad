import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'

const loginFormSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string('Senha é obrigatória').min(1, 'Senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginFormSchema>
export function LoginPage() {
  const { signIn, isSigningIn, error } = useAuth()
  const navigate = useNavigate()
  const form = useForm<LoginFormData>({
    mode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await signIn(data.email, data.password)
      navigate('/admin')
    } catch {
      console.error('Erro ao entrar: ', error)
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite seu email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite sua senha"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" form="login-form" disabled={isSigningIn}>
            {isSigningIn ? 'Entrando...' : 'Entrar'}
          </Button>
          {error && <p role="alert">Erro ao entrar: {error}</p>}
        </CardFooter>
      </Card>
    </main>
  )
}
