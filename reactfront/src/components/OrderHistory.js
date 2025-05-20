import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useMostrarPrecio from '../helpers/mostrarPrecio.js';

const OrderHistory = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const mostrarPrecio = useMostrarPrecio();

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Debes iniciar sesión para ver tu historial.');
          setLoading(false);
          return;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        const res = await axios.get(`http://localhost:8000/api/pedidos/usuario/${payload.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPedidos(res.data);
      } catch (e) {
        setError('Error al cargar el historial de pedidos');
      }
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Cargando historial...</div>;
  if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <h2>Historial de pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {pedidos.map(pedido => (
            <li key={pedido.idPedido} style={{ borderBottom: "1px solid #eee", marginBottom: 16, paddingBottom: 12 }}>
              <div>
                <strong>Pedido #{pedido.idPedido}</strong> - {new Date(pedido.fecha).toLocaleString()}
                <span style={{
                  marginLeft: 16,
                  padding: "2px 10px",
                  borderRadius: 8,
                  background: pedido.estadoPago === 'pagado' ? '#d4edda' : pedido.estadoPago === 'pendiente' ? '#fff3cd' : '#f8d7da',
                  color: pedido.estadoPago === 'pagado' ? '#155724' : pedido.estadoPago === 'pendiente' ? '#856404' : '#721c24',
                  fontWeight: 500,
                  fontSize: 13
                }}>
                  {pedido.estadoPago ? pedido.estadoPago.charAt(0).toUpperCase() + pedido.estadoPago.slice(1) : 'Desconocido'}
                </span>
              </div>
              <div>
                <strong>Productos:</strong>
                <ul>
                  {pedido.detalles.map(det => (
                    <li key={det.idDetalle}>
                      {det.NombreProducto} x {det.Cantidad} - {mostrarPrecio(det.PrecioProducto)}
                    </li>
                  ))}
                </ul>
              </div>
              <div><strong>Total:</strong> {mostrarPrecio(pedido.total)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;