import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
export const RegistrationSuccess = ({ onReset }: { onReset: () => void }) => {
  const navigate = useNavigate()

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle role="heading" aria-level={1}>
          Inscrição enviada com sucesso
        </CardTitle>
      </CardHeader>
      <CardDescription>
        Recebemos seus dados. Vamos analisar seu perfil e, se houver um squad compatível, você será
        contactada pelo GitHub ou canal combinado.
      </CardDescription>
      <CardFooter>
        <Button
          onClick={() => {
            onReset()
            navigate('/')
          }}
          type="button"
        >
          Voltar para a página inicial
        </Button>
      </CardFooter>
    </Card>
  )
}
