import { useState } from 'react'
import { produtoService } from '../../services/produtoService'
import './produto.css'

interface Props {
  onProdutoCriado: () => void
}

function ProdutoForm({ onProdutoCriado }: Props) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      await produtoService.criar({
        nome,
        preco: Number(preco),
      })
      setNome('')
      setPreco('')
      onProdutoCriado()
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="produto-container">
      <h2 className="produto-titulo">Cadastrar Produto</h2>

      {erro && (
        <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
          {erro}
        </p>
      )}

      <form className="produto-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            className="form-input"
            type="text"
            placeholder="Ex: Teclado Mecânico"
            value={nome}
            onChange={e => {
              if (erro) setErro(null)
              setNome(e.target.value)
            }}
            disabled={loading}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            id="preco"
            className="form-input"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={preco}
            onChange={e => {
              if (erro) setErro(null)
              setPreco(e.target.value)
            }}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="btn-cadastrar" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

export default ProdutoForm