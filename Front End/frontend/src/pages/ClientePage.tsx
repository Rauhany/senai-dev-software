import { useEffect, useState } from 'react'
import type { Cliente } from '../types/Cliente'
import { clienteService } from '../services/clienteService'
import ClienteForm from '../components/ClienteForm'
import ClienteList from '../components/ClienteList'
import './Paginas.css'

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const carregarClientes = async () => {
    setLoading(true)
    setErro(null)

    try {
      const dados = await clienteService.listar()

      if (Array.isArray(dados)) {
        setClientes(dados)
      } else if (
        dados &&
        Array.isArray((dados as { data?: Cliente[] }).data)
      ) {
        setClientes((dados as { data: Cliente[] }).data)
      } else {
        setClientes([])
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
      setClientes([])
      setErro('Não foi possível carregar os clientes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void carregarClientes()
  }, [])

  return (
    <main className="pagina-centralizada">
      <header className="page-header">
        <span className="overline">PAINEL DE GESTÃO</span>
        <h1>Gestão de Clientes</h1>
        <p>Cadastre, encontre e gerencie seus clientes em um só lugar.</p>
      </header>

      <div className="conteudo-centralizado">
        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <ClienteForm onClienteCriado={carregarClientes} />

        <ClienteList
          clientes={clientes}
          loading={loading}
        />
      </div>
    </main>
  )
}

export default ClientesPage