import type { ApplicantFormData, Area, Availability } from './schemas/applicant.schema'

export type { ApplicantFormData, Area, Availability }

export type Applicant = ApplicantFormData & { id: string }
