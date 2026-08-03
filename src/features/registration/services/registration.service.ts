import type { ApplicantFormData } from '../types'
import type { ApiResponse } from '@/shared/types/common'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
export const saveApplicant = async (
  formData: ApplicantFormData,
): Promise<ApiResponse<ApplicantFormData & { id: string }>> => {
  try {
    const { data, error } = await supabase.from('applicants').insert({
      name: formData.name,
      github: formData.gitHub,
      experience_level: formData.experienceLevel,
      area: formData.area,
      availability: formData.availability,
      current_skills: formData.currentSkills,
      desired_skills: formData.desiredSkills,
      notes: formData.notes,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    throw new Error('Error saving applicant: ' + (error as Error).message, {
      cause: error,
    })
  }
}
