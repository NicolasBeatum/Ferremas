import React from 'react';
import Footer from './components/Footer';
import './App.css';
import OffersCarousel from './components/OffersCarousel'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // Simulación de productos
  const productos = [
    { nombre: 'Sample', precio: 1.50, imagen: 'https://via.placeholder.com/150?text=Arroz' },
    { nombre: 'Sample', precio: 1.20, imagen: 'https://via.placeholder.com/150?text=Azúcar' },
    { nombre: 'Sample', precio: 2.00, imagen: 'https://via.placeholder.com/150?text=Aceite' },
    { nombre: 'Sample', precio: 2.50, imagen: 'https://via.placeholder.com/150?text=Huevos' }
  ];

  return (
    <div className="app">
      <header className="topbar">
      <div className="topbar-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Easy_logo.svg/2560px-Easy_logo.svg.png"
          alt="Ferremas"
          className="logo"
        />

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Buscar" />
        </div>

        <div className="topbar-links">
          <div className="topbar-item">
            <span className="icon">📍</span>
            <div>
              <small>Ingresa</small>
              <strong>Tu ubicación</strong>
            </div>
          </div>

          <div className="topbar-item">
            <span className="icon">👤</span>
            <div>
              <small>Hola</small>
              <strong>Inicia Sesión</strong>
            </div>
          </div>

          <div className="topbar-item cart">
            🛒
          </div>
        </div>
      </div>

      <div className="topbar-bottom">
        <div className="left-items">
          <a href="#">⚙️ Herramientas Manuales</a>
          <a href="#">⚙️ Materiales Básicos</a>
          <a href="#">⚙️ Equipos de Seguridad</a>
          <a href="#">⚙️ Tornillos y Anclajes</a>
          <a href="#">⚙️ Fijaciones y Adhesivos</a>
          <a href="#">⚙️ Equipos de Medición</a>
        </div>
        <div className="right-items">
          <span>Todo Ferremas hasta 6 cuotas sin interés</span>
          <a href="#">Horarios y tiendas</a>
        </div>
      </div>
    </header>

      <div className="hero">
        <h2>¡Bienvenido a Ferremas!</h2>
        <p>Encuentra todo lo que necesitas para tu hogar</p>
      </div>
      <OffersCarousel />
      <section className="productos">
        {productos.map((p, index) => (
          <div key={index} className="producto">
            <img src={p.imagen} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>${p.precio.toFixed(2)}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default App;
