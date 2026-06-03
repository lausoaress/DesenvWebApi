import { Plus, RefreshCw, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToast } from '../../hooks/useToast'
import { getProdutos } from '../../services/produtoService'
import {
  atualizarCategoria,
  criarCategoria,
  deletarCategoria,
  getCategorias,
} from '../../services/categoriaService'
import ConfirmDialog from '../ui/ConfirmDialog'
import CategoriaFormModal from './CategoriaFormModal'
import CategoriaTable from './CategoriaTable'

function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [produtos, setProdutos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState(null)
  const [categoriaDeletando, setCategoriaDeletando] = useState(null)

  const toast = useToast()

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setLoading(true)
      const [dadosCategorias, dadosProdutos] = await Promise.all([getCategorias(), getProdutos()])
      setCategorias(dadosCategorias)
      setProdutos(dadosProdutos)
    } catch (error) {
      toast.error('Nao foi possivel carregar os dados. Verifique se a API esta rodando.')
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  function produtosPorCategoria(categoriaId) {
    return produtos.filter((produto) => produto.categoriaId === categoriaId).length
  }

  function handleNovo() {
    setCategoriaEditando(null)
    setIsFormModalOpen(true)
  }

  function handleEditar(categoria) {
    setCategoriaEditando(categoria)
    setIsFormModalOpen(true)
  }

  async function handleSalvar(categoria) {
    try {
      if (categoriaEditando) {
        await atualizarCategoria(categoria.id, categoria)
        setCategorias((prev) =>
          prev.map((cat) => (cat.id === categoria.id ? categoria : cat))
        )
        toast.success(`Categoria "${categoria.nome}" atualizada com sucesso!`)
      } else {
        const novaCategoria = await criarCategoria(categoria)
        setCategorias((prev) => [...prev, novaCategoria])
        toast.success(`Categoria "${categoria.nome}" cadastrada com sucesso!`)
      }

      setIsFormModalOpen(false)
      setCategoriaEditando(null)
    } catch (error) {
      toast.error('Erro ao salvar a categoria.')
      console.error('Erro ao salvar categoria:', error)
    }
  }

  function handleConfirmarDelete(categoria) {
    setCategoriaDeletando(categoria)
    setIsDeleteDialogOpen(true)
  }

  async function handleDeletar() {
    if (!categoriaDeletando) {
      return
    }

    try {
      await deletarCategoria(categoriaDeletando.id)
      setCategorias((prev) =>
        prev.filter((cat) => cat.id !== categoriaDeletando.id)
      )
      toast.success(`Categoria "${categoriaDeletando.nome}" removida com sucesso!`)
      setIsDeleteDialogOpen(false)
      setCategoriaDeletando(null)
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem || 'Erro ao deletar a categoria.'
      toast.error(mensagem)
      setIsDeleteDialogOpen(false)
      console.error('Erro ao deletar categoria:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
            <Tag className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Categorias</h1>
            <p className="text-sm text-gray-500">
              {categorias.length}{' '}
              {categorias.length === 1 ? 'categoria cadastrada' : 'categorias cadastradas'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={carregarDados}
            title="Recarregar lista"
            className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleNovo}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Nova Categoria
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="h-6 w-6 animate-spin text-emerald-500" />
          <span className="ml-3 text-gray-500">Carregando categorias...</span>
        </div>
      ) : (
        <CategoriaTable
          categorias={categorias}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEditar={handleEditar}
          onDeletar={handleConfirmarDelete}
          produtosPorCategoria={produtosPorCategoria}
        />
      )}

      <CategoriaFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setCategoriaEditando(null)
        }}
        categoriaEditando={categoriaEditando}
        onSalvar={handleSalvar}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setCategoriaDeletando(null)
        }}
        onConfirm={handleDeletar}
        title="Deletar Categoria"
        message={
          categoriaDeletando
            ? `Tem certeza que deseja excluir a categoria "${categoriaDeletando.nome}"? Categorias com produtos associados nao podem ser deletadas.`
            : ''
        }
      />
    </div>
  )
}

export default CategoriasPage