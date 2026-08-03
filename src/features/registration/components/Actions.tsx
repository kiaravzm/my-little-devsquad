import { Button } from '@/components/ui/button'
const Actions = ({
  onPrevStep,
  onNextStep,
  onReset,

  currentStep,
  totalSteps,
}: {
  onPrevStep: () => void
  onNextStep: () => void
  onReset: () => void

  currentStep: number
  totalSteps: number
}) => {
  return (
    <div className="flex justify-between">
      <Button onClick={onReset} type="button">
        Resetar
      </Button>
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
        <Button type="submit" form="form-rhf-demo">
          Enviar
        </Button>
      )}
    </div>
  )
}

export default Actions
