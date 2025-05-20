import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar.js'; // Asegúrate de que la ruta sea correcta
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
      <Navbar />
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
