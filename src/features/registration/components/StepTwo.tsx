import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import {
  areaSchema,
  experienceLevelSchema,
  type ApplicantFormData,
} from '../schemas/applicant.schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { TagInput } from '@/shared/components/TagInput'
export const StepTwo = ({
  isVisible,
  form,
}: {
  isVisible: boolean
  form: UseFormReturn<ApplicantFormData>
}) => {
  if (!isVisible) return null
  const areaOptions = areaSchema.options.map((area) => ({
    value: area,
    label: area,
  }))

  const experienceLevelOptions = experienceLevelSchema.options.map((experienceLevel) => ({
    value: experienceLevel,
    label: experienceLevel,
  }))

  return (
    <FieldGroup>
      <Controller
        name="area"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-area">
              Em qual área você prefere trabalhar?
            </FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="registration-form-area"
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectSeparator />
                {areaOptions.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="experienceLevel"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-experienceLevel">
              Qual seu nível de experiência?
            </FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="registration-form-experienceLevel"
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectSeparator />
                {experienceLevelOptions.map((experienceLevel) => (
                  <SelectItem key={experienceLevel.value} value={experienceLevel.value}>
                    {experienceLevel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="currentSkills"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-currentSkills">
              Quais habilidades você já possui?
            </FieldLabel>

            <TagInput
              id="registration-form-currentSkills"
              name={field.name}
              ref={field.ref}
              value={field.value ?? []}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={fieldState.invalid}
              placeholder="Digite e pressione Enter ou vírgula"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="desiredSkills"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-desiredSkills">
              Quais habilidades você gostaria de aprender/melhorar?
            </FieldLabel>

            <TagInput
              id="registration-form-desiredSkills"
              name={field.name}
              ref={field.ref}
              value={field.value ?? []}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={fieldState.invalid}
              placeholder="Digite e pressione Enter ou vírgula"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
