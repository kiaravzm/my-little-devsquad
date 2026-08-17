import type { Applicant } from '@/features/registration/types'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

/** Phase 2: list applicants for the admin dashboard. */
export async function listApplicants(): Promise<Applicant[]> {
  const { data, error } = await supabase
    .from('applicants')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message, { cause: error })

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    gitHub: row.github,
    area: row.area,
    experienceLevel: row.experience_level,
    availability: row.availability,
    currentSkills: row.current_skills,
    desiredSkills: row.desired_skills,
    notes: row.notes ?? undefined,
  }))
}
