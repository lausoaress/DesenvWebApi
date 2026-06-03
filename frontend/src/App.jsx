import { Navigate, Route, Routes } from 'react-router-dom'
import CategoriasPage from './components/categorias/CategoriasPage'
import Layout from './components/layout/Layout'
import ProdutosPage from './components/produtos/ProdutosPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/produtos" replace />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
      </Route>
    </Routes>
  )
}

export default App
