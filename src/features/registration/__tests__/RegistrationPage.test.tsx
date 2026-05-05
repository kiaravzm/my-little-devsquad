import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationPage } from '../components/RegistrationPage'

describe('RegistrationPage', () => {

  it('renders the first step heading', () => {
    render(<RegistrationPage />)

    // busca pelo que o usuário VÊ — não por className ou id interno
    expect(
      screen.getByRole('heading', { name: /junte-se ao my little devsquad/i })
    ).toBeInTheDocument()
  })

  it('shows step indicator on first step', () => {
    render(<RegistrationPage />)

    expect(screen.getByText(/passo 1 de 3/i)).toBeInTheDocument()
  })

  it('has a name input and a next button', () => {
    render(<RegistrationPage />)

    // getByLabelText vincula o input ao label — testa acessibilidade junto
    expect(screen.getByLabelText(/seu nome/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /próximo/i })).toBeInTheDocument()
  })

  it('lets the user type in the name field', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)

    const input = screen.getByLabelText(/seu nome/i)
    await user.type(input, 'Ana')

    // verifica que o input reflete o que foi digitado
    expect(input).toHaveValue('Ana')
  })

  it('shows error message when submitting without a name', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)
  
    // usuário clica em próximo sem preencher nada
    await user.click(screen.getByRole('button', { name: /próximo/i }))
  
    // deve aparecer uma mensagem de erro
    expect(
      screen.getByText(/nome é obrigatório/i)
    ).toBeInTheDocument()
  })

})
