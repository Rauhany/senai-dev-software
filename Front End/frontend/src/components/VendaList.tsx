import type { Venda } from '../types/Venda'
import './cliente.css'

interface VendaComCliente extends Venda {
  Cliente?: {
    nome?: string
    Nome?: string
  } | null
  cliente?: {
    nome?: string
    Nome?: string
  } | null
  nome_cliente?: string
  cliente_nome?: string
}

interface Props {
  vendas: Venda[]
  loading: boolean
}

function VendaList({ vendas, loading }: Props) {
  const listaVendas = Array.isArray(vendas)
    ? (vendas as VendaComCliente[])
    : []

  const formatarMoeda = (valor: number | string | null | undefined) => {
    const numero = Number(valor ?? 0)

    return (Number.isFinite(numero) ? numero : 0).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )
  }

  const formatarData = (data: Date | string | null | undefined) => {
    if (!data) return 'Data não informada'

    const dataConvertida = new Date(data)

    if (Number.isNaN(dataConvertida.getTime())) {
      return 'Data inválida'
    }

    return dataConvertida.toLocaleDateString('pt-BR')
  }

  const obterNomeCliente = (venda: VendaComCliente) => {
    return (
      venda.Cliente?.nome ||
      venda.Cliente?.Nome ||
      venda.cliente?.nome ||
      venda.cliente?.Nome ||
      venda.nome_cliente ||
      venda.cliente_nome ||
      (venda.ClienteId
        ? `Cliente #${venda.ClienteId}`
        : 'Cliente não identificado')
    )
  }

  return (
    <section className="venda-card-box">
      <header className="secao-titulo-venda">
        <h2>Vendas cadastradas</h2>
        <span>{listaVendas.length} registro(s)</span>
      </header>

      {loading ? (
        <p className="venda-vazio">Carregando vendas...</p>
      ) : listaVendas.length === 0 ? (
        <p className="venda-vazio">
          Nenhuma venda cadastrada ainda.
        </p>
      ) : (
        <ul className="venda-lista">
          {listaVendas.map((venda, index) => (
            <li
              key={venda.idvendas ?? `venda-${index}`}
              className="venda-item"
            >
              <div className="venda-detalhes">
                <span className="venda-cliente">
                  {obterNomeCliente(venda)}
                </span>

                <span className="venda-data">
                  {formatarData(venda.data_venda)}
                </span>
              </div>

              <div className="venda-info">
                <span className="venda-valor">
                  {formatarMoeda(venda.valor_total)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default VendaList