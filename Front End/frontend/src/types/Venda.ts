export interface Venda {
  idvendas: number;
  data_venda: Date;
  valor_total: number;
  ProdutoId: number;
  ClienteId: number;
  quantidade: number;
}

export type NovaVenda = Omit<Venda, 'idvendas' | 'data_venda' | 'valor_total'>;