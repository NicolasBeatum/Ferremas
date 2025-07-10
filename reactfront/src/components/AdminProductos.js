import React, { useState, useEffect } from 'react';
import './AdminProductos.css';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [editingProducto, setEditingProducto] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        NombreProducto: '',
        DescripcionProducto: '',
        StockProducto: '',
        PrecioProducto: '',
        ImagenProducto: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/productos');
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            NombreProducto: '',
            DescripcionProducto: '',
            StockProducto: '',
            PrecioProducto: '',
            ImagenProducto: ''
        });
        setEditingProducto(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = editingProducto 
                ? `http://localhost:8000/api/productos/${editingProducto.idProducto}`
                : 'http://localhost:8000/api/productos';
            
            const method = editingProducto ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la operación');
            }

            const result = await response.json();
            alert(editingProducto ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
            
            resetForm();
            fetchProductos();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleEdit = (producto) => {
        setEditingProducto(producto);
        setFormData({
            NombreProducto: producto.NombreProducto,
            DescripcionProducto: producto.DescripcionProducto || '',
            StockProducto: producto.StockProducto.toString(),
            PrecioProducto: producto.PrecioProducto.toString(),
            ImagenProducto: producto.ImagenProducto || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (idProducto) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/productos/${idProducto}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar');
            }

            alert('Producto eliminado exitosamente');
            fetchProductos();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return <div className="admin-loading">Cargando productos...</div>;
    }

    if (error) {
        return <div className="admin-error">Error: {error}</div>;
    }

    return (
        <div className="admin-productos">
            <div className="admin-header">
                <h1>Administración de Productos</h1>
                <button 
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Agregar Nuevo Producto
                </button>
            </div>

            {showForm && (
                <div className="form-overlay">
                    <div className="form-container">
                        <h2>{editingProducto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre del Producto:</label>
                                <input
                                    type="text"
                                    name="NombreProducto"
                                    value={formData.NombreProducto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción:</label>
                                <textarea
                                    name="DescripcionProducto"
                                    value={formData.DescripcionProducto}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input
                                        type="number"
                                        name="StockProducto"
                                        value={formData.StockProducto}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Precio:</label>
                                    <input
                                        type="number"
                                        name="PrecioProducto"
                                        value={formData.PrecioProducto}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>URL de la Imagen:</label>
                                <input
                                    type="url"
                                    name="ImagenProducto"
                                    value={formData.ImagenProducto}
                                    onChange={handleInputChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    {editingProducto ? 'Actualizar' : 'Crear'}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn-secondary"
                                    onClick={resetForm}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="productos-table">
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.idProducto}>
                                <td>
                                    <img 
                                        src={producto.ImagenProducto || 'https://via.placeholder.com/50?text=Sin+Imagen'} 
                                        alt={producto.NombreProducto}
                                        className="producto-imagen"
                                    />
                                </td>
                                <td>{producto.NombreProducto}</td>
                                <td>{producto.DescripcionProducto || 'Sin descripción'}</td>
                                <td>{producto.StockProducto}</td>
                                <td>${producto.PrecioProducto.toLocaleString()}</td>
                                <td>
                                    <button 
                                        className="btn-edit"
                                        onClick={() => handleEdit(producto)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn-delete"
                                        onClick={() => handleDelete(producto.idProducto)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductos; 