
import { useState } from 'react'
import { clienteService } from '../services/clienteService'

interface Props {
  onClienteCriado: () => void
}

function ClienteForm({ onClienteCriado }: Props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErro(null)

    try {
      setLoading(true)

      await clienteService.criar({
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
      })

      setNome('')
      setEmail('')
      setCpf('')

      await onClienteCriado()
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error)
      setErro('Erro ao cadastrar cliente. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
  <section className="clientes-form-card">
    <div className="cliente-form-header">
      <span className="overline">NOVO CADASTRO</span>
      <h2>Cadastro de cliente</h2>
      <p>Preencha os dados abaixo para adicionar um cliente.</p>
    </div>

    <form className="cliente-form" onSubmit={handleSubmit}>
      {erro && (
        <p className="cliente-form-erro" role="alert">
          {erro}
        </p>
      )}

      <div className="cliente-form-grid">
        <div className="cliente-campo">
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Ex.: Maria Silva"
            required
          />
        </div>

        <div className="cliente-campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ex.: maria@email.com"
            required
          />
        </div>

        <div className="cliente-campo">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            placeholder="Ex.: 000.000.000-00"
          />
        </div>
      </div>

      <div className="cliente-form-acoes">
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : '+ Cadastrar cliente'}
        </button>
      </div>
    </form>
  </section>
)
}

export default ClienteForm
