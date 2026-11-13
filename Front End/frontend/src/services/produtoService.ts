import api from './api'
import type { Produto, NovoProduto } from '../types/Produto'

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const { data } = await api.get('/produto')
    return data
  },

  buscarPorId: async (id: number): Promise<Produto> => {
    const { data } = await api.get(`/produto/${id}`)
    return data
  },

  criar: async (p: NovoProduto): Promise<Produto> => {
    const { data } = await api.post('/produto', p)
    return data
  },

  atualizar: async (id: number, p: Partial<NovoProduto>): Promise<Produto> => {
    const { data } = await api.put(`/produto/${id}`, p)
    return data
  },

  uploadFoto: async (id: number, arquivo: File): Promise<string> => {
    const formData = new FormData()
    formData.append('arquivo', arquivo) // nome = parâmetro do Controller

    const { data } = await api.post(
      `/produtos/${id}/foto`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return data.fotoBase64 // ← data URL retornada pelo backend
  },

  removerFoto: async (id: number): Promise<void> => {
    await api.delete(`/produtos/${id}/foto`)
  },
}
