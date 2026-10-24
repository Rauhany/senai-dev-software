
import type { Venda } from "../types/Venda";

interface VendaListProps {
  vendas: Venda[];
  loading: boolean;
}

export default function VendaList({
  vendas,
  loading,
}: VendaListProps) {
  const moeda = (valor: number) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const dataFormatada = (data: string) => {
    if (!data || data.startsWith("0001-01-01")) {
      return "Data não informada";
    }

    const dataObj = new Date(data);

    if (Number.isNaN(dataObj.getTime())) {
      return "Data inválida";
    }

    return dataObj.toLocaleString("pt-BR");
  };

  if (loading) {
    return <p>Carregando vendas...</p>;
  }

  if (vendas.length === 0) {
    return <p>Nenhuma venda cadastrada.</p>;
  }

  return (
    <section>
      <h2>Vendas cadastradas ({vendas.length})</h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Data da venda</th>
              <th>Cliente</th>
              <th>E-mail</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor total</th>
            </tr>
          </thead>

          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{dataFormatada(venda.dataVenda)}</td>
                <td>
                  {venda.nomeCliente || "Cliente não identificado"}
                  <br />
                  <small>ID: {venda.clienteId}</small>
                </td>
                <td>{venda.emailCliente || "E-mail não informado"}</td>
                <td>
                  {venda.nomeProduto || "Produto não identificado"}
                  <br />
                  <small>ID: {venda.produtoId}</small>
                </td>
                <td>{venda.quantidade}</td>
                <td>{moeda(venda.valorTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
