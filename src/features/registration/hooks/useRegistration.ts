import { useReducer } from 'react'
import { type ApplicantFormData } from '../schemas/applicant.schema'
import { saveApplicant } from '../services/registration.service'
import { useMutation } from '@tanstack/react-query'

interface RegistrationState {
  step: number
  isLoading: boolean
  isError: boolean
  error: string | null
  isSuccess: boolean
}

const MIN_STEP = 1
const MAX_STEP = 3

const initialState: RegistrationState = {
  step: 1,
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
}

type RegistrationAction = {
  type: 'SUBMIT_START' | 'NEXT_STEP' | 'PREV_STEP' | 'RESET' | 'SUBMIT_SUCCESS' | 'SUBMIT_ERROR'
  payload?: RegistrationState
}

const registrationReducer = (
  state: RegistrationState,
  action: RegistrationAction,
): RegistrationState => {
  switch (action.type) {
    case 'SUBMIT_START':
      return { ...state, isLoading: true, isError: false, error: null, isSuccess: false }
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 }
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 }
    case 'RESET':
      return initialState
    case 'SUBMIT_SUCCESS':
      return { ...state, isLoading: false, isError: false, error: null, isSuccess: true }
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload?.error ?? null,
        isSuccess: false,
      }
    default:
      return state
  }
}
export const useRegistration = () => {
  const [formState, dispatch] = useReducer(registrationReducer, initialState)

  const handleNextStep = () => {
    if (formState.step >= MAX_STEP) return
    dispatch({ type: 'NEXT_STEP' })
  }

  const handlePrevStep = () => {
    if (formState.step <= MIN_STEP) return
    dispatch({
      type: 'PREV_STEP',
    })
  }

  const handleReset = () => {
    dispatch({
      type: 'RESET',
    })
  }

  const handleSubmit = (data: ApplicantFormData) => {
    dispatch({ type: 'SUBMIT_START', payload: formState })
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: (data: ApplicantFormData) => saveApplicant(data),
    onSuccess: () => {
      dispatch({
        type: 'SUBMIT_SUCCESS',
        payload: {
          isSuccess: true,
          step: formState.step,
          isLoading: false,
          isError: false,
          error: null,
        },
      })
    },
    onError: (error) => {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: {
          isError: true,
          error: error.message,
          step: formState.step,
          isLoading: false,
          isSuccess: false,
        },
      })
    },
  })

  return {
    formState,
    totalSteps: MAX_STEP,
    handleNextStep,
    handlePrevStep,
    handleReset,
    handleSubmit,
  }
}
