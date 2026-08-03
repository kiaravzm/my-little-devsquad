import { z } from 'zod'

const areaSchema = z.enum(['frontend', 'backend', 'fullstack', 'ux', 'other'])

const availabilitySchema = z.enum(['1-5h', '5-10h', '10h+'])
const experienceLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])

export const skillListSchema = z
  .array(z.string().min(1, 'Habilidade não pode ser vazia'))
  .min(1, 'Adicione pelo menos uma habilidade')

export const applicantFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  gitHub: z
    .url()
    .min(1, 'GitHub é obrigatório')
    .refine((v) => /github\.com/i.test(v), 'Deve ser um link do GitHub'),
  experienceLevel: experienceLevelSchema,
  area: areaSchema,
  availability: availabilitySchema,
  currentSkills: skillListSchema,
  desiredSkills: skillListSchema,
  notes: z.string().optional(),
})

export type ApplicantFormData = z.infer<typeof applicantFormSchema>
export type PartialApplicant = Partial<ApplicantFormData>

/** Valores iniciais para `useForm` quando o schema exige array/string e o UI não trata `undefined`. */
export const applicantFormEmptyDefaults: Pick<
  ApplicantFormData,
  'name' | 'currentSkills' | 'desiredSkills' | 'notes' | 'experienceLevel'
> = {
  name: '',
  currentSkills: [],
  desiredSkills: [],
  notes: '',
  experienceLevel: 'beginner',
}

export type Area = z.infer<typeof areaSchema>
export type Availability = z.infer<typeof availabilitySchema>
export type ExperienceLevel = z.infer<typeof experienceLevelSchema>
export { areaSchema, availabilitySchema, experienceLevelSchema }
