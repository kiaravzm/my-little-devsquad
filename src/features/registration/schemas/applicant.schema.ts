import { z } from 'zod'

const areaSchema = z.enum(['frontend', 'backend', 'fullstack', 'ux', 'other'])

const availabilitySchema = z.enum(['1-5h', '5-10h', '10h+'])

const skillListSchema = z
  .array(z.string().min(1, 'Habilidade não pode ser vazia'))
  .min(1, 'Adicione pelo menos uma habilidade')

export const applicantFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  area: areaSchema,
  availability: availabilitySchema,
  currentSkills: skillListSchema,
  desiredSkills: skillListSchema,
  notes: z.string().optional(),
})

export type ApplicantFormData = z.infer<typeof applicantFormSchema>
export type PartialApplicant = Partial<ApplicantFormData>

export type Area = z.infer<typeof areaSchema>
export type Availability = z.infer<typeof availabilitySchema>

export { areaSchema, availabilitySchema }
