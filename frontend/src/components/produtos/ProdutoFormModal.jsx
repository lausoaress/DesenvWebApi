import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'

function ProdutoFormModal({ isOpen, onClose, produtoEditando, onSalvar, categorias }) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [categoriaId, setCategoriaId] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (produtoEditando) {
        setNome(produtoEditando.nome || '')
        setDescricao(produtoEditando.descricao || '')
        setPreco(produtoEditando.preco?.toString() || '')
        setQuantidade(produtoEditando.quantidade?.toString() || '')
        setCategoriaId(produtoEditando.categoriaId?.toString() || '')
      } else {
        setNome('')
        setDescricao('')
        setPreco('')
        setQuantidade('')
        setCategoriaId('')
      }
    }
  }, [isOpen, produtoEditando])

  function handleSubmit(event) {
    event.preventDefault()

    const produto = {
      nome,
      descricao,
      preco: Number.parseFloat(preco),
      quantidade: Number.parseInt(quantidade, 10),
    }

    if (categoriaId) {
      produto.categoriaId = Number.parseInt(categoriaId, 10)
    }

    if (produtoEditando) {
      produto.id = produtoEditando.id
    }

    onSalvar(produto)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={produtoEditando ? 'Editar Produto' : 'Novo Produto'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="mb-1 block text-sm font-medium text-gray-700">
            Nome do Produto
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Notebook Dell XPS 15"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="descricao" className="mb-1 block text-sm font-medium text-gray-700">
            Descricao <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <input
            id="descricao"
            type="text"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Ex: 16GB RAM, SSD 512GB"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {categorias && categorias.length > 0 ? (
          <div>
            <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(event) => setCategoriaId(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Selecione uma categoria --</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="preco" className="mb-1 block text-sm font-medium text-gray-700">
              Preco (R$)
            </label>
            <input
              id="preco"
              type="number"
              step="0.01"
              min="0"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              placeholder="0.00"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="quantidade" className="mb-1 block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              id="quantidade"
              type="number"
              min="0"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
              placeholder="0"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {produtoEditando ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ProdutoFormModal