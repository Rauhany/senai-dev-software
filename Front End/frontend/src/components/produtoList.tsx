import { useState } from 'react'
import type { produto } from '../types/Produto'

interface Props {
  produtos: produto[]
  loading: boolean
}

function ProdutoList({ produtos, loading }: Props) {
  const [busca, setBusca] = useState('')

  // Filtra os produtos com base na digitação
  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <section className="card">
      <div className="card-header list-header">
        <h2>Produtos cadastrados</h2>
        <span className="badge">LISTA</span>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="🔍 Buscar na lista..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="list-msg">Carregando produtos...</p>
      ) : produtosFiltrados.length === 0 ? (
        <p className="list-msg">Nenhum produto encontrado.</p>
      ) : (
        <ul className="product-list">
          {produtosFiltrados.map(p => (
            <li key={p.id} className="product-item">
              <span className="product-name">{p.nome}</span>
              <span className="product-price">
                R$ {Number(p.preco).toFixed(2).replace('.', ',')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProdutoList