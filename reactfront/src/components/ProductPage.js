import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ProductoPage = ({ addToCart }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [showModal, setShowModal] = useState(false);

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

  const stock = producto?.StockProducto ?? 0;

  const handleAddToCart = () => {
    for (let i = 0; i < cantidad; i++) {
      addToCart(producto);
    }
    setShowModal(true);
  };

  const handleDecrease = () => setCantidad(c => Math.max(1, c - 1));
  const handleIncrease = () => setCantidad(c => Math.min(stock, c + 1));

  useEffect(() => {
    if (cantidad > stock) setCantidad(stock > 0 ? stock : 1);
  }, [stock]);

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
      <p style={{ margin: "8px 0", fontWeight: 600 }}>
        Stock disponible: <span style={{ color: stock > 0 ? "#198754" : "#e60026" }}>{stock}</span>
      </p>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Cantidad:</label>
        <button
          className="btn btn-sm btn-secondary"
          onClick={handleDecrease}
          style={{ marginRight: 8 }}
          disabled={cantidad <= 1}
        >-</button>
        <span style={{ minWidth: 32, display: "inline-block", textAlign: "center" }}>{cantidad}</span>
        <button
          className="btn btn-sm btn-secondary"
          onClick={handleIncrease}
          style={{ marginLeft: 8 }}
          disabled={cantidad >= stock}
        >+</button>
      </div>
      <button
        className="btn btn-primary"
        style={{ background: "#e60026", border: "none", fontWeight: 600, borderRadius: 8, padding: "10px 32px" }}
        onClick={handleAddToCart}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin stock" : "Añadir al carrito"}
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto añadido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{producto.NombreProducto}</strong> ha sido añadido al carrito.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Seguir comprando
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductoPage;