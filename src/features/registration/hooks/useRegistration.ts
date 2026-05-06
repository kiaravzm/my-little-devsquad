import { useReducer } from 'react'
import {
  applicantFormSchema,
  type ApplicantFormData,
  type PartialApplicant,
} from '../schemas/applicant.schema'
import { saveApplicant } from '../services/registration.service'
import { useMutation } from '@tanstack/react-query'

interface FormState {
  formData: PartialApplicant
  step: number
  isLoading: boolean
  isError: boolean
  error: string | null
  isSuccess: boolean
}

const MIN_STEP = 1
const MAX_STEP = 3

const initialState: FormState = {
  formData: {},
  step: 1,
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
}

type RegistrationAction =
  | { type: 'UPDATE_FIELD'; payload: PartialApplicant }
  | { type: string; payload: FormState }

const registrationReducer = (state: FormState, action: RegistrationAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, formData: { ...state.formData, ...action.payload } }
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
        error: action.payload.error,
        isSuccess: false,
      }
    default:
      return state
  }
}
export const useRegistration = () => {
  const [formState, dispatch] = useReducer(registrationReducer, initialState)

  const handleChange = <K extends keyof PartialApplicant>(
    field: K,
    value: NonNullable<PartialApplicant[K]>,
  ) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { [field]: value } as PartialApplicant,
    })
  }

  const handleNextStep = () => {
    if (formState.step >= MAX_STEP) return
    dispatch({
      type: 'NEXT_STEP',
      payload: {
        formData: formState.formData,
        step: formState.step + 1,
        isLoading: formState.isLoading,
        isError: formState.isError,
        error: formState.error,
        isSuccess: formState.isSuccess,
      },
    })
  }

  const handlePrevStep = () => {
    if (formState.step <= MIN_STEP) return
    dispatch({
      type: 'PREV_STEP',
      payload: {
        formData: formState.formData,
        step: formState.step - 1,
        isLoading: formState.isLoading,
        isError: formState.isError,
        error: formState.error,
        isSuccess: formState.isSuccess,
      },
    })
  }

  const handleReset = () => {
    dispatch({
      type: 'RESET',
      payload: {
        formData: {},
        step: 1,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
      },
    })
  }

  const handleSubmit = async () => {
    const result = applicantFormSchema.safeParse(formState.formData)
    if (!result.success) {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: {
          formData: formState.formData,
          step: formState.step,
          isLoading: formState.isLoading,
          isError: true,
          error: result.error.message,
          isSuccess: false,
        },
      })
      return
    }

    dispatch({
      type: 'SUBMIT_START',
      payload: formState,
    })

    await mutation.mutateAsync(result.data)
  }

  const mutation = useMutation({
    mutationFn: (data: ApplicantFormData) => saveApplicant(data),
    onSuccess: () => {
      dispatch({
        type: 'SUBMIT_SUCCESS',
        payload: {
          formData: formState.formData,
          step: formState.step,
          isLoading: false,
          isError: false,
          error: null,
          isSuccess: true,
        },
      })
    },
    onError: (error) => {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: {
          formData: formState.formData,
          step: formState.step,
          isLoading: false,
          isError: true,
          error: error.message,
          isSuccess: false,
        },
      })
    },
  })

  return { formState, handleChange, handleNextStep, handlePrevStep, handleReset, handleSubmit }
}
