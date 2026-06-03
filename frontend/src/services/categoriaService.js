import axios from 'axios'

const API_URL = import.meta.env.VITE_CATEGORIA_API_URL || 'http://localhost:5075/api/categorias'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getCategorias() {
  const response = await api.get('/')
  return response.data
}

export async function getCategoria(id) {
  const response = await api.get(`/${id}`)
  return response.data
}

export async function criarCategoria(categoria) {
  const response = await api.post('/', categoria)
  return response.data
}

export async function atualizarCategoria(id, categoria) {
  const response = await api.put(`/${id}`, categoria)
  return response.data
}

export async function deletarCategoria(id) {
  const response = await api.delete(`/${id}`)
  return response.data
}