import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useMostrarPrecio from '../helpers/mostrarPrecio.js';

const OffersCarousel = () => {
  const [productos, setProductos] = useState([]);
  const mostrarPrecio = useMostrarPrecio();

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

  return (
    <div className="offers-carousel" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 className="offers-title" style={{ textAlign: 'center' }}>Ofertas Destacadas</h2>
      <Carousel>
        {productos.map((producto) => (
          <Carousel.Item key={producto.idProducto}>
            <Link to={`/producto/${producto.idProducto}`}>
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8f9fa',
                  position: 'relative'
                }}
              >
                <img
                  src={producto.ImagenProducto || 'https://via.placeholder.com/800x300?text=Sin+Imagen'}
                  alt={producto.NombreProducto}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    margin: '0 auto',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '10px',
                    padding: '10px',
                    textAlign: 'center',
                    minWidth: '220px'
                  }}
                >
                  <h3 style={{ color: '#fff', margin: 0 }}>{producto.NombreProducto}</h3>
                  <p style={{ color: '#fff', margin: 0 }}>
                    Precio oferta: {mostrarPrecio(producto.PrecioProducto)}
                  </p>
                </div>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default OffersCarousel;