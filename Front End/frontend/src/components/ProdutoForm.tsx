import { useState } from 'react'
import { produtoService } from "../services/produtoService"

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
        preco: Number(preco.replace(',', '.')), // Garante que aceite vírgula
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
    <section className="card">
      <div className="card-header">
        <h2>Cadastrar produto</h2>
        <p>Preencha os dados para adicionar um item.</p>
      </div>

      {erro && (
        <p style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '14px' }}>
          {erro}
        </p>
      )}

      <form className="form-layout" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome do produto</label>
          <input
            id="nome"
            type="text"
            placeholder="Ex.: Mouse gamer"
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

        <div className="input-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            id="preco"
            type="text"
            placeholder="Ex.: 120,50"
            value={preco}
            onChange={e => {
              if (erro) setErro(null)
              setPreco(e.target.value)
            }}
            disabled={loading}
            required
          />
        </div>

       TypeScript
<button type="submit" className="btn-primary" disabled={loading}>
  {loading ? 'Cadastrando...' : 'Cadastrar produto'}
</button>
      </form>
    </section>
  )
}

export default ProdutoForm