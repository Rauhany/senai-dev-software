import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/Protectedroute'
import LoginPage from './pages/LoginPage'
import ProdutosPage from './pages/ProdutosPage'
import ClientesPage from './pages/ClientePage'

function Layout() {
  const { isAuthenticated } = useAuth()
  return (
    <div style={{ display: 'flex' }}>
      {isAuthenticated && <Sidebar />}
      <main style={{ flex: 1, padding: '24px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/produtos" replace />} />
          <Route path="/produtos" element={
            <ProtectedRoute><ProdutosPage /></ProtectedRoute>
          } />
          <Route path="/clientes" element={
            <ProtectedRoute><ClientesPage /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App