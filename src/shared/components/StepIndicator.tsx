interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="text-sm text-gray-500 px-4">
      Passo {currentStep} de {totalSteps}
    </div>
  )
}

export default StepIndicator
