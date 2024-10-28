-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bienhelada
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
Drop database if exists bienhelada;
CREATE DATABASE bienhelada DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

use bienhelada;
--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `ID_Cart` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Customer` int(11) NOT NULL,
  `Date_Record` datetime DEFAULT current_timestamp(),
  `Estate` enum('active','abandoned','complete') NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID_Cart`),
  KEY `ID_Customer` (`ID_Customer`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`ID_Customer`) REFERENCES `customer` (`ID_Customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_product` (
  `ID_Cart` int(11) NOT NULL,
  `ID_Product` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `Subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID_Cart`,`ID_Product`),
  KEY `ID_Product` (`ID_Product`),
  CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`ID_Cart`) REFERENCES `cart` (`ID_Cart`),
  CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`ID_Product`) REFERENCES `product` (`ID_Product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_product`
--

LOCK TABLES `cart_product` WRITE;
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `ID_Customer` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `Date_Record` datetime DEFAULT current_timestamp(),
  `HashPassword` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID_Customer`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*INSERT INTO `customer` VALUES (1,'Juan','Pérez','juan.perez@example.com','123456789','Calle Falsa 123','Buenos Aires','Argentina','2024-09-06 11:30:44','hashedpassword1',0,1,1),(2,'María','González','maria.gonzalez@example.com','987654321','Avenida Siempre Viva 456','Córdoba','Argentina','2024-09-06 11:30:44','hashedpassword2',1,1,1),(3,'Carlos','Martínez','carlos.martinez@example.com','456789123','Ruta Nacional 7 KM 10','Rosario','Argentina','2024-09-06 11:30:44','hashedpassword3',0,1,0),(4,'Laura','López','laura.lopez@example.com','321654987','Avenida 9 de Julio','Mendoza','Argentina','2024-09-06 11:30:44','hashedpassword4',0,1,1),(5,'Ana','Rodríguez','ana.rodriguez@example.com','789123456','San Martín 999','La Plata','Argentina','2024-09-06 11:30:44','hashedpassword5',1,0,0);*/
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
INSERT INTO `customer` VALUES (1,'Hernan','Gauna','undrbug@gmail.com','123456789','Calle Falsa 123','Buenos Aires','Argentina','2024-09-06 11:30:44','polaco29',1,1,1)

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `ID_invoice` int(11) NOT NULL AUTO_INCREMENT,
  `Numero_invoice` varchar(50) DEFAULT NULL,
  `ID_Customer` int(11) NOT NULL,
  `ID_Cart` int(11) NOT NULL,
  `issue_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` enum('pagado','pendiente','cancelado') NOT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_invoice`),
  UNIQUE KEY `Numero_invoice` (`Numero_invoice`),
  KEY `ID_Customer` (`ID_Customer`),
  KEY `ID_Cart` (`ID_Cart`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`ID_Customer`) REFERENCES `customer` (`ID_Customer`),
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`ID_Cart`) REFERENCES `cart` (`ID_Cart`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ID_Product` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `drink_description` text DEFAULT NULL,
  `drink_type` varchar(30) NOT NULL,
  `Presentation` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `Barcode` varchar(20) DEFAULT NULL,
  `Maturity` date DEFAULT NULL,
  `highlighted` tinyint(1) DEFAULT NULL,
  `offer` tinyint(1) DEFAULT NULL,
  `Image` varchar(255) DEFAULT '../images/products/default.jpg',
  PRIMARY KEY (`ID_Product`),
  UNIQUE KEY `Barcode` (`Barcode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

CREATE TABLE `drinktype` (
  `ID_Drinktype` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,  
  PRIMARY KEY (`ID_Drinktype`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `drinktype` VALUES (1,'Vino');
INSERT INTO drinktype VALUES (2, 'Vino tinto');
INSERT INTO drinktype VALUES (3, 'Vino blanco');
INSERT INTO drinktype VALUES (4, 'Vino rosado');
INSERT INTO drinktype VALUES (5, 'Espumoso');
INSERT INTO drinktype VALUES (6, 'Lager');
INSERT INTO drinktype VALUES (7, 'Ale');
INSERT INTO drinktype VALUES (8, 'Stout');
INSERT INTO drinktype VALUES (9, 'IPA');
INSERT INTO drinktype VALUES (10, 'Whisky');
INSERT INTO drinktype VALUES (11, 'Ron');
INSERT INTO drinktype VALUES (12, 'Tequila');
INSERT INTO drinktype VALUES (13, 'Vodka');
INSERT INTO drinktype VALUES (14, 'Martini');
INSERT INTO drinktype VALUES (15, 'Mojito');

--
-- Dumping data for table `drinktype`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Cerveza Quilmes','Cerveza rubia tradicional','Cerveza',500,150.00,100,'Quilmes','7791234567890','2025-12-31',1,0,'../images/products/1723084722222-.jpg'),(2,'Vino Malbec','Vino tinto de Mendoza','Vino',750,450.00,50,'Trapiche','7790987654321','2028-06-30',0,1,'../images/products/default.jpg'),(3,'Whisky Johnnie Walker','Whisky escocés','Whisky',700,1200.00,25,'Johnnie Walker','7796543210987','2030-11-20',1,1,'../images/products/default.jpg'),(4,'Espumante Chandon','Espumante de calidad','Espumante',750,800.00,30,'Chandon','7798765432109','2027-03-15',1,0,'../images/products/1723507935210-.jpg'),(5,'Licor Baileys','Licor de crema irlandesa','Licor',700,600.00,15,'Baileys','7795678901234','2029-09-10',0,1,'../images/products/1723507935210-.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-06 12:55:58
