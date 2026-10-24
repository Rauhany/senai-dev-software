import { useState } from 'react'
import { vendaService} from '../services/vendaService'

interface Props {
  onVendaCriada: () => void
}

function VendaForm({ onVendaCriada }: Props) {
  const [quantidade, setQuantidade] = useState<number | null>(null)
  const [produtoId, setProdutoId] = useState<number | null>(null)
  const [clienteId, setClienteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      await vendaService.criar({ quantidade, produtoId: produtoId, clienteId: clienteId })
      setQuantidade(null)
      setProdutoId(null)
      setClienteId(null)
      onVendaCriada()
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

return (
  <div className="venda-card-box">
    <h2 className="secao-titulo-venda">Cadastrar Venda</h2>

    {erro && (
      <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
        {erro}
      </p>
    )}

    <form className="venda-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label htmlFor="quantidade">Quantidade</label>
        <input
          id="quantidade"
          className="form-input"
          type="number"
          placeholder="Ex: 10"
          value={quantidade || ''} 
          onChange={e => {
            if (erro) setErro(null)
            setQuantidade(parseInt(e.target.value))
          }}
          disabled={loading}
          required
        />
      </div>

        <div className="form-group">
            <label htmlFor="produtoId">ID do Produto</label>
            <input
                id="produtoId"
                className="form-input"
                type="number"
                placeholder="Ex: 1"
                value={produtoId || ''}
                onChange={e => {
                    if (erro) setErro(null)
                    setProdutoId(parseInt(e.target.value))
                }}
                disabled={loading}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="clienteId">ID do Cliente</label>
            <input
                id="clienteId"
                className="form-input"
                type="number"
                placeholder="Ex: 1"
                value={clienteId || ''}
                onChange={e => {
                    if (erro) setErro(null)
                    setClienteId(parseInt(e.target.value))
                }}
                disabled={loading}
                required
            />
        </div>

      <button type="submit" className="btn-cadastrar-venda" disabled={loading}>
        {loading ? 'Salvando...' : 'Cadastrar'}
      </button>
    </form>
  </div>
)
}

export default VendaForm