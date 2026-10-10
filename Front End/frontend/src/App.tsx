import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProdutosPage from './pages/ProdutosPage'
import ClientesPage from './pages/ClientePage'
// 1. Importação da nova página de Vendas adicionada aqui
import { VendasPage } from './pages/VendaPage' 

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '24px' }}>
          <Routes>
            <Route path="/" element={
              <Navigate to="/produtos" replace />
            } />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            
            {/* 2. Nova rota de Vendas adicionada aqui */}
            <Route path="/vendas" element={<VendasPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App