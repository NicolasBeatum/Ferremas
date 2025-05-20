import Producto from '../models/ProductoModel.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    const { NombreProducto, DescripcionProducto, StockProducto, PrecioProducto, ImagenProducto } = req.body;
    try {
        const producto = await Producto.create({ NombreProducto, DescripcionProducto, StockProducto, PrecioProducto, ImagenProducto });
        res.status(201).json({ message: 'Producto creado exitosamente', producto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { NombreProducto, DescripcionProducto, StockProducto, PrecioProducto, ImagenProducto } = req.body;
    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await producto.update({ NombreProducto, DescripcionProducto, StockProducto, PrecioProducto, ImagenProducto });
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateStockProducto = async (req, res) => {
    const { id } = req.params;
    const { cantidadVendida } = req.body;
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        if (producto.StockProducto < cantidadVendida) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }
        producto.StockProducto -= cantidadVendida;
        await producto.save();
        res.json({ message: 'Stock actualizado', producto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};