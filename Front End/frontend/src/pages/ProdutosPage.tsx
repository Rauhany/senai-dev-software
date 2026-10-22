import { useEffect, useState } from 'react'
import type { Produto } from '../types/Produto'
import { produtoService } from '../services/produtoService'
import ProdutoForm from '../components/ProdutoForm'
import ProdutoList from '../components/produtoList'
import '../components/produto.css'

function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setErro(null)
      setProdutos(await produtoService.listar())
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      setErro('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void carregarProdutos()
  }, [])

  return (
    <main className="page-container">
      <header className="page-header">
        <span className="overline">PAINEL DE GESTÃO</span>
        <h1>Gestão de Produtos</h1>
        <p>Cadastre, encontre e organize seu catálogo com facilidade.</p>
      </header>

      <div className="content-grid">
        <ProdutoForm onProdutoCriado={carregarProdutos} />

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <ProdutoList
          produtos={produtos}
          loading={loading}
        />
      </div>
    </main>
  )
}

export default ProdutosPage