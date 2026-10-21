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
      <h2 className="secao-titulo-venda">
        Vendas Cadastradas
      </h2>

      {loading ? (
        <p className="venda-vazio">A carregar...</p>
      ) : listaVendas.length === 0 ? (
        <p className="venda-vazio">
          Nenhuma venda cadastrada ainda.
        </p>
      ) : (
        <ul className="venda-lista">
          {listaVendas.map((venda, index) => (
            <li
              key={
                venda.idvendas != null
                  ? String(venda.idvendas)
                  : `venda-${index}`
              }
              className="venda-item"
            >
              <span className="venda-data">
                {venda.data_venda
                  ? new Date(venda.data_venda).toLocaleDateString('pt-BR')
                  : 'Sem data'}
              </span>

              <div className="venda-info">
                <span className="venda-quantidade">
                  {venda.quantidade}
                </span>

                <span className="venda-divisor">•</span>

                <span className="venda-valor">
                  $ {Number(venda.valor_total ?? 0).toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VendaList;