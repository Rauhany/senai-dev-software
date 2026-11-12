
export interface Produto {
  id: number
  nome: string
  preco: number
  estoque: number
  ativo: boolean
  fotoBase64?: string | null
}

export type NovoProduto = Omit<Produto, 'id'>