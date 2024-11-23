import { useState, useEffect } from "react";
import productosJson from "../data/productos.json";

const Pedidos = () => {
  // Estado para los productos
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [colorModal, setColorModal] = useState("bg-white");
  const [carrito, setCarrito] = useState([]);
  const [mostrarFactura, setMostrarFactura] = useState(false);

  // Cargar los productos desde el JSON simulado
  useEffect(() => {
    const productosData = productosJson;
    setProductos(productosData);
  }, []);

  // Manejar la selección del producto
  const handleProductoChange = (e) => {
    const producto = productos.find(p => p.id === parseInt(e.target.value));
    setProductoSeleccionado(producto);
    setCantidad(0); // Resetear la cantidad seleccionada
    setMensaje(""); // Resetear mensaje
  };

  // Manejar la cantidad de productos seleccionados
  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  // Validar y actualizar la cantidad de productos
  const handlePedido = () => {
    if (!productoSeleccionado) {
      setMensaje("Por favor, selecciona un producto.");
      setColorModal("bg-red-100");
      return;
    }
    if (cantidad <= 0 || cantidad > productoSeleccionado.quantity) {
      setMensaje("La cantidad seleccionada no es válida.");
      setColorModal("bg-red-100");
      return;
    }

    const nuevosProductos = productos.map(producto => 
      producto.id === productoSeleccionado.id
        ? { ...producto, quantity: producto.quantity - cantidad }
        : producto
    );

    const productoEnCarrito = carrito.find(p => p.id === productoSeleccionado.id);
    let nuevoCarrito;
    if (productoEnCarrito) {
      nuevoCarrito = carrito.map(p =>
        p.id === productoSeleccionado.id
          ? { ...p, quantity: p.quantity + parseInt(cantidad) }
          : p
      );
    } else {
      nuevoCarrito = [...carrito, { ...productoSeleccionado, quantity: parseInt(cantidad) }];
    }

    setProductos(nuevosProductos);
    setCarrito(nuevoCarrito);
    setMensaje(`Pedido realizado con éxito. Has comprado ${cantidad} unidades de ${productoSeleccionado.name}.`);
    setColorModal("bg-green-100");
    setMostrarFactura(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Formulario de usuario */}
      <div className="mt-16 mb-5 p-5 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ingresa tus datos</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Nombre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div>
            <label className="block text-gray-600">Correo electrónico</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
        </div>
      </div>

      {/* Tarjeta de productos disponibles */}
      <div className="mb-5 p-5 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Productos Disponibles</h2>
        <div>
          <label className="block text-gray-600">Selecciona un producto</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={handleProductoChange}
          >
            <option value="">Selecciona un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.name} - {producto.quantity} disponibles
              </option>
            ))}
          </select>
        </div>

        {productoSeleccionado && (
          <div>
            <label className="block text-gray-600">Cantidad</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={cantidad}
              onChange={handleCantidadChange}
              min="1"
              max={productoSeleccionado.quantity}
              placeholder="Cantidad a comprar"
            />
            <button
              className="w-full bg-teal-500 text-white p-3 rounded-md"
              onClick={handlePedido}
            >
              Realizar Pedido
            </button>
          </div>
        )}
      </div>

      {/* Mensajes de validación */}
      {mensaje && (
        <div className={`mt-4 p-4 text-black rounded-md ${colorModal}`}>
          {mensaje}
        </div>
      )}

      {/* Carrito de compras */}
      <div className="mt-5 p-5 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul>
            {carrito.map((producto) => (
              <li key={producto.id}>
                {producto.name} - {producto.quantity} unidades
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de factura */}
      {mostrarFactura && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Factura</h2>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <h3 className="text-lg font-semibold mt-4">Productos:</h3>
            <ul>
              {carrito.map((producto) => (
                <li key={producto.id}>
                  {producto.name} - {producto.quantity} unidades
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-teal-500 text-white p-2 rounded-md"
              onClick={() => setMostrarFactura(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;