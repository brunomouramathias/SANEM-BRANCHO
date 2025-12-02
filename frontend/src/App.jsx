import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Produtos } from './pages/Produtos'
import { Beneficiarios } from './pages/Beneficiarios'
import { Operadores } from './pages/Operadores'
import { Distribuicao } from './pages/Distribuicao'
import { Historico } from './pages/Historico'
import { Relatorios } from './pages/Relatorios'

// Componente de rota protegida
function ProtectedRoute({ children }) {
  const { user } = useApp()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Componente de rota pública (redireciona se já estiver logado)
function PublicRoute({ children }) {
  const { user } = useApp()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produtos"
        element={
          <ProtectedRoute>
            <Produtos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/beneficiarios"
        element={
          <ProtectedRoute>
            <Beneficiarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/operadores"
        element={
          <ProtectedRoute>
            <Operadores />
          </ProtectedRoute>
        }
      />
      <Route
        path="/distribuicao"
        element={
          <ProtectedRoute>
            <Distribuicao />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historico"
        element={
          <ProtectedRoute>
            <Historico />
          </ProtectedRoute>
        }
      />
      <Route
        path="/relatorios"
        element={
          <ProtectedRoute>
            <Relatorios />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
