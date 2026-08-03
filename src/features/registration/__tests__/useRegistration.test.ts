import { act, renderHook, waitFor, type RenderHookResult } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useRegistration } from '../hooks/useRegistration'
import { saveApplicant } from '../services/registration.service'
import type { ApplicantFormData } from '../schemas/applicant.schema'
import { createWrapper } from '../../../test/utils'

vi.mock('../services/registration.service', () => ({
  saveApplicant: vi.fn(),
}))

const mockSaveApplicant = vi.mocked(saveApplicant)

type HookResult = RenderHookResult<ReturnType<typeof useRegistration>, unknown>

/** Values that satisfy `applicantFormSchema` (skills are arrays). */
const validFormValues: ApplicantFormData = {
  name: 'John Doe',
  area: 'frontend',
  experienceLevel: 'beginner',
  gitHub: 'https://github.com/john-doe',
  availability: '1-5h',
  currentSkills: ['React'],
  desiredSkills: ['React Native'],
  notes: 'I am a frontend developer',
}

function renderRegistrationHook(): HookResult {
  return renderHook(() => useRegistration(), { wrapper: createWrapper() })
}

/** Fills all three wizard steps with valid data. */
function fillValidThreeStepForm(result: HookResult['result']) {
  act(() => {
    result.current.handleChange('name', validFormValues.name)
    result.current.handleNextStep()
    result.current.handleChange('area', validFormValues.area)
    result.current.handleNextStep()
    result.current.handleChange('availability', validFormValues.availability)
    result.current.handleChange('currentSkills', validFormValues.currentSkills)
    result.current.handleChange('desiredSkills', validFormValues.desiredSkills)
    result.current.handleChange('notes', validFormValues.notes!)
  })
}

describe('useRegistration', () => {
  let hook: HookResult

  beforeEach(() => {
    mockSaveApplicant.mockReset()
    hook = renderRegistrationHook()
  })

  afterEach(() => {
    hook.unmount()
  })

  it('starts on step 1', () => {
    expect(hook.result.current.formState.step).toBe(1)
  })

  it('advances to step 2 when handleNextStep is called', () => {
    act(() => hook.result.current.handleNextStep())
    expect(hook.result.current.formState.step).toBe(2)
  })

  it('returns to step 1 when handlePrevStep is called after advancing', () => {
    act(() => hook.result.current.handleNextStep())
    act(() => hook.result.current.handlePrevStep())
    expect(hook.result.current.formState.step).toBe(1)
  })

  it('does not advance further than step 3 when handleNextStep is called repeatedly', () => {
    act(() => hook.result.current.handleNextStep())
    act(() => hook.result.current.handleNextStep())
    act(() => hook.result.current.handleNextStep())
    expect(hook.result.current.formState.step).toBe(3)
  })

  it('does not retreat further than step 1 when handlePrevStep is called', () => {
    act(() => hook.result.current.handlePrevStep())
    expect(hook.result.current.formState.step).toBe(1)
    act(() => hook.result.current.handlePrevStep())
    expect(hook.result.current.formState.step).toBe(1)
  })

  it('resets form state when handleReset is called', () => {
    act(() => hook.result.current.handleNextStep())
    act(() => hook.result.current.handleNextStep())
    act(() => hook.result.current.handleReset())
    expect(hook.result.current.formState.step).toBe(1)
    expect(hook.result.current.formState).toEqual({})
    expect(hook.result.current.formState.isLoading).toBe(false)
    expect(hook.result.current.formState.isError).toBe(false)
    expect(hook.result.current.formState.error).toBe(null)
    expect(hook.result.current.formState.isSuccess).toBe(false)
  })

  it('persists form data when navigating between steps', () => {
    act(() => hook.result.current.handleChange('name', 'Maria'))
    act(() => hook.result.current.handleNextStep())
    expect(hook.result.current.formState).toBe('Maria')
    act(() => hook.result.current.handlePrevStep())
    expect(hook.result.current.formState).toEqual({ ...validFormValues, name: 'Maria' })
  })

  it('submits successfully when validation passes and saveApplicant resolves', async () => {
    mockSaveApplicant.mockResolvedValue({
      data: { ...validFormValues, id: 'test-id-1' },
      error: null,
    })

    fillValidThreeStepForm(hook.result)

    await act(async () => {
      await hook.result.current.handleSubmit(validFormValues)
    })

    await waitFor(() => {
      expect(hook.result.current.formState.isSuccess).toBe(true)
    })

    expect(mockSaveApplicant).toHaveBeenCalledTimes(1)
    expect(mockSaveApplicant).toHaveBeenCalledWith(validFormValues)
    expect(hook.result.current.formState.isLoading).toBe(false)
    expect(hook.result.current.formState.isError).toBe(false)
    expect(hook.result.current.formState.error).toBe(null)
    expect(hook.result.current.formState).toEqual(validFormValues)
  })

  it('sets validation error when name is empty', () => {
    act(() => hook.result.current.handleChange('name', ''))
    act(() => {
      void hook.result.current.handleSubmit({ ...validFormValues, name: '' })
    })
    expect(hook.result.current.formState.isError).toBe(true)
    expect(hook.result.current.formState.error).toContain('Nome é obrigatório')
    expect(hook.result.current.formState.isSuccess).toBe(false)
    expect(mockSaveApplicant).not.toHaveBeenCalled()
  })

  it('keeps isLoading true while saveApplicant is not resolved', async () => {
    let resolveSave!: (value: Awaited<ReturnType<typeof saveApplicant>>) => void
    mockSaveApplicant.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSave = resolve
        }),
    )

    fillValidThreeStepForm(hook.result)

    let submitPromise: Promise<void>
    await act(async () => {
      submitPromise = hook.result.current.handleSubmit(validFormValues)
    })

    expect(hook.result.current.formState.isLoading).toBe(true)

    await act(async () => {
      resolveSave({ data: { ...validFormValues, id: 'delayed-id' }, error: null })
      await submitPromise!
    })

    await waitFor(() => {
      expect(hook.result.current.formState.isSuccess).toBe(true)
    })
    expect(hook.result.current.formState.isLoading).toBe(false)
  })

  it('sets error state when saveApplicant fails and the mutation rejects', async () => {
    mockSaveApplicant.mockRejectedValue(new Error('Erro interno do servidor'))

    fillValidThreeStepForm(hook.result)

    await act(async () => {
      await expect(hook.result.current.handleSubmit(validFormValues)).rejects.toThrow(
        'Erro interno do servidor',
      )
    })

    await waitFor(() => {
      expect(hook.result.current.formState.isError).toBe(true)
    })
    expect(hook.result.current.formState.error).toBe('Erro interno do servidor')
    expect(hook.result.current.formState.isSuccess).toBe(false)
    expect(hook.result.current.formState.isLoading).toBe(false)
  })
})
