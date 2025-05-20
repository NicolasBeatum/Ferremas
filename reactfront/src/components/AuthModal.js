import React, { useState } from 'react';
import axios from 'axios';
import './AuthModal.css';

// Función para formatear el RUT chileno
function formatRut(value) {
  let rut = value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (rut.length === 0) return '';
  let dv = rut.slice(-1);
  let cuerpo = rut.slice(0, -1);
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return cuerpo.length ? `${cuerpo}-${dv}` : dv;
}

const AuthModal = ({ show, onHide, modalRef, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [CorreoUsuario, setCorreoUsuario] = useState('');
  const [ContraseñaUsuario, setContraseñaUsuario] = useState('');
  const [RutUsuario, setRutUsuario] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setCorreoUsuario('');
    setContraseñaUsuario('');
    setRutUsuario('');
    setConfirmPassword('');
    setError('');
  };

  // Formatea el RUT automáticamente al escribir
  const handleRutChange = (e) => {
    const raw = e.target.value.replace(/\./g, '').replace(/-/g, '');
    setRutUsuario(formatRut(raw));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      // LOGIN usando JWT
      try {
        const res = await axios.post('http://localhost:8000/api/login', {
          CorreoUsuario,
          ContraseñaUsuario
        });
        if (res.data && res.data.token) {
          localStorage.setItem('token', res.data.token); // Guarda el token
          onLogin && onLogin(res.data.usuario); // Guarda el usuario en el estado global
          onHide();
          resetForm();
        } else {
          setError(res.data.message || 'Credenciales incorrectas');
        }
      } catch (err) {
        setError('Credenciales incorrectas');
      }
    } else {
      // REGISTRO
      if (ContraseñaUsuario !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      try {
        const res = await axios.post('http://localhost:8000/api/usuarios', {
          RutUsuario,
          CorreoUsuario,
          ContraseñaUsuario,
          idTipoUsuario: 1
        });
        alert(res.data.message || 'Usuario registrado correctamente');
        setIsLogin(true);
        resetForm();
      } catch (err) {
        setError(err.response?.data?.message || 'Error al registrar');
      }
    }
  };

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      tabIndex="-1"
      style={{
        display: show ? 'block' : 'none',
        background: 'rgba(0,0,0,0.35)',
        zIndex: 1050
      }}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content auth-modal-content">
          <div className="modal-header auth-modal-header">
            <h5 className="modal-title auth-modal-title">
              {isLogin ? 'Iniciar Sesión' : 'Registro'}
            </h5>
            <button type="button" className="btn-close" onClick={() => { onHide(); resetForm(); }}></button>
          </div>
          <div className="modal-body auth-modal-body">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label auth-modal-label">RUT</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RutUsuario}
                    onChange={handleRutChange}
                    required
                    placeholder="Ej: 12.345.678-9"
                    maxLength={12}
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label auth-modal-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={CorreoUsuario}
                  onChange={e => setCorreoUsuario(e.target.value)}
                  required
                  placeholder="correo@ejemplo.cl"
                />
              </div>
              <div className="mb-3">
                <label className="form-label auth-modal-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={ContraseñaUsuario}
                  onChange={e => setContraseñaUsuario(e.target.value)}
                  required
                  placeholder="********"
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label auth-modal-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder="********"
                  />
                </div>
              )}
              {error && <div className="alert alert-danger py-1">{error}</div>}
              <button
                type="submit"
                className="btn w-100 auth-modal-btn-main"
              >
                {isLogin ? 'Ingresar' : 'Registrarse'}
              </button>
            </form>
            <div className="text-center mt-3">
              <button
                className="btn btn-link auth-modal-btn-link"
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
              >
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;