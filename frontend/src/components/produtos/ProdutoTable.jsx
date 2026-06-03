import { FileText, PackageOpen, Pencil, Search, Trash2 } from 'lucide-react'

function ProdutoTable({ produtos, searchTerm, onSearchChange, onEditar, onDeletar, onVerDetalhes }) {
  const produtosFiltrados = produtos.filter((produto) => {
    const termo = searchTerm.toLowerCase()

    return (
      produto.nome.toLowerCase().includes(termo) ||
      (produto.descricao && produto.descricao.toLowerCase().includes(termo)) ||
      (produto.categoria && produto.categoria.nome.toLowerCase().includes(termo))
    )
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou descricao..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <PackageOpen className="mb-3 h-12 w-12" />
          <p className="text-sm font-medium">
            {searchTerm
              ? 'Nenhum produto encontrado para esta busca.'
              : 'Nenhum produto cadastrado.'}
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Descricao
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Categoria
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Preco
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                Estoque
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{produto.nome}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{produto.descricao || '—'}</span>
                </td>
                <td className="px-6 py-4">
                  {produto.categoria ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      {produto.categoria.nome}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Sem categoria</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    R$ {Number(produto.preco ?? 0).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      produto.quantidade > 10
                        ? 'bg-green-100 text-green-800'
                        : produto.quantidade > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {produto.quantidade} un.
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onVerDetalhes(produto)}
                      title="Ver detalhes tecnicos"
                      className="rounded-lg p-2 text-purple-600 transition-colors hover:bg-purple-50"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditar(produto)}
                      title="Editar produto"
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeletar(produto)}
                      title="Deletar produto"
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ProdutoTable