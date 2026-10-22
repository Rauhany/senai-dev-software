
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import ProdutosPage from './pages/ProdutosPage';
import ClientesPage from './pages/ClientePage';
import VendaPage from './pages/VendaPage';

import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/produtos" replace />}
            />

            <Route
              path="/produtos"
              element={<ProdutosPage />}
            />

            <Route
              path="/clientes"
              element={<ClientesPage />}
            />

            <Route
              path="/vendas"
              element={<VendaPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
