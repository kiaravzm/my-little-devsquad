export function RegistrationPage() {
    return (
      <main>
        <h1>Junte-se ao My Little DevSquad</h1>
        <p>Passo 1 de 3: Quem é você?</p>
        <form>
          <label htmlFor="name">Seu nome</label>
          <input id="name" type="text" placeholder="Nome completo" />
          <button type="submit">Próximo</button>
        </form>
      </main>
    )
  }