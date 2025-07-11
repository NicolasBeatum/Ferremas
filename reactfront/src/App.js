import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar.js';
import './App.css';
import OffersCarousel from './components/OffersCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductoPage from './components/ProductPage.js'; 
import Cart from './components/Cart.js';
import OrderHistory from './components/OrderHistory.js'; 
import ResultadoPago from './components/ResultadoPago';
import Catalogo from './components/Catalogo';
import AdminProductos from './components/AdminProductos';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import useMostrarPrecio from './helpers/mostrarPrecio';

function App() {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUsuario({ 
          CorreoUsuario: payload.correo, 
          idUsuario: payload.id,
          idTipoUsuario: payload.tipo 
        });
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const productosAleatorios = React.useMemo(() => {
    if (productos.length <= 4) return productos;
    const mezclados = [...productos].sort(() => Math.random() - 0.5);
    return mezclados.slice(0, 4);
  }, [productos]);

  // Filtrar productos según búsqueda
  const productosFiltrados = busqueda
    ? productos.filter(p =>
        p.NombreProducto.toLowerCase().includes(busqueda.toLowerCase())
      )
    : productosAleatorios;

  // Añadir producto al carrito
  const addToCart = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.idProducto === producto.idProducto);
      const cantidad = producto.cantidad || 1;
      
      if (existe) {
        return prev.map(item =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  // Quitar producto del carrito
  const removeFromCart = (idProducto) => {
    setCarrito(prev => prev.filter(item => item.idProducto !== idProducto));
  };

  // Cambiar cantidad de productos en el carrito
  const updateQuantity = (idProducto, cantidad) => {
    setCarrito(prev =>
      prev.map(item =>
        item.idProducto === idProducto && cantidad > 0
          ? { ...item, cantidad }
          : item
      )
    );
  };

  // Handler para acceso al carrito
  const handleCartClick = (navigate) => {
    if (!usuario) {
      alert('Tienes que estar logeado para poder comprar');
      return;
    }
    navigate('/carrito');
  };

  // Handler para historial de pedidos
  const handleHistoryClick = (navigate) => {
    if (!usuario) {
      alert('Debes iniciar sesión para ver tu historial.');
      return;
    }
    navigate('/historial');
  };

  // Handler para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('carrito');
    setUsuario(null);
    setCarrito([]);
  };

  return (
    <Router>
      <AppContent
        usuario={usuario}
        setUsuario={setUsuario}
        carrito={carrito}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        productosFiltrados={productosFiltrados}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        handleCartClick={handleCartClick}
        handleHistoryClick={handleHistoryClick}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

// Separamos el contenido para poder usar useNavigate
function AppContent({
  usuario, setUsuario, carrito, addToCart, removeFromCart, updateQuantity, productosFiltrados, busqueda, setBusqueda, handleCartClick, handleHistoryClick, handleLogout
}) {
  const navigate = useNavigate();
  const mostrarPrecio = useMostrarPrecio();

  return (
    <div className="app">
      <header className="topbar">
        <Navbar
          usuario={usuario}
          setUsuario={setUsuario}
          cartCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          onCartClick={() => handleCartClick(navigate)}
          onHistoryClick={() => handleHistoryClick(navigate)}
          onLogout={handleLogout}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="hero">
                <h2>¡Bienvenido a Ferremas!</h2>
                <p>Encuentra todo lo que necesitas para tu hogar</p>
              </div>
              <OffersCarousel />
              <section className="productos">
                {productosFiltrados.length === 0 ? (
                  <p style={{ textAlign: "center" }}>No se encontraron productos.</p>
                ) : (
                  productosFiltrados.map((p, index) => (
                    <div key={p.idProducto || index} className="producto">
                      <Link to={`/producto/${p.idProducto}`}>
                        <img src={p.ImagenProducto || 'https://via.placeholder.com/150?text=Sin+Imagen'} alt={p.NombreProducto} />
                        <h3>{p.NombreProducto}</h3>
                        <p>{mostrarPrecio(p.PrecioProducto)}</p>
                      </Link>
                    </div>
                  ))
                )}
              </section>
            </>
          }
        />
        <Route path="/producto/:id" element={<ProductoPage addToCart={addToCart} />} />
        <Route path="/carrito" element={<Cart carrito={carrito} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/historial" element={<OrderHistory />} />
        <Route path="/resultado-pago" element={<ResultadoPago />} />
        <Route path="/catalogo" element={<Catalogo addToCart={addToCart} usuario={usuario} />} />
        <Route 
          path="/admin-productos" 
          element={
            <ProtectedAdminRoute usuario={usuario}>
              <AdminProductos />
            </ProtectedAdminRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;