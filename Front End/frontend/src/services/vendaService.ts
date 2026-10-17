import api from './api'
import type { Venda,  NovaVenda } from '../types/Venda'

export const vendaService = {

  listar: async (): Promise<Venda []> => {
    const { data } = await api.get('/venda')
    return data
  },

  criar: async (v: NovaVenda): Promise<Venda> => {
    const { data } = await api.post('/venda', v)
    return data 
  }

}