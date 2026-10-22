import { useState } from 'react'
import type { Produto } from '../types/Produto'

interface Props {
  produtos: Produto[]
  loading: boolean
}

function ProdutoList({ produtos, loading }: Props) {
  const [busca, setBusca] = useState('')

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase().trim())
  )

  const formatarPreco = (preco: number) =>
    Number(preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  return (
    <section className="card produto-list-card">
      <div className="card-header list-header">
        <div>
          <span className="form-overline">SEU ESTOQUE</span>
          <h2>Produtos cadastrados</h2>
          <p>Consulte e encontre seus produtos rapidamente.</p>
        </div>

        <span className="badge">
          {produtos.length} {produtos.length === 1 ? 'ITEM' : 'ITENS'}
        </span>
      </div>

      <div className="search-bar">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="text"
          aria-label="Buscar produtos"
          placeholder="Buscar produto pelo nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        {busca && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setBusca('')}
            aria-label="Limpar busca"
          >
            ×
          </button>
        )}
      </div>

      {loading ? (
        <div className="list-msg">
          <span className="loading-dot" />
          Carregando produtos...
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className="list-empty">
          <span className="empty-icon" aria-hidden="true">⌕</span>
          <h3>
            {busca ? 'Nenhum resultado encontrado' : 'Seu catálogo está vazio'}
          </h3>
          <p>
            {busca
              ? 'Tente buscar por outro nome.'
              : 'Cadastre seu primeiro produto para começar.'}
          </p>
        </div>
      ) : (
        <ul className="product-list">
          {produtosFiltrados.map(p => (
            <li key={p.id} className="product-item">
              <div className="product-info">
                <span className="product-avatar" aria-hidden="true">▦</span>
                <div className="product-details">
                  <span className="product-name">{p.nome}</span>
                  <span className="product-id">
                    Código: {p.id ?? '—'}
                  </span>
                </div>
              </div>

              <span className="product-price">
                {formatarPreco(Number(p.preco))}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && produtosFiltrados.length > 0 && (
        <div className="list-footer">
          Exibindo <strong>{produtosFiltrados.length}</strong>
          {' '}de <strong>{produtos.length}</strong> produtos
        </div>
      )}
    </section>
  )
}

export default ProdutoList