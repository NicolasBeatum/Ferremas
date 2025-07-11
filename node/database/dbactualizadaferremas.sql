CREATE DATABASE  IF NOT EXISTS `ferremas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ferremas`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: ferremas
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detallepedido`
--

DROP TABLE IF EXISTS `detallepedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedido` (
  `IdDetalle` int NOT NULL AUTO_INCREMENT,
  `IdPedido` int DEFAULT NULL,
  `IdProducto` int DEFAULT NULL,
  `Cantidad` int NOT NULL,
  PRIMARY KEY (`IdDetalle`),
  KEY `IdPedido` (`IdPedido`),
  KEY `IdProducto` (`IdProducto`),
  CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`IdPedido`) REFERENCES `pedidos` (`IdPedido`),
  CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedido`
--

LOCK TABLES `detallepedido` WRITE;
/*!40000 ALTER TABLE `detallepedido` DISABLE KEYS */;
INSERT INTO `detallepedido` VALUES (1,1,1,2),(2,1,3,1),(3,2,3,2),(4,3,9,2),(5,4,9,2),(6,5,9,2),(7,6,9,2),(8,7,9,2),(9,8,9,2),(10,9,9,2),(11,10,9,2),(12,11,9,2),(13,12,9,2),(14,13,6,2),(15,14,6,2),(16,15,8,1),(17,16,8,2),(18,17,2,2),(19,18,2,1),(20,19,2,1),(21,20,2,1),(22,21,2,1),(23,22,2,1),(24,23,2,1),(25,24,2,1),(26,25,2,1),(27,26,1,1),(28,27,7,2),(29,28,7,2),(30,29,7,2),(31,30,7,2),(32,31,2,1),(33,32,8,2),(34,33,8,3),(35,34,1,3),(36,35,1,1),(37,36,2,1),(38,37,1,1),(39,38,1,1),(40,39,1,1),(41,40,7,1),(42,41,4,4),(43,42,1,4),(44,42,3,1),(45,42,2,2),(46,43,6,6),(47,44,6,6),(48,45,8,6),(49,45,3,1),(50,46,8,1),(51,47,1,1),(52,48,5,3),(53,49,2,1);
/*!40000 ALTER TABLE `detallepedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `IdPedido` int NOT NULL AUTO_INCREMENT,
  `FechaPedido` datetime DEFAULT CURRENT_TIMESTAMP,
  `IdUsuario` int DEFAULT NULL,
  `TransbankToken` varchar(100) DEFAULT NULL,
  `EstadoPago` enum('pendiente','pagado','fallido') DEFAULT 'pendiente',
  `TransbankUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdPedido`),
  KEY `IdUsuario` (`IdUsuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'2025-05-20 06:27:05',1,NULL,'pendiente',NULL),(2,'2025-05-20 10:33:44',1,NULL,'pendiente',NULL),(3,'2025-05-20 11:02:54',1,NULL,'pendiente',NULL),(4,'2025-05-20 11:03:03',1,NULL,'pendiente',NULL),(5,'2025-05-20 11:03:10',1,NULL,'pendiente',NULL),(6,'2025-05-20 11:05:24',1,NULL,'pendiente',NULL),(7,'2025-05-20 11:06:34',1,NULL,'pendiente',NULL),(8,'2025-05-20 11:07:03',1,NULL,'pendiente',NULL),(9,'2025-05-20 11:08:28',1,NULL,'pendiente',NULL),(10,'2025-05-20 11:09:21',1,NULL,'pendiente',NULL),(11,'2025-05-20 11:09:36',1,NULL,'pendiente',NULL),(12,'2025-05-20 11:10:47',1,NULL,'pendiente',NULL),(13,'2025-05-20 11:19:32',1,NULL,'pendiente',NULL),(14,'2025-05-20 11:19:43',1,NULL,'pendiente',NULL),(15,'2025-05-20 11:20:34',1,NULL,'pendiente',NULL),(16,'2025-05-20 11:21:33',1,NULL,'pendiente',NULL),(17,'2025-05-20 11:24:43',1,NULL,'pendiente',NULL),(18,'2025-05-20 11:26:09',1,NULL,'pendiente',NULL),(19,'2025-05-20 11:28:08',1,NULL,'pendiente',NULL),(20,'2025-05-20 11:28:42',1,NULL,'pendiente',NULL),(21,'2025-05-20 11:29:27',1,NULL,'pendiente',NULL),(22,'2025-05-20 11:30:30',1,NULL,'pendiente',NULL),(23,'2025-05-20 11:30:32',1,NULL,'pendiente',NULL),(24,'2025-05-20 11:30:44',1,NULL,'pendiente',NULL),(25,'2025-05-20 11:31:17',1,NULL,'pendiente',NULL),(26,'2025-05-20 11:33:24',1,NULL,'pendiente',NULL),(27,'2025-05-20 11:38:02',1,NULL,'pendiente',NULL),(28,'2025-05-20 11:39:10',1,NULL,'pendiente',NULL),(29,'2025-05-20 11:39:12',1,NULL,'pendiente',NULL),(30,'2025-05-20 11:40:24',1,NULL,'pendiente',NULL),(31,'2025-05-20 11:41:26',1,'01ab5f357f914d18a202bb5cb2e9e14638f83f0c92b0e8bb200d41ae011ab7cc','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(32,'2025-05-20 11:42:46',1,'01ab8ef95c769b67c3dcf9627ee13d23ef927cf75252f3ac5522b208ff63f536','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(33,'2025-05-20 11:46:57',1,'01abdc4cefee65e1be019c2b825332de9a08d7c80e5496101ed66c55d6dae75a','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(34,'2025-05-20 11:48:23',1,'01abbcaefc9385b85d54b791c4d68b293b58205986f118dc8aa3014d12c940a7','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(35,'2025-05-20 11:50:32',1,'01abd4a5172c979cf54f5b605f9e5fe7be2d21cfda52600b446e032569c58cf7','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(36,'2025-05-20 11:51:16',1,'01aba51db40f8780636d5cc85f638fef15ad8fec221d37c0435c92cc3dec9290','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(37,'2025-05-20 11:54:33',1,'01ab7870df02cc753f36206aa3e97be042145f646358847ed986501263769792','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(38,'2025-05-20 11:59:07',1,'01ab8da109a351fa9722452b1c9ecab862deefcd416c50a6b9971ab81834117f','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(39,'2025-05-20 12:01:10',1,'01ab3af2e6b57c8a0efc86e8be09ae9ebe6887a4db4b95ab2e2befcf2eb68a84','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(40,'2025-05-20 12:05:13',1,'01ab2e643c6730d010e9d830582039534d9ed21b8b25300aa0250a73b91376e8','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(41,'2025-05-20 13:55:37',1,'01ab2208e710e4f8e4af2c75e18f28787873d565b2f2cdab4b785cdb4f20d699','fallido','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(42,'2025-05-20 14:16:33',1,'01ab13fd6ae15d1ac9f5f50a8443ee2c193ac7b63ccc4c76b2d9b17ec64bb259','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(43,'2025-05-20 16:19:01',4,NULL,'pendiente',NULL),(44,'2025-05-20 16:19:31',4,'01ab8444d721cc4dd4767deca941d98fd8797b8a30ddf1f892b88c0ff7f8f557','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(45,'2025-05-20 17:09:27',5,'01abcc52b2196f8088edacca0081eaf0c91562ac01cd048e5c10d317194b4213','pagado','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(46,'2025-05-20 17:10:40',5,'01abe0ccb1213660231d77a6dcf0a52a9c428409d78c62a34b3cf709c5ac7b96','fallido','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(47,'2025-05-20 17:11:34',5,'01ab6ac295bd1dc0df945084a1bd9a1a34a23735dde10f2c382b74b397782158','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(48,'2025-07-11 05:55:45',4,'01abf9d226dabafcb0a37cc587336bb5cdb53f62d59df58b538a1ddd2b0db382','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction'),(49,'2025-07-11 05:56:17',6,'01ab549cd873e39c6dc38c78d07671a80f815d2f6f32b11b8ccabaae9f8efb81','pendiente','https://webpay3gint.transbank.cl/webpayserver/initTransaction');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `NombreProducto` varchar(100) NOT NULL,
  `DescripcionProducto` varchar(200) DEFAULT NULL,
  `StockProducto` int NOT NULL,
  `PrecioProducto` int NOT NULL,
  `ImagenProducto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Martillo','Herramienta manual para clavar o extraer clavos',41,7500,'https://rgm.vtexassets.com/arquivos/ids/156235/Martillo.png?v=638554617786370000'),(2,'Destornillador','Herramienta para atornillar o desatornillar tornillos',63,3200,'https://construmartcl.vtexassets.com/arquivos/ids/230441-800-auto?v=638811980566570000&width=800&height=auto&aspect=true'),(3,'Taladro','Herramienta eléctrica para perforar materiales',34,45000,'https://www.dimarsa.cl/media/catalog/product/m/a/marcaseinhell4513940-rojo1jpeg_0.jpg'),(4,'Serrucho','Herramienta de corte manual para madera',52,8900,'https://cdnx.jumpseller.com/ferroelectronic/image/18498694/serruchotoolmak.jpg?1697570959'),(5,'Alicate','Herramienta para sujetar o cortar alambres',76,5600,'https://www.weitzler.cl/bitobee/wp-content/uploads/2022/11/65002100003.jpg'),(6,'Llave Inglesa','Herramienta ajustable para apretar tuercas y pernos',27,8700,'https://cdnx.jumpseller.com/gti-electronica/image/44181194/resize/640/640?1704743010'),(7,'Nivel','Herramienta para verificar nivelación de superficies',10,6900,'https://cdnx.jumpseller.com/my-toolbox-chile/image/42832925/d_nq_np_2x_821740-mlc43693787607_102020-f-e8acb4b9-294a-484b-910b-56dce31c0eed.jpg?1732309031'),(8,'Cinta Métrica','Instrumento de medición de longitud',75,2500,'https://cdnx.jumpseller.com/my-toolbox-chile/image/42833863/d_nq_np_2x_820651-mlc40854154766_022020-f-8cff2697-107e-4579-baa7-b830d0424250.jpg?1732308296'),(9,'Caja de Herramientas','Contenedor para almacenar herramientas',29,15900,'https://mechanicshop.cl/wp-content/uploads/2022/07/351492-gr-caja-de-herramientas-con-66-piezas-1.jpg'),(10,'Broca','Accesorio para taladro para perforar materiales',59,3400,'https://ae01.alicdn.com/kf/Se3491420cfb04fa0a9283362c60ff54c9.jpg');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuario` (
  `idTipoUsuario` int NOT NULL AUTO_INCREMENT,
  `NombreTipoUsuario` varchar(50) NOT NULL,
  `DescripcionTipoUsuario` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Estandar','Usuario común'),(2,'Trabajador','Empleado de la ferretería'),(3,'Administrador','Gestión total del sistema');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `RutUsuario` varchar(15) NOT NULL,
  `CorreoUsuario` varchar(50) NOT NULL,
  `ContraseñaUsuario` varchar(100) NOT NULL,
  `idTipoUsuario` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idTipoUsuario` (`idTipoUsuario`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipousuario` (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'12.345.678-9','cliente1@correo.cl','1234',1),(2,'11.222.333-4','trabajador@correo.cl','5678',2),(3,'98.765.432-1','admin@correo.cl','adminpass',3),(4,'99.999.999-9','nico@chile.cl','1133',1),(5,'44.444.444-4','gustavo@chile.cl','1133',1),(6,'12345678-9','admin@ferremas.com','admin123',3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11  2:00:55
