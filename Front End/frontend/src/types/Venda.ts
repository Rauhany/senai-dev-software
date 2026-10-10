export interface Venda {
  id: string | number;
  idproduto: string | number;
  quantidade: number;
  valor_total: number;
  data_venda: string;
}

export interface RealizarVendaPayload {
  clienteId: string | number;
  produtoId: string | number;
  quantidade: number;
}

const API_BASE_URL = 'http://localhost:5162/vendas';
const ENDPOINT = `${API_BASE_URL}/venda`;

export const vendaService = {
  async realizarVenda(dados: RealizarVendaPayload): Promise<Response> {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    return response;
  },

  async listarVendas(): Promise<Venda[]> {
    const response = await fetch(ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar vendas: ${response.status}`);
    }

    const dados = await response.json();
    return dados as Venda[];
  }
};