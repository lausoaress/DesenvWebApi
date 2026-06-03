import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'

function CategoriaFormModal({ isOpen, onClose, categoriaEditando, onSalvar }) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (categoriaEditando) {
        setNome(categoriaEditando.nome || '')
        setDescricao(categoriaEditando.descricao || '')
      } else {
        setNome('')
        setDescricao('')
      }
    }
  }, [isOpen, categoriaEditando])

  function handleSubmit(event) {
    event.preventDefault()

    const categoria = { nome, descricao }

    if (categoriaEditando) {
      categoria.id = categoriaEditando.id
    }

    onSalvar(categoria)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={categoriaEditando ? 'Editar Categoria' : 'Nova Categoria'}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nomeCategoria" className="mb-1 block text-sm font-medium text-gray-700">
            Nome da Categoria
          </label>
          <input
            id="nomeCategoria"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Eletronicos"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="descCategoria" className="mb-1 block text-sm font-medium text-gray-700">
            Descricao <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <textarea
            id="descCategoria"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Ex: Produtos eletronicos e tecnologia"
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
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
            {categoriaEditando ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CategoriaFormModal