import api from './api'
import type { produto, NovoProduto } from '../types/Produto'

export const produtoService = {

  listar: async (): Promise<produto[]> => {
    const { data } = await api.get('/produto')
    return data
  },

  criar: async (p: NovoProduto): Promise<produto> => {
    const { data } = await api.post('/produto', p)
    return data
  }

}