import { useEffect, useState } from 'react'
import { FileText, Loader, Save, Trash2 } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import {
  atualizarDetalhe,
  criarDetalhe,
  deletarDetalhe,
  getDetalhePorProduto,
} from '../../services/detalheProdutoService'
import Modal from '../ui/Modal'

function DetalheModal({ isOpen, onClose, produto }) {
  const [detalhe, setDetalhe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [existe, setExiste] = useState(false)
  const [especificacoes, setEspecificacoes] = useState('')
  const [garantia, setGarantia] = useState('')
  const [paisDeOrigem, setPaisDeOrigem] = useState('')
  const [pesoGramas, setPesoGramas] = useState('')

  const toast = useToast()

  useEffect(() => {
    if (isOpen && produto) {
      carregarDetalhe()
    }
  }, [isOpen, produto])

  async function carregarDetalhe() {
    if (!produto) {
      return
    }

    try {
      setLoading(true)
      const data = await getDetalhePorProduto(produto.id)

      setDetalhe(data)
      setExiste(true)
      setEspecificacoes(data.especificacoes || '')
      setGarantia(data.garantia || '')
      setPaisDeOrigem(data.paisDeOrigem || '')
      setPesoGramas(data.pesoGramas?.toString() || '')
    } catch (error) {
      if (error.response?.status === 404) {
        setDetalhe(null)
        setExiste(false)
        setEspecificacoes('')
        setGarantia('')
        setPaisDeOrigem('')
        setPesoGramas('')
      } else {
        toast.error('Erro ao carregar detalhes do produto.')
        console.error('Erro ao carregar detalhes:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleSalvar(event) {
    event.preventDefault()

    if (!produto) {
      return
    }

    try {
      const dados = {
        especificacoes,
        garantia,
        paisDeOrigem,
        pesoGramas: pesoGramas ? Number.parseFloat(pesoGramas) : null,
        produtoId: produto.id,
      }

      if (existe && detalhe) {
        await atualizarDetalhe(detalhe.id, { ...dados, id: detalhe.id })
        toast.success('Detalhes atualizados com sucesso!')
      } else {
        await criarDetalhe(dados)
        toast.success('Detalhes cadastrados com sucesso!')
        setExiste(true)
      }

      await carregarDetalhe()
    } catch (error) {
      toast.error('Erro ao salvar os detalhes.')
      console.error('Erro ao salvar detalhes:', error)
    }
  }

  async function handleDeletar() {
    if (!detalhe) {
      return
    }

    try {
      await deletarDetalhe(detalhe.id)
      toast.success('Detalhes removidos com sucesso!')
      setDetalhe(null)
      setExiste(false)
      setEspecificacoes('')
      setGarantia('')
      setPaisDeOrigem('')
      setPesoGramas('')
    } catch (error) {
      toast.error('Erro ao remover os detalhes.')
      console.error('Erro ao remover detalhes:', error)
    }
  }

  if (!produto) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalhes - ${produto.nome}`} size="lg">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-3 text-gray-500">Carregando detalhes...</span>
        </div>
      ) : (
        <form onSubmit={handleSalvar} className="space-y-4">
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              existe ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
            }`}
          >
            <FileText className="h-4 w-4" />
            {existe
              ? 'Este produto ja possui detalhes cadastrados. Edite abaixo.'
              : 'Este produto ainda nao possui detalhes. Preencha abaixo para cadastrar.'}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Especificacoes Tecnicas
            </label>
            <textarea
              value={especificacoes}
              onChange={(event) => setEspecificacoes(event.target.value)}
              placeholder="Ex: Processador: i7 13a geracao, RAM: 16GB DDR5, SSD: 512GB NVMe"
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Garantia</label>
            <input
              type="text"
              value={garantia}
              onChange={(event) => setGarantia(event.target.value)}
              placeholder="Ex: 1 ano pelo fabricante + 90 dias adicionais"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Pais de Origem
              </label>
              <input
                type="text"
                value={paisDeOrigem}
                onChange={(event) => setPaisDeOrigem(event.target.value)}
                placeholder="Ex: China"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Peso (gramas)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={pesoGramas}
                onChange={(event) => setPesoGramas(event.target.value)}
                placeholder="Ex: 1850"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 border-t border-gray-200 pt-4">
            {existe ? (
              <button
                type="button"
                onClick={handleDeletar}
                className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Remover Detalhes
              </button>
            ) : null}

            <div className="flex-1" />

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Fechar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              {existe ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}

export default DetalheModal