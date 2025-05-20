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
import OrderHistory from './components/OrderHistory.js'; // Asegúrate de crear este archivo
import ResultadoPago from './components/ResultadoPago';
import Catalogo from './components/Catalogo';

function App() {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);

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
        setUsuario({ CorreoUsuario: payload.correo, id: payload.id });
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const productosAleatorios = React.useMemo(() => {
    if (productos.length <= 4) return productos;
    const mezclados = [...productos].sort(() => Math.random() - 0.5);
    return mezclados.slice(0, 4);
  }, [productos]);

  // Añadir producto al carrito
  const addToCart = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.idProducto === producto.idProducto);
      if (existe) {
        return prev.map(item =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
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

  return (
    <Router>
      <AppContent
        usuario={usuario}
        setUsuario={setUsuario}
        carrito={carrito}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        productosAleatorios={productosAleatorios}
        handleCartClick={handleCartClick}
        handleHistoryClick={handleHistoryClick}
      />
    </Router>
  );
}

// Separamos el contenido para poder usar useNavigate
function AppContent({
  usuario, setUsuario, carrito, addToCart, removeFromCart, updateQuantity, productosAleatorios, handleCartClick, handleHistoryClick
}) {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="topbar">
        <Navbar
          usuario={usuario}
          setUsuario={setUsuario}
          cartCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          onCartClick={() => handleCartClick(navigate)}
          onHistoryClick={() => handleHistoryClick(navigate)}
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
                {productosAleatorios.map((p, index) => (
                  <div key={p.idProducto || index} className="producto">
                    <Link to={`/producto/${p.idProducto}`}>
                      <img src={p.ImagenProducto || 'https://via.placeholder.com/150?text=Sin+Imagen'} alt={p.NombreProducto} />
                      <h3>{p.NombreProducto}</h3>
                      <p>${p.PrecioProducto}</p>
                    </Link>
                  </div>
                ))}
              </section>
            </>
          }
        />
        <Route path="/producto/:id" element={<ProductoPage addToCart={addToCart} />} />
        <Route path="/carrito" element={<Cart carrito={carrito} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/historial" element={<OrderHistory />} />
        <Route path="/resultado-pago" element={<ResultadoPago />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;