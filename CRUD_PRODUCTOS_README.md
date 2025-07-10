# Sistema CRUD de Productos - Ferremas

## Descripción
Sistema completo de administración de productos con acceso restringido solo para usuarios administradores (tipo de usuario 3).

## Características Implementadas

### Backend (Node.js + Express)
- **Middleware de Autorización**: `adminMiddleware.js` - Verifica que el usuario sea administrador
- **Rutas Protegidas**: Todas las operaciones CRUD están protegidas con autenticación JWT
- **Validación de Roles**: Solo usuarios con `idTipoUsuario = 3` pueden acceder

### Frontend (React)
- **Componente AdminProductos**: Interfaz completa para administrar productos
- **Protección de Rutas**: `ProtectedAdminRoute` - Redirige usuarios no autorizados
- **Integración en Navbar**: Enlace "Administrar Productos" solo visible para administradores

## Estructura de Archivos

### Backend
```
node/
├── middleware/
│   ├── authMiddleware.js (existente)
│   └── adminMiddleware.js (nuevo)
├── controllers/
│   └── ProductoController.js (actualizado)
└── routes/
    └── routes.js (actualizado)
```

### Frontend
```
reactfront/src/components/
├── AdminProductos.js (nuevo)
├── AdminProductos.css (nuevo)
├── ProtectedAdminRoute.js (nuevo)
└── Navbar.js (actualizado)
```

## Funcionalidades del CRUD

### 1. Crear Producto
- Formulario modal con validación
- Campos: Nombre, Descripción, Stock, Precio, URL de imagen
- Solo administradores pueden crear productos

### 2. Leer Productos
- Tabla con todos los productos
- Muestra imagen, nombre, descripción, stock y precio
- Acceso público (sin restricciones)

### 3. Actualizar Producto
- Formulario pre-llenado con datos actuales
- Validación de campos obligatorios
- Solo administradores pueden editar

### 4. Eliminar Producto
- Confirmación antes de eliminar
- Solo administradores pueden eliminar

## Instrucciones de Uso

### Para Administradores
1. **Iniciar Sesión**: Usar credenciales de usuario con `idTipoUsuario = 3`
2. **Acceder al Panel**: Hacer clic en el nombre de usuario → "Administrar Productos"
3. **Gestionar Productos**: Usar los botones "Editar" o "Eliminar" en la tabla
4. **Agregar Productos**: Hacer clic en "Agregar Nuevo Producto"

### Para Usuarios Regulares
- No pueden acceder a la página de administración
- Serán redirigidos automáticamente si intentan acceder
- Solo pueden ver productos en el catálogo

## Seguridad Implementada

### Backend
- **JWT Authentication**: Tokens con expiración de 2 horas
- **Role-based Access Control**: Verificación de tipo de usuario
- **Middleware Protection**: Todas las rutas CRUD protegidas
- **Error Handling**: Mensajes de error apropiados

### Frontend
- **Route Protection**: Componente que verifica permisos
- **Token Validation**: Verificación automática de tokens
- **UI Restrictions**: Enlaces ocultos para usuarios no autorizados

## API Endpoints

### Públicos (sin autenticación)
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto específico

### Protegidos (solo administradores)
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

## Configuración de Base de Datos

Asegúrate de que exista al menos un usuario con `idTipoUsuario = 3` en la tabla `Usuario`:

```sql
INSERT INTO Usuario (RutUsuario, CorreoUsuario, ContraseñaUsuario, idTipoUsuario) 
VALUES ('12345678-9', 'admin@ferremas.com', 'password123', 3);
```

## Notas Importantes

1. **Tokens JWT**: Se almacenan en localStorage del navegador
2. **Expiración**: Los tokens expiran después de 2 horas
3. **Responsive**: La interfaz es responsive y funciona en móviles
4. **Validación**: Todos los campos obligatorios están validados
5. **Feedback**: Mensajes de confirmación para todas las operaciones

## Troubleshooting

### Error 403 - Acceso Denegado
- Verificar que el usuario tenga `idTipoUsuario = 3`
- Verificar que el token JWT sea válido
- Verificar que el token no haya expirado

### Error 401 - No Autorizado
- Verificar que el token esté presente en localStorage
- Verificar que el token tenga el formato correcto

### Error 500 - Error del Servidor
- Verificar la conexión a la base de datos
- Verificar que las tablas existan y tengan la estructura correcta 