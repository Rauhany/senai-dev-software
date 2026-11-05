
import type { UltimaVenda } from '../../types/Dashboard'
import { formatarMoeda, formatarDataHora } from '../../Util/Formatadores'
import { painel } from '../../Util/Estilos'

function UltimasVendas({ dados }: { dados: UltimaVenda[] }) {
  return (
    <div style={painel}>
      <h3 style={{
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '20px',
        fontWeight: 700,
        color: '#1E293B',
        letterSpacing: '0.3px',
        marginBottom: '18px'
      }}>
        🧾 Últimas vendas
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Qtd.</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {dados.map(v => (
            <tr key={v.id}>
              <td>{formatarDataHora(v.dataVenda)}</td>
              <td>{v.cliente}</td>
              <td>{v.produto}</td>
              <td>{v.quantidade}</td>
              <td>{formatarMoeda(v.valorTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UltimasVendas
