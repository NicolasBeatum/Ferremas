import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultadoPago = () => {
  const query = new URLSearchParams(useLocation().search);
  const estado = query.get('estado');

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <h2>Resultado del Pago</h2>
      {estado === 'pagado' ? (
        <div style={{ color: 'green', fontWeight: 700 }}>¡Pago exitoso! Tu pedido ha sido procesado.</div>
      ) : (
        <div style={{ color: 'red', fontWeight: 700 }}>El pago ha fallado o fue cancelado.</div>
      )}
    </div>
  );
};

export default ResultadoPago;