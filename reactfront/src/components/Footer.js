import React, { useState } from 'react';
import './footer.css';

function Footer() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    setEnviado(false);

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setError('Por favor completa todos los campos obligatorios');
      setEnviando(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Por favor ingresa un email válido');
      setEnviando(false);
      return;
    }

    try {
      // Simular envío (aquí puedes conectar con tu backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí puedes hacer la llamada a tu API
      // const response = await fetch('/api/contacto', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setEnviado(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
      
      // Resetear mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setEnviado(false);
      }, 3000);

    } catch (error) {
      setError('Error al enviar el mensaje. Por favor intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h4>Atención al Cliente</h4>
          <ul>
            <li>Seguimiento de pedidos</li>
            <li>Cómo comprar</li>
            <li>Servicio técnico</li>
            <li>Formas de entrega</li>
            <li>Retiro en tienda</li>
            <li>Envíos a domicilio</li>
            <li>Devoluciones y cambios</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Ferretería</h4>
          <ul>
            <li>Herramientas eléctricas</li>
            <li>Construcción y cemento</li>
            <li>Carpintería y madera</li>
            <li>Pinturas y solventes</li>
            <li>Ferretería general</li>
            <li>Tuberías y gasfitería</li>
            <li>Seguridad industrial</li>
            <li>Ofertas y promociones</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Nosotros</h4>
          <ul>
            <li>Quiénes somos</li>
            <li>Nuestras sucursales</li>
            <li>Trabaja con nosotros</li>
            <li>Preguntas frecuentes</li>
            <li>Soporte técnico</li>
            <li>Ventas corporativas</li>
          </ul>
        </div>
        <div className="footer-column contact-form">
          <h4>Contáctanos</h4>
          <form onSubmit={handleSubmit} className="contact-form-container">
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre *"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="Mensaje *"
                value={formData.mensaje}
                onChange={handleInputChange}
                rows="3"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn-enviar"
              disabled={enviando}
            >
              {enviando ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            {enviado && (
              <div className="success-message">
                ¡Mensaje enviado correctamente! Te contactaremos pronto.
              </div>
            )}
          </form>
        </div>
        <div className="footer-column social">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
          <h4>Medios de pago</h4>
          <div className="payment-icons">
            <img src="/visa.png" alt="Visa" />
            <img src="/mastercard.png" alt="MasterCard" />
            <img src="/amex.png" alt="Amex" />
            <img src="/diners.png" alt="Diners" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Ferretería El Tornillo | 
          <span> Términos y Condiciones </span> | 
          <span> Política de Privacidad </span> | 
          <span> Protección al consumidor </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
