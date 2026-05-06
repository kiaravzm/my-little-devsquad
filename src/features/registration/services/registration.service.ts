import type { ApplicantFormData } from '../types'
import type { ApiResponse } from '@/shared/types/common'

export const saveApplicant = async (
  data: ApplicantFormData,
): Promise<ApiResponse<ApplicantFormData & { id: string }>> => {
  try {
    const response = await fetch('/api/applicants', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  } catch (error) {
    return { data: null, error: 'Error saving applicant: ' + (error as Error).message }
  }
}
