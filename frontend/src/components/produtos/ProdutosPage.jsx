import { Plus, RefreshCw, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  atualizarProduto,
  criarProduto,
  deletarProduto,
  getProdutos,
} from '../../services/produtoService'
import { getCategorias } from '../../services/categoriaService'
import { useToast } from '../../hooks/useToast'
import DetalheModal from './DetalheModal'
import ProdutoDeleteDialog from './ProdutoDeleteDialog'
import ProdutoFormModal from './ProdutoFormModal'
import ProdutoTable from './ProdutoTable'

function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetalheModalOpen, setIsDetalheModalOpen] = useState(false)
  const [produtoEditando, setProdutoEditando] = useState(null)
  const [produtoDeletando, setProdutoDeletando] = useState(null)
  const [produtoDetalhes, setProdutoDetalhes] = useState(null)

  const toast = useToast()

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setLoading(true)
      const [dadosProdutos, dadosCategorias] = await Promise.all([
        getProdutos(),
        getCategorias().catch(() => []),
      ])
      setProdutos(dadosProdutos)
      setCategorias(dadosCategorias)
    } catch (error) {
      toast.error('Nao foi possivel carregar os dados.')
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleNovo() {
    setProdutoEditando(null)
    setIsFormModalOpen(true)
  }

  function handleEditar(produto) {
    setProdutoEditando(produto)
    setIsFormModalOpen(true)
  }

  async function handleSalvar(produto) {
    try {
      if (produtoEditando) {
        await atualizarProduto(produto)
        toast.success(`Produto "${produto.nome}" atualizado com sucesso!`)
      } else {
        await criarProduto(produto)
        toast.success(`Produto "${produto.nome}" cadastrado com sucesso!`)
      }

      setIsFormModalOpen(false)
      setProdutoEditando(null)
      await carregarDados()
    } catch (error) {
      toast.error('Erro ao salvar o produto. Verifique os dados e tente novamente.')
      console.error('Erro ao salvar:', error)
    }
  }

  function handleConfirmarDelete(produto) {
    setProdutoDeletando(produto)
    setIsDeleteDialogOpen(true)
  }

  function handleVerDetalhes(produto) {
    setProdutoDetalhes(produto)
    setIsDetalheModalOpen(true)
  }

  async function handleDeletar() {
    if (!produtoDeletando) {
      return
    }

    try {
      await deletarProduto(produtoDeletando.id)
      toast.success(`Produto "${produtoDeletando.nome}" removido com sucesso!`)
      setIsDeleteDialogOpen(false)
      setProdutoDeletando(null)
      await carregarDados()
    } catch (error) {
      toast.error('Erro ao deletar o produto.')
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Produtos</h1>
            <p className="text-sm text-gray-500">
              {produtos.length}{' '}
              {produtos.length === 1 ? 'produto cadastrado' : 'produtos cadastrados'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={carregarDados}
            title="Recarregar lista"
            className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleNovo}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-3 text-gray-500">Carregando produtos...</span>
        </div>
      ) : (
        <ProdutoTable
          produtos={produtos}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEditar={handleEditar}
          onDeletar={handleConfirmarDelete}
          onVerDetalhes={handleVerDetalhes}
        />
      )}

      <ProdutoFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setProdutoEditando(null)
        }}
        produtoEditando={produtoEditando}
        onSalvar={handleSalvar}
        categorias={categorias}
      />

      <ProdutoDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setProdutoDeletando(null)
        }}
        onConfirm={handleDeletar}
        produto={produtoDeletando}
      />

      <DetalheModal
        isOpen={isDetalheModalOpen}
        onClose={() => {
          setIsDetalheModalOpen(false)
          setProdutoDetalhes(null)
        }}
        produto={produtoDetalhes}
      />
    </div>
  )
}

export default ProdutosPage