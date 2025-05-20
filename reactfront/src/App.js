import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar.js';
import './App.css';
import OffersCarousel from './components/OffersCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductoPage from './components/ProductPage.js'; // Lo crearás en el siguiente paso

function App() {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);

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
        setUsuario({ CorreoUsuario: payload.correo });
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

  return (
    <Router>
      <div className="app">
        <header className="topbar">
          <Navbar usuario={usuario} setUsuario={setUsuario} />
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
                      <a href={`/producto/${p.idProducto}`}>
                        <img src={p.ImagenProducto || 'https://via.placeholder.com/150?text=Sin+Imagen'} alt={p.NombreProducto} />
                        <h3>{p.NombreProducto}</h3>
                        <p>${p.PrecioProducto}</p>
                      </a>
                    </div>
                  ))}
                </section>
              </>
            }
          />
          <Route path="/producto/:id" element={<ProductoPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;