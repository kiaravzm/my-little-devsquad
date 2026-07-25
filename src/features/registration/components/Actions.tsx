import { Button } from '@/components/ui/button'
const Actions = ({
  onPrevStep,
  onNextStep,
  onReset,
  onSubmit,
  currentStep,
  totalSteps,
}: {
  onPrevStep: () => void
  onNextStep: () => void
  onReset: () => void
  onSubmit: () => void
  currentStep: number
  totalSteps: number
}) => {
  return (
    <div className="flex justify-between">
      <Button onClick={onReset}>Resetar</Button>
      {currentStep > 1 && (
        <Button type="button" onClick={onPrevStep}>
          Voltar
        </Button>
      )}
      {currentStep < totalSteps && (
        <Button onClick={onNextStep} type="button">
          Próximo
        </Button>
      )}
      {currentStep === totalSteps && (
        <Button onClick={onSubmit} type="button">
          Enviar
        </Button>
      )}
    </div>
  )
}

export default Actions
