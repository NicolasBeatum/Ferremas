import React from 'react';
import './footer.css';

function Footer() {
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
