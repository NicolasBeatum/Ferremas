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

// Crear un nuevo pedido
export const createPedido = async (req, res) => {
    const { IdUsuario, detalles } = req.body; // detalles es un array de { IdProducto, Cantidad }
    try {
        const pedido = await Pedidos.create({ IdUsuario });

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

// Actualizar un pedido
export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { IdUsuario, detalles } = req.body;
    try {
        const pedido = await Pedidos.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await pedido.update({ IdUsuario });

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