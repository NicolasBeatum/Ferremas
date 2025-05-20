import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useMostrarPrecio from '../helpers/mostrarPrecio.js';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const mostrarPrecio = useMostrarPrecio();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/productos');
        setProductos(res.data);
      } catch (error) {
        setProductos([]);
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Cargando catálogo...</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <h2>Catálogo de Productos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {productos.map(producto => (
          <div key={producto.idProducto} style={{ width: 220, border: "1px solid #eee", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <Link to={`/producto/${producto.idProducto}`}>
              <img
                src={producto.ImagenProducto || 'https://via.placeholder.com/150?text=Sin+Imagen'}
                alt={producto.NombreProducto}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
              />
              <h4 style={{ margin: "12px 0 4px" }}>{producto.NombreProducto}</h4>
              <div style={{ color: "#555", marginBottom: 8 }}>
                {mostrarPrecio(producto.PrecioProducto)}
              </div>
            </Link>
            <div style={{ fontSize: 13, color: "#888" }}>
              Stock: {producto.StockProducto}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;