import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children, usuario }) => {
    // Verificar si el usuario está autenticado y es administrador
    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    if (usuario.idTipoUsuario !== 3) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedAdminRoute; 