# Ejemplo de Uso - Scripts de Administración

## 🚀 Ejemplo Rápido

### 1. Crear un Administrador Predeterminado

```bash
# Navegar al directorio del proyecto
cd node

# Ejecutar el script
npm run create-admin
```

**Salida esperada:**
```
✅ Conexión a la base de datos establecida correctamente.
✅ Tipo de usuario Administrador encontrado.
✅ Usuario administrador creado correctamente.
ID del usuario: 1

📋 Información del Administrador:
Email: admin@ferremas.com
Contraseña: admin123
RUT: 12345678-9
Tipo de Usuario: Administrador (ID: 3)

🎉 ¡Script ejecutado exitosamente!
Puedes usar estas credenciales para acceder al panel de administración.
🔌 Conexión a la base de datos cerrada.
```

### 2. Crear un Administrador Personalizado

```bash
npm run create-custom-admin
```

**Interacción esperada:**
```
✅ Conexión a la base de datos establecida correctamente.

✅ Tipo de usuario Administrador encontrado.

📝 Ingresa los datos del administrador:

RUT (ej: 12345678-9): 98765432-1
Email: juan.admin@ferremas.com
Contraseña: miContraseña123

✅ Usuario administrador creado correctamente.
ID del usuario: 2

📋 Información del Administrador:
RUT: 98765432-1
Email: juan.admin@ferremas.com
Contraseña: miContraseña123
Tipo de Usuario: Administrador (ID: 3)

🎉 ¡Script ejecutado exitosamente!
Puedes usar estas credenciales para acceder al panel de administración.
🔌 Conexión a la base de datos cerrada.
```

### 3. Listar Administradores Existentes

```bash
npm run list-admins
```

**Salida esperada:**
```
✅ Conexión a la base de datos establecida correctamente.

📋 Se encontraron 2 usuario(s) administrador(es):

1. Usuario Administrador:
   ID: 1
   RUT: 12345678-9
   Email: admin@ferremas.com
   Tipo: Administrador

2. Usuario Administrador:
   ID: 2
   RUT: 98765432-1
   Email: juan.admin@ferremas.com
   Tipo: Administrador

🎉 Lista de administradores mostrada correctamente.
🔌 Conexión a la base de datos cerrada.
```

## 🔧 Casos de Uso Comunes

### Caso 1: Configuración Inicial del Sistema

1. **Crear el primer administrador:**
   ```bash
   npm run create-admin
   ```

2. **Verificar que se creó correctamente:**
   ```bash
   npm run list-admins
   ```

3. **Acceder al panel de administración:**
   - Ir a la aplicación web
   - Iniciar sesión con las credenciales mostradas
   - Hacer clic en el nombre de usuario → "Administrar Productos"

### Caso 2: Agregar un Nuevo Administrador

1. **Crear administrador personalizado:**
   ```bash
   npm run create-custom-admin
   ```

2. **Seguir las instrucciones del script**

3. **Verificar la creación:**
   ```bash
   npm run list-admins
   ```

### Caso 3: Actualizar un Usuario Existente como Administrador

Si ejecutas `create-custom-admin.js` con un email que ya existe:

```
⚠️  Ya existe un usuario con el correo: usuario@ejemplo.com
¿Deseas actualizar este usuario como administrador? (s/n): s
✅ Usuario actualizado como administrador correctamente.
```

## 🛠️ Solución de Problemas

### Error: "No se encontraron usuarios administradores"

```bash
npm run list-admins
```

**Salida:**
```
❌ No se encontraron usuarios administradores en la base de datos.
Ejecuta el script createAdmin.js para crear un administrador.
```

**Solución:** Ejecutar `npm run create-admin`

### Error: "Conexión a la base de datos fallida"

**Posibles causas:**
- Base de datos no está ejecutándose
- Credenciales incorrectas en `database/db.js`
- Puerto incorrecto

**Solución:** Verificar la configuración de la base de datos

### Error: "Tabla no encontrada"

**Solución:** Ejecutar el script SQL para crear las tablas:

```sql
-- Crear tabla TipoUsuario
CREATE TABLE TipoUsuario (
    idTipoUsuario INT PRIMARY KEY,
    NombreTipoUsuario VARCHAR(50)
);

-- Crear tabla Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    RutUsuario VARCHAR(15) NOT NULL,
    CorreoUsuario VARCHAR(50) NOT NULL,
    ContraseñaUsuario VARCHAR(100) NOT NULL,
    idTipoUsuario INT,
    FOREIGN KEY (idTipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
);

-- Insertar tipos de usuario básicos
INSERT INTO TipoUsuario (idTipoUsuario, NombreTipoUsuario) VALUES 
(1, 'Cliente'),
(2, 'Vendedor'),
(3, 'Administrador');
```

## 📋 Checklist de Configuración

Antes de usar los scripts, verifica:

- [ ] Node.js instalado
- [ ] Base de datos MySQL/MariaDB ejecutándose
- [ ] Dependencias instaladas (`npm install`)
- [ ] Configuración de base de datos en `database/db.js`
- [ ] Tablas creadas en la base de datos
- [ ] Permisos de usuario de base de datos

## 🔒 Seguridad Post-Configuración

Después de crear los administradores:

1. **Cambiar contraseñas por defecto**
2. **Verificar acceso al panel de administración**
3. **Probar funcionalidades CRUD de productos**
4. **Documentar las credenciales de forma segura**

---

**Nota:** Estos ejemplos asumen que estás en el directorio `node/` del proyecto. Ajusta las rutas según tu estructura de archivos. 