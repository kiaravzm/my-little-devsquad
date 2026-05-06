import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationPage } from '../features/registration/components/RegistrationPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}
