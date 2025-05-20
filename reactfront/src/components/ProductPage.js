import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductoPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/productos/${id}`);
        setProducto(res.data);
      } catch (error) {
        setProducto(null);
      }
    };
    fetchProducto();
  }, [id]);

  if (!producto) return <div style={{ padding: 40 }}>Cargando producto...</div>;

  return (
    <div className="producto-detalle" style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <img
        src={producto.ImagenProducto || 'https://via.placeholder.com/300?text=Sin+Imagen'}
        alt={producto.NombreProducto}
        style={{ width: "100%", maxHeight: 350, objectFit: "contain", borderRadius: 8, marginBottom: 24 }}
      />
      <h2>{producto.NombreProducto}</h2>
      <p style={{ fontSize: 18, color: "#e60026", fontWeight: 700 }}>${producto.PrecioProducto}</p>
      <p style={{ margin: "16px 0" }}>{producto.DescripcionProducto || "Sin descripción."}</p>
      <button
        className="btn btn-primary"
        style={{ background: "#e60026", border: "none", fontWeight: 600, borderRadius: 8, padding: "10px 32px" }}
        onClick={() => alert("Producto añadido al carrito (lógica pendiente)")}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductoPage;