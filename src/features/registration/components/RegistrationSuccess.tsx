import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
export const RegistrationSuccess = ({ onReset }: { onReset: () => void }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Formulário enviado com sucesso</h1>
      <p className="text-sm text-gray-500">
        Obrigado por se inscrever no nosso evento. Em breve você receberá um email com mais
        informações.
      </p>
      <Button
        onClick={() => {
          onReset()
          navigate('/')
        }}
        type="button"
      >
        Voltar para a página inicial
      </Button>
    </div>
  )
}
