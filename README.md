# Ferremas - Plataforma de Ferretería

Sistema de e-commerce para ferretería con panel de administración y carrito de compras.

## 🚀 Iniciar el Proyecto

### 1. Instalar Dependencias

```bash
# Backend
cd node
npm install

# Frontend
cd reactfront
npm install
```

### 2. Crear Usuario Administrador

```bash
cd node
node scripts/createAdmin.js
```

**Credenciales:**
- Email: `admin@ferremas.com`
- Contraseña: `admin123`

### 3. Iniciar Servicios

```bash
# Backend (puerto 8000)
cd node
node app.js

# Frontend (puerto 3000)
cd reactfront
npm start
```

## 🔐 Acceder al Panel de Administración

1. Ir a `http://localhost:3000`
2. Iniciar sesión con las credenciales del administrador
3. Hacer clic en el nombre de usuario → "Administrar Productos"

## 💳 Tarjetas de Prueba para Transbank

Para probar las transacciones de pago, puedes usar las siguientes tarjetas de prueba:

| Tipo de tarjeta | Detalle | Resultado |
|-----------------|---------|-----------|
| VISA | 4051 8856 0044 6623<br>CVV 123<br>cualquier fecha de expiración | Genera transacciones aprobadas. |
| AMEX | 3700 0000 0002 032<br>CVV 1234<br>cualquier fecha de expiración | Genera transacciones aprobadas. |
| MASTERCARD | 5186 0595 5959 0568<br>CVV 123<br>cualquier fecha de expiración | Genera transacciones rechazadas. |
| Redcompra | 4051 8842 3993 7763 | Genera transacciones aprobadas (para operaciones que permiten débito Redcompra) |
| Redcompra | 4511 3466 6003 7060 | Genera transacciones aprobadas (para operaciones que permiten débito Redcompra) |
| Redcompra | 5186 0085 4123 3829 | Genera transacciones rechazadas (para operaciones que permiten débito Redcompra) |
| Prepago VISA | 4051 8860 0005 6590<br>CVV 123<br>cualquier fecha de expiración | Genera transacciones aprobadas. |
| Prepago MASTERCARD | 5186 1741 1062 9480<br>CVV 123<br>cualquier fecha de expiración | Genera transacciones rechazadas. |

### 🔐 Credenciales de Autenticación

Cuando aparezca un formulario de autenticación con RUT y clave, usar:
- **RUT:** 11.111.111-1
- **Clave:** 123

## 📁 Estructura

```
Ferremas/
├── node/          # Backend (Node.js + Express)
├── reactfront/    # Frontend (React)
└── README.md
```