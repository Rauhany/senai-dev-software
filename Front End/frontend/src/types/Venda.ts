
export interface Venda {
  id: number;
  dataVenda: string;
  valorTotal: number;
  quantidade: number;
  produtoId: number;
  clienteId: number;
  nomeProduto: string;
  nomeCliente: string;
  emailCliente: string;
}

export type NovaVenda = Pick<
  Venda,
  "quantidade" | "produtoId" | "clienteId"
>;
