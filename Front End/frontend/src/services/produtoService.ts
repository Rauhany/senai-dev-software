import api from './api'
import type { Produto } from '../types/Produto.ts'

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const { data } = await api.get('/produto')
    return data
  },
  
  buscarPorId: async (id: number): Promise<Produto> => {
    const { data } = await api.get(`/produto/${id}`)
    return data
  },

  criar: async (body: Omit<Produto, 'id'>): Promise<Produto> => {
    const { data } = await api.post('/produto', body)
    return data
  },

  async atualizar(id: number, body: Partial<Omit<Produto, 'id'>>): Promise<void> {
    await api.put(`/produtos/${id}`, body)
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/produto/${id}`)
  },

  uploadFoto: async (id: number, arquivo: File): Promise<string> => {
  const formData = new FormData()
  formData.append('arquivo', arquivo) // nome = parâmetro do Controller

  const { data } = await api.post(
    `/produtos/${id}/foto`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return data.fotoBase64  // ← data URL retornada pelo backend
},

removerFoto: async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}/foto`)
}
}