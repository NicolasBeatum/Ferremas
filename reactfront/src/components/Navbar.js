import React, { useRef, useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from 'react-router-dom';
import { useMoneda } from '../context/MonedaContext';

const Navbar = ({
    usuario, setUsuario, cartCount, onCartClick, onHistoryClick,
    busqueda, setBusqueda
}) => {
    const [showAuth, setShowAuth] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [productos, setProductos] = useState([]);
    const authRef = useRef();
    const navigate = useNavigate();
    const { moneda, setMoneda } = useMoneda();

    const getNombre = (correo) => correo ? correo.split('@')[0] : '';

    useEffect(() => {
        fetch('http://localhost:8000/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(() => setProductos([]));
    }, []);

    // Filtrar productos según la búsqueda
    const productosFiltrados = busqueda.length > 0
        ? productos.filter(p =>
            p.NombreProducto.toLowerCase().includes(busqueda.toLowerCase())
        )
        : [];

    const handleSearchChange = (e) => {
        setBusqueda(e.target.value);
        setShowSearchDropdown(e.target.value.length > 0);
    };

    const handleSearchBlur = () => {
        setTimeout(() => setShowSearchDropdown(false), 150);
    };

    const handleResultClick = (idProducto) => {
        setBusqueda('');
        setShowSearchDropdown(false);
        navigate(`/producto/${idProducto}`);
    };

    useEffect(() => {
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

    return (
        <>
            <nav>
                <div className="topbar-container">
                    <img
                        src="/Ferremas.png"
                        alt="Ferremas"
                        className="logo"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate('/')}
                    />

                    <div style={{ position: "relative", flex: 1 }}>
                        <form className="search-bar" onSubmit={e => e.preventDefault()}>
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar producto"
                                value={busqueda}
                                onChange={handleSearchChange}
                                onFocus={() => setShowSearchDropdown(busqueda.length > 0)}
                                onBlur={handleSearchBlur}
                                autoComplete="off"
                            />
                            <button type="submit" style={{ display: "none" }}>Buscar</button>
                        </form>
                        {showSearchDropdown && productosFiltrados.length > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    background: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: 8,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    zIndex: 3000,
                                    maxHeight: 300,
                                    overflowY: "auto"
                                }}
                            >
                                {productosFiltrados.map(producto => (
                                    <div
                                        key={producto.idProducto}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "8px 12px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #f0f0f0"
                                        }}
                                        onMouseDown={() => handleResultClick(producto.idProducto)}
                                    >
                                        <img
                                            src={producto.ImagenProducto || 'https://via.placeholder.com/40?text=Sin+Imagen'}
                                            alt={producto.NombreProducto}
                                            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, marginRight: 12 }}
                                        />
                                        <span style={{ color: "#111" }}>{producto.NombreProducto}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

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
                                                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.5rem 1rem" }}
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        onHistoryClick();
                                                    }}
                                                >
                                                    Historial de pedidos
                                                </button>
                                                {usuario && usuario.idTipoUsuario === 3 && (
                                                    <button
                                                        className="dropdown-item"
                                                        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.5rem 1rem" }}
                                                        onClick={() => {
                                                            setDropdownOpen(false);
                                                            navigate('/admin-productos');
                                                        }}
                                                    >
                                                        Administrar Productos
                                                    </button>
                                                )}
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

                        <div className="topbar-item cart" onClick={onCartClick} style={{ cursor: "pointer" }}>
                            🛒
                            {cartCount > 0 && (
                                <span style={{
                                    background: "#e60026",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    padding: "2px 8px",
                                    marginLeft: 4,
                                    fontSize: 13
                                }}>{cartCount}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="topbar-bottom">
                    <div className="left-items">
                        <a href="/catalogo">Todos los productos</a>
                    </div>
                    <div className="right-items">
                        <span>Todo Ferremas hasta 6 cuotas sin interés</span>
                        <select value={moneda} onChange={e => setMoneda(e.target.value)} style={{ marginLeft: 16 }}>
                            <option value="CLP">CLP</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>
            </nav>
            <AuthModal show={showAuth} onHide={() => setShowAuth(false)} modalRef={authRef} onLogin={setUsuario} />
        </>
    );
};

export default Navbar;