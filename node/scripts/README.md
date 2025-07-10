# Scripts de Administración - Ferremas

Scripts simples para crear y gestionar usuarios administradores en el sistema Ferremas.

## 📁 Scripts Disponibles

### 1. `createAdmin.js` - Crear Administrador con Hash
Crea un usuario administrador con contraseña hasheada usando bcrypt.

**Credenciales por defecto:**
- Email: `admin@ferremas.com`
- Contraseña: `admin123`
- RUT: `12345678-9`

### 2. `createAdminSimple.js` - Crear Administrador Simple
Crea un usuario administrador con contraseña en texto plano (para desarrollo).

**Credenciales por defecto:**
- Email: `admin@ferremas.com`
- Contraseña: `admin123`
- RUT: `12345678-9`

### 3. `createCustomAdmin.js` - Crear Administrador Personalizado
Script interactivo que permite crear un administrador con datos personalizados.

### 4. `listAdmins.js` - Listar Administradores
Muestra todos los usuarios administradores existentes en la base de datos.

## 🚀 Cómo Ejecutar

### Opción 1: Usando npm scripts

```bash
# Navegar al directorio del proyecto
cd node

# Instalar dependencias (si no están instaladas)
npm install

# Crear administrador con hash
npm run create-admin

# Crear administrador simple (sin hash)
npm run create-admin-simple

# Crear administrador personalizado
npm run create-custom-admin

# Listar administradores existentes
npm run list-admins
```

### Opción 2: Usando Node.js directamente

```bash
# Crear administrador con hash
node scripts/createAdmin.js

# Crear administrador simple
node scripts/createAdminSimple.js

# Crear administrador personalizado
node scripts/createCustomAdmin.js

# Listar administradores
node scripts/listAdmins.js
```

## 📋 Ejemplos de Uso

### Crear Administrador con Hash (Recomendado para producción)

```bash
npm run create-admin
```

**Salida esperada:**
```
Conexión a la base de datos exitosa
¡Usuario administrador creado correctamente!
Email: admin@ferremas.com
Contraseña: admin123
```

### Crear Administrador Simple (Para desarrollo)

```bash
npm run create-admin-simple
```

**Salida esperada:**
```
Conexión a la base de datos exitosa
¡Usuario administrador creado correctamente!
Email: admin@ferremas.com
Contraseña: admin123
```

### Crear Administrador Personalizado

```bash
npm run create-custom-admin
```

**Interacción:**
```
Ingresa los datos del administrador:

RUT (ej: 12345678-9): 98765432-1
Email: juan@ferremas.com
Contraseña: miPassword123

Conexión a la base de datos exitosa
¡Usuario administrador creado correctamente!
Email: juan@ferremas.com
Contraseña: miPassword123
```

### Listar Administradores

```bash
npm run list-admins
```

**Salida esperada:**
```
Conexión a la base de datos exitosa
Se encontraron 2 usuario(s) administrador(es):

1. Usuario Administrador:
   ID: 1
   RUT: 12345678-9
   Email: admin@ferremas.com

2. Usuario Administrador:
   ID: 2
   RUT: 98765432-1
   Email: juan@ferremas.com
```

## 🔧 Requisitos

1. **Node.js instalado**
2. **Base de datos MySQL/MariaDB configurada**
3. **Dependencias instaladas**: `npm install`
4. **Configuración de base de datos** en `database/db.js`

## 🛠️ Configuración de Base de Datos

Asegúrate de que tu archivo `database/db.js` esté configurado:

```javascript
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nombre_base_datos', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
```

## 📊 Estructura de Tablas

Los scripts asumen estas tablas:

### Tabla `Usuario`
```sql
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    RutUsuario VARCHAR(15) NOT NULL,
    CorreoUsuario VARCHAR(50) NOT NULL,
    ContraseñaUsuario VARCHAR(100) NOT NULL,
    idTipoUsuario INT
);
```

### Tabla `TipoUsuario`
```sql
CREATE TABLE TipoUsuario (
    idTipoUsuario INT PRIMARY KEY,
    NombreTipoUsuario VARCHAR(50)
);

-- Insertar tipos básicos
INSERT INTO TipoUsuario VALUES 
(1, 'Cliente'),
(2, 'Vendedor'),
(3, 'Administrador');
```

## 🔒 Seguridad

### Recomendaciones

1. **Para desarrollo**: Usa `create-admin-simple` o `create-admin`
2. **Para producción**: Usa `create-admin` (con hash de contraseña)
3. **Cambiar contraseñas** después de crear usuarios
4. **Usar contraseñas fuertes** en producción

### Diferencias entre Scripts

- **`createAdmin.js`**: Usa bcrypt para hashear contraseñas (más seguro)
- **`createAdminSimple.js`**: Sin hash (más simple, solo para desarrollo)
- **`createCustomAdmin.js`**: Interactivo, con hash de contraseña

## ❗ Solución de Problemas

### Error: "bcrypt module not found"
```bash
npm install bcrypt
```

### Error: "Conexión a la base de datos fallida"
- Verificar que MySQL esté ejecutándose
- Verificar credenciales en `database/db.js`
- Verificar que la base de datos exista

### Error: "Table doesn't exist"
Ejecutar el script SQL para crear las tablas necesarias.

## 📞 Uso Rápido

1. **Configuración inicial:**
   ```bash
   cd node
   npm install
   npm run create-admin-simple
   ```

2. **Verificar creación:**
   ```bash
   npm run list-admins
   ```

3. **Acceder al panel:**
   - Ir a la aplicación web
   - Iniciar sesión con las credenciales mostradas
   - Hacer clic en el nombre de usuario → "Administrar Productos"

---

**Nota:** Los scripts están diseñados para ser simples y directos. Para producción, considera usar `createAdmin.js` que incluye hash de contraseñas. 