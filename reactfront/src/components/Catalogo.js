import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useMostrarPrecio from '../helpers/mostrarPrecio.js';
import './Catalogo.css';

const Catalogo = ({ addToCart, usuario }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenarPor, setOrdenarPor] = useState('nombre');
  const [orden, setOrden] = useState('asc');
  const [cantidades, setCantidades] = useState({});
  const [updatingStock, setUpdatingStock] = useState({});
  const [productoAgregado, setProductoAgregado] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const mostrarPrecio = useMostrarPrecio();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/productos');
        setProductos(res.data);
        setProductosFiltrados(res.data);
      } catch (error) {
        setProductos([]);
        setProductosFiltrados([]);
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  // Función para ordenar productos
  const ordenarProductos = (productos, criterio, direccion) => {
    const productosOrdenados = [...productos];
    
    productosOrdenados.sort((a, b) => {
      let valorA, valorB;
      
      switch (criterio) {
        case 'precio':
          valorA = a.PrecioProducto;
          valorB = b.PrecioProducto;
          break;
        case 'nombre':
          valorA = a.NombreProducto.toLowerCase();
          valorB = b.NombreProducto.toLowerCase();
          break;
        case 'stock':
          valorA = a.StockProducto;
          valorB = b.StockProducto;
          break;
        default:
          valorA = a.NombreProducto.toLowerCase();
          valorB = b.NombreProducto.toLowerCase();
      }
      
      if (direccion === 'asc') {
        return valorA > valorB ? 1 : -1;
      } else {
        return valorA < valorB ? 1 : -1;
      }
    });
    
    return productosOrdenados;
  };

  // Efecto para ordenar productos cuando cambian los criterios
  useEffect(() => {
    const productosOrdenados = ordenarProductos(productos, ordenarPor, orden);
    setProductosFiltrados(productosOrdenados);
  }, [productos, ordenarPor, orden]);



  // Función para agregar al carrito
  const handleAddToCart = (producto) => {
    if (!usuario) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    
    // Agregar la cantidad correcta al carrito
    const cantidad = cantidades[producto.idProducto] || 1;
    const productoConCantidad = { ...producto, cantidad };
    
    addToCart(productoConCantidad);
    
    // Mostrar animación de check
    setProductoAgregado(producto.idProducto);
    
    // Mostrar toast de confirmación
    setToastMessage(`${producto.NombreProducto} agregado al carrito (${cantidad} unidad${cantidad > 1 ? 'es' : ''})`);
    setShowToast(true);
    
    // Resetear cantidad después de agregar
    setCantidades(prev => ({ ...prev, [producto.idProducto]: 1 }));
    
    setTimeout(() => {
      setProductoAgregado(null);
    }, 2000);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Función para actualizar stock (solo administradores)
  const handleUpdateStock = async (idProducto, nuevoStock) => {
    if (!usuario || usuario.idTipoUsuario !== 3) {
      alert('Solo los administradores pueden modificar el stock');
      return;
    }

    setUpdatingStock(prev => ({ ...prev, [idProducto]: true }));

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8000/api/productos/${idProducto}`, {
        StockProducto: nuevoStock
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizar el producto en el estado local
      setProductos(prev => prev.map(p => 
        p.idProducto === idProducto 
          ? { ...p, StockProducto: nuevoStock }
          : p
      ));

      alert('Stock actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      alert('Error al actualizar el stock');
    } finally {
      setUpdatingStock(prev => ({ ...prev, [idProducto]: false }));
    }
  };

  // Función para cambiar cantidad
  const handleCantidadChange = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad < 0) return;
    setCantidades(prev => ({ ...prev, [idProducto]: nuevaCantidad }));
  };

  if (loading) return <div style={{ padding: 40 }}>Cargando catálogo...</div>;

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <h2>Catálogo de Productos</h2>
        <div className="ordenamiento-controls">
          <div className="select-container">
            <select 
              value={`${ordenarPor}-${orden}`}
              onChange={(e) => {
                const [criterio, direccion] = e.target.value.split('-');
                setOrdenarPor(criterio);
                setOrden(direccion);
              }}
              className="select-ordenar"
            >
              <option value="nombre-asc">Nombre A-Z</option>
              <option value="nombre-desc">Nombre Z-A</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="stock-asc">Stock: Menor a Mayor</option>
              <option value="stock-desc">Stock: Mayor a Menor</option>
            </select>
            <div className="select-arrow">▼</div>
          </div>
        </div>
      </div>
      
      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.idProducto} className={`producto-card ${productoAgregado === producto.idProducto ? 'agregado' : ''}`}>
            <Link to={`/producto/${producto.idProducto}`}>
              <img
                src={producto.ImagenProducto || 'https://via.placeholder.com/150?text=Sin+Imagen'}
                alt={producto.NombreProducto}
                className="producto-imagen"
              />
              <h4 className="producto-nombre">{producto.NombreProducto}</h4>
              <div className="producto-precio">
                {mostrarPrecio(producto.PrecioProducto)}
              </div>
            </Link>
            
            <div className="producto-stock">
              Stock: {producto.StockProducto}
            </div>

            {/* Controles de cantidad y carrito */}
            <div className="producto-controles">
              <div className="cantidad-controls">
                <button 
                  className="btn-cantidad"
                  onClick={() => handleCantidadChange(producto.idProducto, (cantidades[producto.idProducto] || 1) - 1)}
                  disabled={(cantidades[producto.idProducto] || 1) <= 1}
                >
                  -
                </button>
                <span className="cantidad-display">
                  {cantidades[producto.idProducto] || 1}
                </span>
                <button 
                  className="btn-cantidad"
                  onClick={() => handleCantidadChange(producto.idProducto, (cantidades[producto.idProducto] || 1) + 1)}
                  disabled={(cantidades[producto.idProducto] || 1) >= producto.StockProducto}
                >
                  +
                </button>
              </div>

              <button 
                className={`btn-agregar-carrito ${productoAgregado === producto.idProducto ? 'agregado' : ''}`}
                onClick={() => handleAddToCart(producto)}
                disabled={producto.StockProducto === 0 || productoAgregado === producto.idProducto}
              >
                {productoAgregado === producto.idProducto ? (
                  <span className="check-animation">✓ Agregado</span>
                ) : (
                  '🛒 Agregar'
                )}
              </button>
            </div>

            {/* Controles de administrador para stock */}
            {usuario && usuario.idTipoUsuario === 3 && (
              <div className="admin-controls">
                <div className="stock-controls">
                  <input
                    type="number"
                    className="stock-input"
                    placeholder="Nuevo stock"
                    min="0"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const nuevoStock = parseInt(e.target.value);
                        if (!isNaN(nuevoStock) && nuevoStock >= 0) {
                          handleUpdateStock(producto.idProducto, nuevoStock);
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <button 
                    className="btn-actualizar-stock"
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="Nuevo stock"]`);
                      const nuevoStock = parseInt(input?.value);
                      if (!isNaN(nuevoStock) && nuevoStock >= 0) {
                        handleUpdateStock(producto.idProducto, nuevoStock);
                        input.value = '';
                      }
                    }}
                    disabled={updatingStock[producto.idProducto]}
                  >
                    {updatingStock[producto.idProducto] ? '...' : 'Actualizar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {productosFiltrados.length === 0 && !loading && (
        <div className="no-productos">
          No se encontraron productos.
        </div>
      )}
      
      {/* Toast de confirmación */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✓</span>
            <span className="toast-message">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;