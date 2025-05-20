import React, { useRef, useState } from "react";
import AuthModal from "./AuthModal";

const Navbar = ({ usuario, setUsuario }) => {
    const [showAuth, setShowAuth] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const authRef = useRef();

    // Obtiene el nombre antes del @
    const getNombre = (correo) => correo ? correo.split('@')[0] : '';

    // Cierra el dropdown si se hace click fuera
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown')) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    // Función para buscar productos (puedes adaptarla a tu lógica)
    const handleSearch = (e) => {
        e.preventDefault();
        // Aquí puedes redirigir o filtrar productos según tu lógica
        // Por ejemplo, podrías levantar un evento o usar navigate si usas react-router
        alert(`Buscar: ${search}`);
    };

    return (
        <>
            <nav>
                <div className="topbar-container">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Easy_logo.svg/2560px-Easy_logo.svg.png"
                        alt="Ferremas"
                        className="logo"
                    />

                    <form className="search-bar" onSubmit={handleSearch}>
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button type="submit" style={{ display: "none" }}>Buscar</button>
                    </form>

                    <div className="topbar-links">
                        <div className="topbar-item user-dropdown" style={{ position: "relative" }}>
                            <span className="icon">👤</span>
                            <div>
                                {usuario ? (
                                    <>
                                        <small>Hola</small>
                                        <strong
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setDropdownOpen((open) => !open)}
                                        >
                                            {getNombre(usuario.CorreoUsuario)} ▼
                                        </strong>
                                        {dropdownOpen && (
                                            <div
                                                className="dropdown-menu show"
                                                style={{
                                                    position: "absolute",
                                                    top: "100%",
                                                    left: 0,
                                                    minWidth: 150,
                                                    background: "#fff",
                                                    border: "1px solid #ddd",
                                                    borderRadius: 8,
                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                                    zIndex: 2000,
                                                    padding: "0.5rem 0"
                                                }}
                                            >
                                                <button
                                                    className="dropdown-item"
                                                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.5rem 1rem" }}
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        // Aquí puedes abrir tu modal de editar perfil
                                                    }}
                                                >
                                                    Editar perfil
                                                </button>
                                                <button
                                                    className="dropdown-item"
                                                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.5rem 1rem", color: "#e60026" }}
                                                    onClick={() => {
                                                        localStorage.removeItem('token');
                                                        setUsuario(null);
                                                        setDropdownOpen(false);
                                                    }}
                                                >
                                                    Cerrar sesión
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <small>Hola</small>
                                        <strong
                                            onClick={() => setShowAuth(true)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Inicia Sesión
                                        </strong>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="topbar-item cart">
                            🛒
                        </div>
                    </div>
                </div>

                <div className="topbar-bottom">
                    <div className="left-items">
                        <a href="#">Todos los productos</a>
                    </div>
                    <div className="right-items">
                        <span>Todo Ferremas hasta 6 cuotas sin interés</span>
                        <a href="#">Horarios y tiendas</a>
                    </div>
                </div>
            </nav>
            <AuthModal show={showAuth} onHide={() => setShowAuth(false)} modalRef={authRef} onLogin={setUsuario} />
        </>
    );
};

export default Navbar;