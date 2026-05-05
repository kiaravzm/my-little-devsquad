import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/applicants', async ({ request }) => {
    const body = await request.json()
    console.log('[MSW] intercepted POST /api/applicants:', body)
    return HttpResponse.json({ success: true }, { status: 201 })
  }),
]