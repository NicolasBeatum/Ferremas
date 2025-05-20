import express from 'express';
import {
    getUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    loginUsuario // <-- AGREGA loginUsuario aquí
} from '../controllers/UsuarioController.js';

import {
    getProductos,
    createProducto,
    getProductoById,
    updateProducto,
    deleteProducto
} from '../controllers/ProductoController.js';

import {
    getTipoUsuarios,
    createTipoUsuario,
    getTipoUsuarioById,
    updateTipoUsuario,
    deleteTipoUsuario
} from '../controllers/TipoUsuarioController.js';

import {
    getPedidos,
    createPedido,
    getPedidoById,
    updatePedido,
    deletePedido
} from '../controllers/PedidoController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { updateStockProducto } from '../controllers/ProductoController.js';
import { getPedidosByUsuario } from '../controllers/PedidoController.js';
import { iniciarTransaccion, retornoTransbank } from '../controllers/TransbankController.js';



const router = express.Router();

// Rutas para Usuarios
router.get('/usuarios', getUsuarios);
router.post('/usuarios', createUsuario);
router.get('/usuarios/:id', getUsuarioById);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

// Rutas para Productos
router.get('/productos', getProductos);
router.post('/productos', createProducto);
router.get('/productos/:id', getProductoById);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

// Rutas para Tipos de Usuario
router.get('/tipos-usuario', getTipoUsuarios);
router.post('/tipos-usuario', createTipoUsuario);
router.get('/tipos-usuario/:id', getTipoUsuarioById);
router.put('/tipos-usuario/:id', updateTipoUsuario);
router.delete('/tipos-usuario/:id', deleteTipoUsuario);

// Rutas para Pedidos
router.get('/pedidos', getPedidos);
router.post('/pedidos', createPedido);
router.get('/pedidos/:id', getPedidoById);
router.put('/pedidos/:id', updatePedido);
router.delete('/pedidos/:id', deletePedido);

// Ruta para login (JWT)
router.post('/login', loginUsuario);

router.get('/ruta-protegida', authMiddleware, (req, res) => {
  // req.user contiene los datos del usuario autenticado
  res.json({ message: 'Acceso permitido', user: req.user });
});

router.put('/productos/:id/stock', updateStockProducto);
router.get('/pedidos/usuario/:id', getPedidosByUsuario);

router.post('/transbank/iniciar', iniciarTransaccion);
router.post('/transbank/retorno', retornoTransbank);
router.get('/transbank/retorno', retornoTransbank); // Por si Transbank usa GET

export default router;