import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { availabilitySchema, type ApplicantFormData } from '../schemas/applicant.schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
export const StepThree = ({
  isVisible,
  form,
}: {
  isVisible: boolean
  form: UseFormReturn<ApplicantFormData>
}) => {
  if (!isVisible) return null

  const availabilityOptions = Object.values(availabilitySchema.enum).map((availability) => ({
    value: availability,
    label: availability.charAt(0).toUpperCase() + availability.slice(1),
  }))
  return (
    <FieldGroup>
      <Controller
        name="availability"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="registration-form-availability">
              Em qual disponibilidade você prefere trabalhar?
            </FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="form-rhf-select-language"
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectSeparator />
                {availabilityOptions.map((availability) => (
                  <SelectItem key={availability.value} value={availability.value}>
                    {availability.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="notes"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-description">
              O que mais você gostaria de compartilhar? Outra skills que você gostaria de aprender?
              Outra skills que você gostaria de ensinar?
            </FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="registration-form-notes"
                placeholder="O que você gostaria de compartilhar? Outra skills que você gostaria de aprender/compartilhar?"
                rows={6}
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {field.value?.length ?? 0}/100 characters
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Fique a vontade para compartilhar sobre sua experiência e o que você gostaria de
              construir com a gente.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
