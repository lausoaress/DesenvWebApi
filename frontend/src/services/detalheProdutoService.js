import axios from 'axios'

const API_URL = import.meta.env.VITE_DETALHE_API_URL || 'http://localhost:5075/api/detalhesproduto'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getDetalhePorProduto(produtoId) {
  const response = await api.get(`/produto/${produtoId}`)
  return response.data
}

export async function criarDetalhe(detalhe) {
  const response = await api.post('/', detalhe)
  return response.data
}

export async function atualizarDetalhe(id, detalhe) {
  const response = await api.put(`/${id}`, detalhe)
  return response.data
}

export async function deletarDetalhe(id) {
  const response = await api.delete(`/${id}`)
  return response.data
}