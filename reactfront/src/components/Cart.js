import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ carrito, removeFromCart, updateQuantity }) => {
  const [loading, setLoading] = useState(false);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [error, setError] = useState('');

  const total = carrito.reduce((acc, item) => acc + item.PrecioProducto * item.cantidad, 0);

  const handleComprar = async () => {
    setLoading(true);
    setError('');
    setPedidoRealizado(false);

    // Obtener usuario del token
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para comprar.');
      setLoading(false);
      return;
    }

    let payload;
    try {
      payload = JSON.parse(atob(token.split('.')[1]));
    } catch {
      setError('Token inválido. Inicia sesión nuevamente.');
      setLoading(false);
      return;
    }

    const IdUsuario = payload.id;
    const detalles = carrito.map(item => ({
      IdProducto: item.idProducto,
      Cantidad: item.cantidad
    }));

    try {
      // Realizar el pedido
      await axios.post('http://localhost:8000/api/pedidos', {
        IdUsuario,
        detalles
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizar el stock de cada producto
      await Promise.all(carrito.map(item =>
        axios.put(`http://localhost:8000/api/productos/${item.idProducto}/stock`, {
          cantidadVendida: item.cantidad
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ));

      setPedidoRealizado(true);
      // Aquí podrías limpiar el carrito si lo deseas
      // setCarrito([]);
    } catch (e) {
      setError('Error al realizar el pedido o actualizar el stock');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {carrito.map(item => (
            <li
              key={item.idProducto}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                borderBottom: "1px solid #eee",
                paddingBottom: 12
              }}
            >
              {/* Imagen a la izquierda */}
              <img
                src={item.ImagenProducto || "https://via.placeholder.com/60?text=Sin+Imagen"}
                alt={item.NombreProducto}
                style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 8, marginRight: 20, background: "#f8f8f8" }}
              />

              {/* Info al centro */}
              <div style={{ flex: 1 }}>
                <strong>{item.NombreProducto}</strong>
                <div style={{ color: "#666", fontSize: 14, margin: "4px 0" }}>
                  {item.DescripcionProducto || "Sin descripción"}
                </div>
                <div style={{ fontWeight: 600, color: "#e60026" }}>${item.PrecioProducto}</div>
              </div>

              {/* Cantidad y quitar a la derecha */}
              <div style={{ minWidth: 120, textAlign: "right" }}>
                <div>
                  <button
                    className="btn btn-sm btn-secondary"
                    style={{ marginRight: 6, padding: "2px 8px" }}
                    onClick={() => updateQuantity(item.idProducto, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >-</button>
                  <span style={{ minWidth: 24, display: "inline-block", textAlign: "center" }}>{item.cantidad}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    style={{ marginLeft: 6, padding: "2px 8px" }}
                    onClick={() => updateQuantity(item.idProducto, item.cantidad + 1)}
                  >+</button>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ marginTop: 8 }}
                  onClick={() => removeFromCart(item.idProducto)}
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h4>Total: ${total}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {pedidoRealizado && <div className="alert alert-success">¡Pedido realizado y stock actualizado!</div>}
      <button
        className="btn btn-success"
        disabled={carrito.length === 0 || loading}
        onClick={handleComprar}
      >
        {loading ? "Procesando..." : "Finalizar compra"}
      </button>
    </div>
  );
};

export default Cart;