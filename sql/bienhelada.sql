CREATE DATABASE  IF NOT EXISTS `bienhelada` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bienhelada`;
-- MySQL dump 10.13  Distrib 8.4.2, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bienhelada
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `ID_Cart` int NOT NULL AUTO_INCREMENT,
  `ID_Customer` int NOT NULL,
  `Date_Record` datetime DEFAULT CURRENT_TIMESTAMP,
  `Estate` enum('active','abandoned','complete') COLLATE utf8mb4_general_ci NOT NULL,
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
  `ID_Cart` int NOT NULL,
  `ID_Product` int NOT NULL,
  `amount` int NOT NULL,
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
  `ID_Customer` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adress` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Date_Record` datetime DEFAULT CURRENT_TIMESTAMP,
  `HashPassword` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID_Customer`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (6,'Hernán','Gauna','undrbug@gmail.com','/images/users/1729901577041-.jpeg','3764736042','España 820','Misiones','Argentina','2024-10-26 00:12:58','$2a$10$5ZGVDfJymbFbCrxSVD1NTOxREUGnTPiAyHi4czCGhw0gdGu2Y7Wp.',1,1,1),(8,'Hernán','Gauna','undrbug22@gmail.com','/images/users/default.png','3764736042','España 820','Buenos Aires','','2024-10-30 02:04:24','$2a$10$iH4DOwLelcGGbrzL.806YuuUQd1a7f0oJ.cOjMyLR.078WpxK5jVu',0,1,1),(9,'pepe','argento','pepe@argento.com','/images/users/default.png','45551232','siempre ebrio','Misiones','Argentina','2024-10-30 02:32:49','$2a$10$2tz4Pznbk0VTTmkiJaEUcOBzD9KpUZwLxKOdKKRVf02WwVZ9hIcHm',0,1,1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drinktype`
--

DROP TABLE IF EXISTS `drinktype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drinktype` (
  `ID_Drinktype` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_Drinktype`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drinktype`
--

LOCK TABLES `drinktype` WRITE;
/*!40000 ALTER TABLE `drinktype` DISABLE KEYS */;
INSERT INTO `drinktype` VALUES (1,'Vino'),(2,'Vino tinto'),(3,'Vino blanco'),(4,'Vino rosado'),(5,'Espumoso'),(6,'Lager'),(7,'Ale'),(8,'Stout'),(9,'IPA'),(10,'Whisky'),(11,'Ron'),(12,'Tequila'),(13,'Vodka'),(14,'Martini'),(15,'Mojito');
/*!40000 ALTER TABLE `drinktype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `ID_invoice` int NOT NULL AUTO_INCREMENT,
  `Numero_invoice` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ID_Customer` int NOT NULL,
  `ID_Cart` int NOT NULL,
  `issue_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` enum('pagado','pendiente','cancelado') COLLATE utf8mb4_general_ci NOT NULL,
  `shipping_address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  `ID_Product` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `drink_description` text COLLATE utf8mb4_general_ci,
  `drink_type` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `Presentation` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `Stock` int NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Barcode` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Maturity` date DEFAULT NULL,
  `highlighted` tinyint(1) DEFAULT NULL,
  `offer` tinyint(1) DEFAULT NULL,
  `Image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '../images/products/default.jpg',
  PRIMARY KEY (`ID_Product`),
  UNIQUE KEY `Barcode` (`Barcode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Cerveza Quilmes','Cerveza rubia tradicional','Cerveza',500,150.00,100,'Quilmes','7791234567890','2025-12-31',1,0,'../images/products/1723084722222-.jpg'),(2,'Vino Malbec','Vino tinto de Mendoza','Vino',750,450.00,50,'Trapiche','7790987654321','2028-06-30',0,1,'../images/products/default.jpg'),(3,'Whisky Johnnie Walker','Whisky escocés','Whisky',700,1200.00,25,'Johnnie Walker','7796543210987','2030-11-20',1,1,'../images/products/default.jpg'),(4,'Espumante Chandon','Espumante de calidad','Espumante',750,800.00,30,'Chandon','7798765432109','2027-03-15',1,0,'../images/products/1723507935210-.jpg'),(5,'Licor Baileys','Licor de crema irlandesa','Licor',700,600.00,15,'Baileys','7795678901234','2029-09-10',0,1,'../images/products/1723507935210-.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bienhelada'
--

--
-- Dumping routines for database 'bienhelada'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 20:40:35
