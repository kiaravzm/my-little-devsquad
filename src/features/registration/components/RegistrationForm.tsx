import StepIndicator from '@/shared/components/StepIndicator'
import { useRegistration } from '../hooks/useRegistration'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { useForm } from 'react-hook-form'
import {
  applicantFormSchema,
  applicantFormEmptyDefaults,
  type ApplicantFormData,
} from '../schemas/applicant.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepOne } from './StepOne'
import { StepThree } from './StepThree'
import { StepTwo } from './StepTwo'
import Actions from './Actions'
import { RegistrationSuccess } from './RegistrationSuccess'

export const RegistrationForm = () => {
  const { formState, totalSteps, handleNextStep, handlePrevStep, handleReset, handleSubmit } =
    useRegistration()
  const form = useForm<ApplicantFormData>({
    resolver: zodResolver(applicantFormSchema),
    defaultValues: applicantFormEmptyDefaults,
  })
  const fieldsByStep: Record<number, (keyof ApplicantFormData)[]> = {
    1: ['name', 'gitHub'],
    2: ['area', 'experienceLevel', 'currentSkills', 'desiredSkills'],
    3: ['availability', 'notes'],
  }

  const handleValidatedNext = async () => {
    const isStepValid = await form.trigger(fieldsByStep[formState.step])
    if (isStepValid) handleNextStep()
  }
  if (formState.isSuccess) {
    return (
      <RegistrationSuccess
        onReset={() => {
          handleReset()
          form.reset(applicantFormEmptyDefaults)
        }}
      />
    )
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle role="heading" aria-level={1}>
          Junte-se ao My Little DevSquad
        </CardTitle>
        <CardDescription>
          Preencha o formulário abaixo para se juntar ao My Little DevSquad.
        </CardDescription>
      </CardHeader>
      <StepIndicator currentStep={formState.step} totalSteps={totalSteps} />
      <CardContent>
        <form
          id="registration-form"
          onSubmit={form.handleSubmit((data: ApplicantFormData) => {
            handleSubmit(data)
          })}
        >
          <StepOne isVisible={formState.step === 1} form={form} />
          <StepTwo isVisible={formState.step === 2} form={form} />
          <StepThree isVisible={formState.step === 3} form={form} />
        </form>
      </CardContent>
      {formState.isError && (
        <CardFooter>
          <p role="alert" className="text-sm text-destructive">
            {formState.error}
          </p>
        </CardFooter>
      )}
      <CardFooter>
        <Field orientation="horizontal">
          <Actions
            onPrevStep={handlePrevStep}
            onNextStep={handleValidatedNext}
            onReset={() => {
              handleReset()
              form.reset(applicantFormEmptyDefaults)
            }}
            currentStep={formState.step}
            totalSteps={totalSteps}
            isLoading={formState.isLoading}
          />
        </Field>
        {formState.isError && (
          <p role="alert" className="text-sm text-destructive">
            {formState.error}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}
