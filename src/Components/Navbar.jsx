import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 h-16 flex items-center px-4 border-b border-gray-200 z-50">
        <Link to="/" className="text-2xl font-semibold text-teal-500">DeliverIA</Link>
        <div className="ml-10 flex gap-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-teal-500 px-3 py-2 rounded-md transition-colors duration-200">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/inventario" className="flex items-center gap-2 text-gray-600 hover:text-teal-500 px-3 py-2 rounded-md transition-colors duration-200">
            <i className="fas fa-box"></i> Inventario
          </Link>
          <Link to="/predicciones" className="flex items-center gap-2 text-gray-600 hover:text-teal-500 px-3 py-2 rounded-md transition-colors duration-200">
            <i className="fas fa-chart-line"></i> Predicciones
          </Link>
          <Link to="/pedidos" className="flex items-center gap-2 text-gray-600 hover:text-teal-500 px-3 py-2 rounded-md transition-colors duration-200">
            <i className="fas fa-shopping-cart"></i> Pedidos
          </Link>
          <Link to="/financiamiento" className="flex items-center gap-2 text-gray-600 hover:text-teal-500 px-3 py-2 rounded-md transition-colors duration-200">
            <i className="fas fa-credit-card"></i> Financiamiento
          </Link>
        </div>
      </nav>
  )
}
