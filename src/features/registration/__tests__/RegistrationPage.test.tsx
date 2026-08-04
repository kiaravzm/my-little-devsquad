import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RegistrationPage } from '../components/RegistrationPage'
import { renderWithProviders } from '../../../test/utils'
import { saveApplicant } from '../services/registration.service'

vi.mock('../services/registration.service', () => ({
  saveApplicant: vi.fn(),
}))

const mockSaveApplicant = vi.mocked(saveApplicant)

/** Select Radix: click trigger → wait option in portal → click option */
async function chooseOption(
  user: ReturnType<typeof userEvent.setup>,
  comboboxName: RegExp,
  optionName: RegExp,
) {
  await user.click(screen.getByRole('combobox', { name: comboboxName }))
  const option = await screen.findByRole('option', { name: optionName })
  await user.click(option)
  // menu should close; avoids clicking the wrong open listbox later
  await waitFor(() => {
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
}

async function addTag(user: ReturnType<typeof userEvent.setup>, fieldLabel: RegExp, tag: string) {
  const input = screen.getByLabelText(fieldLabel)
  await user.type(input, `${tag}{Enter}`)
  // proves the TagInput accepted the value (less fragile than only trusting submit)
  expect(screen.getByText(tag)).toBeInTheDocument()
}

describe('RegistrationPage', () => {
  beforeEach(() => {
    mockSaveApplicant.mockReset()
    mockSaveApplicant.mockResolvedValue({ data: null, error: null })
  })

  it('renders the first step', () => {
    renderWithProviders(<RegistrationPage />)
    expect(
      screen.getByRole('heading', { name: /junte-se ao my little devsquad/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/passo 1 de 3/i)).toBeInTheDocument()
  })

  it('shows success screen after a valid submission', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegistrationPage />)

    // Step 1 — labels estáveis (texto do FieldLabel)
    await user.type(screen.getByLabelText(/qual o seu nome/i), 'Ana Silva')
    await user.type(screen.getByLabelText(/link do seu github/i), 'https://github.com/ana-silva')
    await user.click(screen.getByRole('button', { name: /próximo/i }))
    expect(await screen.findByText(/passo 2 de 3/i)).toBeInTheDocument()

    // Step 2
    await chooseOption(user, /prefere trabalhar/i, /^frontend$/i)
    await chooseOption(user, /nível de experiência/i, /^beginner$/i)
    await addTag(user, /habilidades você já possui/i, 'React')
    await addTag(user, /gostaria de aprender/i, 'Next.js')
    await user.click(screen.getByRole('button', { name: /próximo/i }))
    expect(await screen.findByText(/passo 3 de 3/i)).toBeInTheDocument()

    // Step 3
    await chooseOption(user, /disponibilidade/i, /^1-5h$/i)
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    // Success — async (mutation + re-render)
    const successHeading = await screen.findByRole('heading', {
      name: /inscrição enviada com sucesso/i,
    })
    expect(successHeading).toBeInTheDocument()

    expect(mockSaveApplicant).toHaveBeenCalledTimes(1)
    expect(mockSaveApplicant).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ana Silva',
        gitHub: 'https://github.com/ana-silva',
        area: 'frontend',
        experienceLevel: 'beginner',
        availability: '1-5h',
        currentSkills: ['React'],
        desiredSkills: ['Next.js'],
      }),
    )
  })
})
