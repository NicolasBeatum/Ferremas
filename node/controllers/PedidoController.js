import Pedidos from '../models/PedidosModel.js';
import DetallePedido from '../models/DetallePedidoModel.js';
import Usuario from '../models/UsuarioModel.js';
import Producto from '../models/ProductoModel.js';

// Obtener todos los pedidos
export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll({
            include: [
                { model: Usuario, attributes: ['RutUsuario', 'CorreoUsuario'] },
                { model: DetallePedido, include: [{ model: Producto }] }
            ]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo pedido (con dirección)
export const createPedido = async (req, res) => {
    const { IdUsuario, detalles, Direccion } = req.body; // detalles es un array de { IdProducto, Cantidad }
    try {
        const pedido = await Pedidos.create({ IdUsuario, Direccion });

        if (detalles && detalles.length > 0) {
            const detallesPedido = detalles.map(detalle => ({
                IdPedido: pedido.IdPedido,
                IdProducto: detalle.IdProducto,
                Cantidad: detalle.Cantidad
            }));
            await DetallePedido.bulkCreate(detallesPedido);
        }

        res.status(201).json({ message: 'Pedido creado exitosamente', pedido });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un pedido por ID
export const getPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedidos.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['RutUsuario', 'CorreoUsuario'] },
                { model: DetallePedido, include: [{ model: Producto }] }
            ]
        });

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener historial de pedidos por usuario (incluye dirección)
export const getPedidosByUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const pedidos = await Pedidos.findAll({
    where: { IdUsuario: id },
    order: [['FechaPedido', 'DESC']],
    include: [
        {
            model: DetallePedido,
            as: 'DetallePedidos', // ¡IMPORTANTE!
            include: [{ model: Producto }]
        }
    ]
});

        const pedidosFormateados = pedidos.map(pedido => ({
            idPedido: pedido.IdPedido,
            fecha: pedido.FechaPedido,
            direccion: pedido.Direccion,
            detalles: pedido.DetallePedidos.map(det => ({
                idDetalle: det.IdDetalle,
                NombreProducto: det.Producto?.NombreProducto,
                Cantidad: det.Cantidad,
                PrecioProducto: det.Producto?.PrecioProducto
            })),
            total: pedido.DetallePedidos.reduce((acc, det) => acc + (det.Cantidad * (det.Producto?.PrecioProducto || 0)), 0)
        }));

        res.json(pedidosFormateados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un pedido
export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { IdUsuario, detalles, Direccion } = req.body;
    try {
        const pedido = await Pedidos.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await pedido.update({ IdUsuario, Direccion });

        if (detalles && detalles.length > 0) {
            await DetallePedido.destroy({ where: { IdPedido: id } });
            const detallesPedido = detalles.map(detalle => ({
                IdPedido: id,
                IdProducto: detalle.IdProducto,
                Cantidad: detalle.Cantidad
            }));
            await DetallePedido.bulkCreate(detallesPedido);
        }

        res.json({ message: 'Pedido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un pedido
export const deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedidos.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await DetallePedido.destroy({ where: { IdPedido: id } });
        await pedido.destroy();

        res.json({ message: 'Pedido eliminado exitosamente' });
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