import React from "react";

const Navbar = () => (
    <nav>
        <div className="topbar-container">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Easy_logo.svg/2560px-Easy_logo.svg.png"
                alt="Ferremas"
                className="logo"
            />

            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Buscar" />
            </div>

            <div className="topbar-links">
                <div className="topbar-item">
                    <span className="icon">📍</span>
                    <div>
                        <small>Ingresa</small>
                        <strong>Tu ubicación</strong>
                    </div>
                </div>

                <div className="topbar-item">
                    <span className="icon">👤</span>
                    <div>
                        <small>Hola</small>
                        <strong>Inicia Sesión</strong>
                    </div>
                </div>

                <div className="topbar-item cart">
                    🛒
                </div>
            </div>
        </div>

        <div className="topbar-bottom">
            <div className="left-items">
                <a href="#">⚙️ Herramientas Manuales</a>
                <a href="#">⚙️ Materiales Básicos</a>
                <a href="#">⚙️ Equipos de Seguridad</a>
                <a href="#">⚙️ Tornillos y Anclajes</a>
                <a href="#">⚙️ Fijaciones y Adhesivos</a>
                <a href="#">⚙️ Equipos de Medición</a>
            </div>
            <div className="right-items">
                <span>Todo Ferremas hasta 6 cuotas sin interés</span>
                <a href="#">Horarios y tiendas</a>
            </div>
        </div>
    </nav>
);

export default Navbar;