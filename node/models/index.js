import Pedidos from './PedidosModel.js';
import DetallePedido from './DetallePedidoModel.js';
import Producto from './ProductoModel.js';

// Asociaciones
Pedidos.hasMany(DetallePedido, { foreignKey: 'IdPedido', as: 'DetallePedidos' });
DetallePedido.belongsTo(Pedidos, { foreignKey: 'IdPedido' });
DetallePedido.belongsTo(Producto, { foreignKey: 'IdProducto' });

export { Pedidos, DetallePedido, Producto };