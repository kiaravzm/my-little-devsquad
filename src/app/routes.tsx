import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationPage } from '../features/registration/components/RegistrationPage'
import { LoginPage } from '../features/auth/components/LoginPage'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { AdminPage } from '../features/admin/components/AdminPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
