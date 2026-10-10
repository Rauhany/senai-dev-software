
export interface Produto {
  id: number
  nome: string
  preco: number
}

export type NovoProduto = Omit<Produto, 'id'>