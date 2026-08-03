import type {
  ApplicantFormData,
  Area,
  Availability,
  ExperienceLevel,
} from './schemas/applicant.schema'

export type { ApplicantFormData, Area, Availability, ExperienceLevel }

export type Applicant = ApplicantFormData & { id: string }
