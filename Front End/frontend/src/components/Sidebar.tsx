import { NavLink } from 'react-router-dom'
import './sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-box">
            <span className="logo-icon">📦</span>
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
          <span className="icon">📦</span> Produtos
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
      </nav>
    </aside>
  )
}

export default Sidebar