import pkg from 'transbank-sdk';
const {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment
} = pkg;
import Pedidos from '../models/PedidosModel.js';
import Producto from '../models/ProductoModel.js';
import DetallePedido from '../models/DetallePedidoModel.js'; // Asegúrate de tener este modelo

// Instancia usando helpers de integración (recomendado)
const webpay = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS, // '597055555532'
    IntegrationApiKeys.WEBPAY,            // 'TEST'
    Environment.Integration               // 'https://webpay3gint.transbank.cl'
  )
);

export const iniciarTransaccion = async (req, res) => {
    const { IdPedido, monto } = req.body;
    const buyOrder = `pedido-${IdPedido}`;
    const sessionId = `session-${IdPedido}`;
    const returnUrl = 'http://localhost:8000/api/transbank/retorno';

    const montoInt = parseInt(monto, 10);
    if (isNaN(montoInt) || montoInt <= 0) {
        return res.status(400).json({ error: 'Monto inválido' });   
    }

    console.log({ buyOrder, sessionId, montoInt, returnUrl });

    try {
        const response = await webpay.create(buyOrder, sessionId, montoInt, returnUrl);
        await Pedidos.update(
            { TransbankToken: response.token, TransbankUrl: response.url, EstadoPago: 'pendiente' },
            { where: { IdPedido } }
        );
        res.json({ url: response.url, token: response.token });
    } catch (error) {
        console.error('Error en webpay.create:', error);
        res.status(500).json({ error: error.message });
    }
};

export const retornoTransbank = async (req, res) => {
    console.log('Retorno Transbank:', { body: req.body, query: req.query });

    const token =
        req.body?.token_ws ||
        req.body?.TOKEN_WS ||
        req.query?.token_ws ||
        req.query?.TOKEN_WS;

    if (!token) {
        return res.status(400).send('Token no recibido');
    }

    try {
        const result = await webpay.commit(token);
        const estado = result.status === 'AUTHORIZED' ? 'pagado' : 'fallido';

        // Si el pago fue exitoso, descuenta stock
        if (estado === 'pagado') {
            // Busca el pedido por el token, incluyendo los detalles correctamente
            const pedido = await Pedidos.findOne({
                where: { TransbankToken: token },
                include: [{
                    model: DetallePedido,
                    as: 'DetallePedidos',
                    include: [{ model: Producto }]
                }]
            });
            if (pedido && pedido.DetallePedidos) {
                for (const detalle of pedido.DetallePedidos) {
                    await Producto.decrement('StockProducto', {
                        by: detalle.Cantidad,
                        where: { idProducto: detalle.IdProducto }
                    });
                }
            }
        }

        await Pedidos.update(
            { EstadoPago: estado },
            { where: { TransbankToken: token } }
        );
        res.redirect(`http://localhost:3000/resultado-pago?estado=${estado}`);
    } catch (error) {
        res.redirect('http://localhost:3000/resultado-pago?estado=fallido');
    }
};