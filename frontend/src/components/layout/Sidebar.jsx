import { FileText, Package, ShoppingCart, Tag } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/produtos', label: 'Produtos', icon: ShoppingCart, enabled: true },
  { to: '/categorias', label: 'Categorias', icon: Tag, enabled: true },
  { to: '/detalhes', label: 'Detalhes', icon: FileText, enabled: false },
]

function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col bg-gray-900 text-white">
      <div className="border-b border-gray-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="leading-tight text-lg font-bold">GestaoPro</h1>
            <p className="text-xs text-gray-400">Gerenciador de Produtos</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.to}>
              {item.enabled ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ) : (
                <span className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                  <span className="ml-auto rounded bg-gray-700 px-1.5 py-0.5 text-[10px] text-gray-400">
                    Em breve
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 px-6 py-4">
        <p className="text-xs text-gray-500">Desenv. Sistemas Web</p>
        <p className="text-xs text-gray-600">Prof. Matheus Cataneo</p>
      </div>
    </aside>
  )
}

export default Sidebar