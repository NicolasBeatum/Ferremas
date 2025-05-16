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
    PrecioProducto INT NOT NULL,
    ImagenProducto VARCHAR(255)
);

-- Insertar 10 productos con stock aleatorio y precios razonables en CLP
INSERT INTO Producto (NombreProducto, DescripcionProducto, StockProducto, PrecioProducto, ImagenProducto) VALUES
('Martillo', 'Herramienta manual para clavar o extraer clavos', 45, 7500, 'https://rgm.vtexassets.com/arquivos/ids/156235/Martillo.png?v=638554617786370000'),
('Destornillador', 'Herramienta para atornillar o desatornillar tornillos', 65, 3200, 'https://construmartcl.vtexassets.com/arquivos/ids/230441-800-auto?v=638811980566570000&width=800&height=auto&aspect=true'),
('Taladro', 'Herramienta eléctrica para perforar materiales', 38, 45000, 'https://www.dimarsa.cl/media/catalog/product/m/a/marcaseinhell4513940-rojo1jpeg_0.jpg'),
('Serrucho', 'Herramienta de corte manual para madera', 52, 8900, 'https://cdnx.jumpseller.com/ferroelectronic/image/18498694/serruchotoolmak.jpg?1697570959'),
('Alicate', 'Herramienta para sujetar o cortar alambres', 76, 5600, 'https://www.weitzler.cl/bitobee/wp-content/uploads/2022/11/65002100003.jpg'),
('Llave Inglesa', 'Herramienta ajustable para apretar tuercas y pernos', 33, 8700, 'https://cdnx.jumpseller.com/gti-electronica/image/44181194/resize/640/640?1704743010'),
('Nivel', 'Herramienta para verificar nivelación de superficies', 47, 6900, 'https://yoclaudiomercantil.com.do/wp-content/uploads/2022/07/nivel-torpedo-de-9-truper-yoclaudiomercantil.jpg'),
('Cinta Métrica', 'Instrumento de medición de longitud', 81, 2500, 'https://cdnx.jumpseller.com/my-toolbox-chile/image/42833863/d_nq_np_2x_820651-mlc40854154766_022020-f-8cff2697-107e-4579-baa7-b830d0424250.jpg?1732308296'),
('Caja de Herramientas', 'Contenedor para almacenar herramientas', 29, 15900, 'https://mechanicshop.cl/wp-content/uploads/2022/07/351492-gr-caja-de-herramientas-con-66-piezas-1.jpg'),
('Broca', 'Accesorio para taladro para perforar materiales', 59, 3400, 'https://ae01.alicdn.com/kf/Se3491420cfb04fa0a9283362c60ff54c9.jpg');

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
