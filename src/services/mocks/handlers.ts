import { http, HttpResponse } from 'msw'
import { applicantFormSchema } from '@/features/registration/schemas/applicant.schema'
import type { Applicant } from '@/features/registration/types'

/** Sobrescreve o POST com 500: `server.use(applicantsPostInternalErrorHandler)` */
export const applicantsPostInternalErrorHandler = http.post(
  '/api/applicants',
  () =>
    HttpResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
)

export const handlers = [
  http.post('/api/applicants', async ({ request }) => {
    const body: unknown = await request.json()
    console.log('[MSW] intercepted POST /api/applicants:', body)

    const parsed = applicantFormSchema.safeParse(body)
    if (!parsed.success) {
      return HttpResponse.json(
        { message: 'Dados inválidos', issues: parsed.error.flatten() },
        { status: 422 }
      )
    }

    const applicant: Applicant = {
      ...parsed.data,
      id: crypto.randomUUID(),
    }
    return HttpResponse.json(applicant, { status: 201 })
  }),
]
