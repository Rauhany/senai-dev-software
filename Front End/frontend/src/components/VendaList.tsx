import type { Venda } from '../types/Venda';
import './cliente.css';

interface Props {
  vendas: Venda[];
  loading: boolean;
}

function VendaList({ vendas, loading }: Props) {
  const listaVendas = Array.isArray(vendas) ? vendas : [];

  return (
    <div className="venda-card-box">
      <h2 className="secao-titulo-venda">Vendas Cadastradas</h2>

      {loading ? (
        <p className="venda-vazio">A carregar...</p>
      ) : listaVendas.length === 0 ? (
        <p className="venda-vazio">Nenhuma venda cadastrada ainda.</p>
      ) : (
        <ul className="venda-lista">
          {listaVendas.map((v) => (
            <li key={v.idvendas} className="venda-item">
              <span className="venda-data"> {v.data_venda ? new Date(v.data_venda).toLocaleDateString('pt-BR') : 'Sem data'} </span>
              <div className="venda-info">
                <span className="venda-quantidade">{v.quantidade}</span>
                <span className="venda-divisor">•</span>
                <span className="venda-valor"> $ {Number(v?.valor_total ?? 0).toFixed(2)} </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VendaList;