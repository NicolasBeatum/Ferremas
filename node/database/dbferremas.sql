-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ferremas;
USE ferremas;

-- Eliminación de tablas en orden correcto por dependencias
DROP TABLE IF EXISTS DetallePedido;
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS TipoUsuario;

-- Tabla: TipoUsuario
CREATE TABLE TipoUsuario (
    idTipoUsuario INT AUTO_INCREMENT PRIMARY KEY,
    NombreTipoUsuario VARCHAR(50) NOT NULL,
    DescripcionTipoUsuario VARCHAR(100)
);

-- Insertar datos en TipoUsuario
INSERT INTO TipoUsuario (NombreTipoUsuario, DescripcionTipoUsuario) VALUES
('Estandar', 'Usuario común'),
('Trabajador', 'Empleado de la ferretería'),
('Administrador', 'Gestión total del sistema');

-- Tabla: Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    RutUsuario VARCHAR(15) NOT NULL,
    CorreoUsuario VARCHAR(50) NOT NULL,
    ContraseñaUsuario VARCHAR(100) NOT NULL,
    idTipoUsuario INT,
    FOREIGN KEY (idTipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
);

-- Insertar datos en Usuario
INSERT INTO Usuario (RutUsuario, CorreoUsuario, ContraseñaUsuario, idTipoUsuario) VALUES
('12.345.678-9', 'cliente1@correo.cl', '1234', 1),
('11.222.333-4', 'trabajador@correo.cl', '5678', 2),
('98.765.432-1', 'admin@correo.cl', 'adminpass', 3);

-- Tabla: Producto
CREATE TABLE Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    NombreProducto VARCHAR(100) NOT NULL,
    DescripcionProducto VARCHAR(200),
    StockProducto INT NOT NULL,
    PrecioProducto INT NOT NULL
);

-- Insertar 10 productos con stock aleatorio y precios razonables en CLP
INSERT INTO Producto (NombreProducto, DescripcionProducto, StockProducto, PrecioProducto) VALUES
('Martillo', 'Herramienta manual para clavar o extraer clavos', 45, 7500),
('Destornillador', 'Herramienta para atornillar o desatornillar tornillos', 65, 3200),
('Taladro', 'Herramienta eléctrica para perforar materiales', 38, 45000),
('Serrucho', 'Herramienta de corte manual para madera', 52, 8900),
('Alicate', 'Herramienta para sujetar o cortar alambres', 76, 5600),
('Llave Inglesa', 'Herramienta ajustable para apretar tuercas y pernos', 33, 8700),
('Nivel', 'Herramienta para verificar nivelación de superficies', 47, 6900),
('Cinta Métrica', 'Instrumento de medición de longitud', 81, 2500),
('Caja de Herramientas', 'Contenedor para almacenar herramientas', 29, 15900),
('Broca', 'Accesorio para taladro para perforar materiales', 59, 3400);

-- Tabla: Pedidos
CREATE TABLE Pedidos (
    IdPedido INT AUTO_INCREMENT PRIMARY KEY,
    FechaPedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    IdUsuario INT,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(idUsuario)
);

-- Tabla intermedia: DetallePedido
CREATE TABLE DetallePedido (
    IdDetalle INT AUTO_INCREMENT PRIMARY KEY,
    IdPedido INT,
    IdProducto INT,
    Cantidad INT NOT NULL,
    FOREIGN KEY (IdPedido) REFERENCES Pedidos(IdPedido),
    FOREIGN KEY (IdProducto) REFERENCES Producto(idProducto)
);

-- Insertar ejemplo de pedido
INSERT INTO Pedidos (IdUsuario) VALUES (1);

-- Insertar productos en ese pedido
INSERT INTO DetallePedido (IdPedido, IdProducto, Cantidad) VALUES
(1, 1, 2), -- 2 Martillos
(1, 3, 1); -- 1 Taladro
