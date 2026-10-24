import { useEffect, useState } from 'react'
import type { Venda } from '../types/Venda.ts'
import { vendaService } from '../services/vendaService.ts'
import VendaForm from '../components/VendaForm.tsx'
import VendaList from '../components/VendaList.tsx'

function VendaPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(false)

  const carregarVendas = async () => {
    setLoading(true)
    try {
      const dados = await vendaService.listar()
      
      if (Array.isArray(dados)) {
        setVendas(dados)
      } else if (dados && Array.isArray((dados as any).data)) {
        setVendas((dados as any).data)
      } else {
        setVendas([]) 
      }
    } catch (error) {
      console.error("Erro ao carregar vendas:", error)
      setVendas([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregarVendas() }, [])
  
  return (
    <div>
    <VendaForm onVendaCriada={carregarVendas} />

<div className="venda-lista-container">
  <VendaList vendas={vendas} loading={loading} />
</div>
    </div>
  )
}

export default VendaPage