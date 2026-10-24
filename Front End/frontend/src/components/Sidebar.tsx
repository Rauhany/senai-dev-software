import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { useAuth } from '../context/AuthContext'

  
function Sidebar() {
  const { user, logout } = useAuth()
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-box">
            <span className="logo-icon">🎮</span>
          </div>
          <h2>MinhaApp</h2>
        </div>
        <p className="sidebar-subtitle">Tudo em ordem, em um só lugar.</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/produtos" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <span className="icon">🎮</span> Produtos
        </NavLink>
        
        <NavLink 
          to="/clientes" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <span className="icon">👤</span> Clientes
        </NavLink>

        {/* Novo link de Vendas adicionado aqui */}
        <NavLink 
          to="/vendas" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <span className="icon">🛒</span> Vendas
        </NavLink>

        <div style={{ padding: '20px', color: 'white', fontSize: '13px' }}>
  <p>👤 {user?.nome}</p>
  <button onClick={logout}>🚪 Sair</button>
</div>
      </nav>
    </aside>

    
  )
}

export default Sidebar