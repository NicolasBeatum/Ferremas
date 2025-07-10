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

## 📁 Estructura

```
Ferremas/
├── node/          # Backend (Node.js + Express)
├── reactfront/    # Frontend (React)
└── README.md
```