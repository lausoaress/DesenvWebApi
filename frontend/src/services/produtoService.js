import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5075/api/produtos'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getProdutos() {
  const response = await api.get('/')
  return response.data
}

export async function getProduto(id) {
  const response = await api.get(`/${id}`)
  return response.data
}

export async function criarProduto(produto) {
  const response = await api.post('/', produto)
  return response.data
}

export async function atualizarProduto(produto) {
  const response = await api.put(`/${produto.id}`, produto)
  return response.data
}

export async function deletarProduto(id) {
  const response = await api.delete(`/${id}`)
  return response.data
}