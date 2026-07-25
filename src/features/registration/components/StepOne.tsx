import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import type { ApplicantFormData } from '../schemas/applicant.schema'
import { Link } from 'react-router-dom'
export const StepOne = ({
  isVisible,
  form,
}: {
  isVisible: boolean
  form: UseFormReturn<ApplicantFormData>
}) => {
  if (!isVisible) return null
  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-name">Qual o seu nome?</FieldLabel>
            <Input
              {...field}
              id="registration-form-name"
              aria-invalid={fieldState.invalid}
              placeholder="Digite seu nome"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="gitHub"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-gitHub">Qual o link do seu GitHub?</FieldLabel>
            <Input
              {...field}
              id="registration-form-gitHub"
              aria-invalid={fieldState.invalid}
              placeholder="Cole aqui seu link do GitHub"
              autoComplete="off"
            />
            <FieldDescription>
              O link do seu GitHub é pra que eu já possa te inclur no time. Não tem ainda? Corre e
              cria uma conta{' '}
              <a href="https://github.com" target="_blank">
                aqui{' '}
              </a>{' '}
              rapidinho.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
