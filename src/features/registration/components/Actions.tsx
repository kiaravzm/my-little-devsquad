import { Button } from '@/components/ui/button'
const Actions = ({
  onPrevStep,
  onNextStep,
  onReset,
  currentStep,
  totalSteps,
  isLoading,
}: {
  onPrevStep: () => void
  onNextStep: () => void
  onReset: () => void
  currentStep: number
  totalSteps: number
  isLoading: boolean
}) => {
  return (
    <div className="flex justify-between">
      <Button onClick={onReset} type="button" disabled={isLoading}>
        Resetar
      </Button>
      {currentStep > 1 && (
        <Button type="button" onClick={onPrevStep} disabled={isLoading}>
          Voltar
        </Button>
      )}
      {currentStep < totalSteps && (
        <Button onClick={onNextStep} type="button" disabled={isLoading}>
          Próximo
        </Button>
      )}
      {currentStep === totalSteps && (
        <Button type="submit" form="registration-form" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      )}
    </div>
  )
}

export default Actions
