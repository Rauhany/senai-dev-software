import { useEffect, useState } from 'react'
import type { Cliente } from '../types/Cliente'
import { clienteService } from '../services/clienteService.ts'
import ClienteForm from '../components/ClienteForm'
import ClienteList from '../components/ClienteList'

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)

const carregarClientes = async () => {
  setLoading(true)
  try {
    const dados = await clienteService.listar()
    
    // Se a API/Service retornar um objeto { data: [...] } ou undefined/null
    if (Array.isArray(dados)) {
      setClientes(dados)
    } else if (dados && Array.isArray((dados as any).data)) {
      setClientes((dados as any).data)
    } else {
      setClientes([]) // Fallback para lista vazia
    }
  } catch (error) {
    console.error("Erro ao carregar clientes:", error)
    setClientes([])
  } finally { 
    setLoading(false)
  }
}

  useEffect(() => { carregarClientes() }, [])
  return (<div>
    <h1>Gestão de Clientes</h1>
    <ClienteForm onClienteCriado={carregarClientes} />
    <ClienteList clientes={clientes} loading={loading} />
  </div>)
}
export default ClientesPage