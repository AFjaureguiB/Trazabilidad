-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: key_project
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `processes`
--

DROP TABLE IF EXISTS `processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `maxusers` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--

LOCK TABLES `processes` WRITE;
/*!40000 ALTER TABLE `processes` DISABLE KEYS */;
INSERT INTO `processes` VALUES (1,'Donantes y tejidos',10,'2024-06-21 13:38:44','2024-06-21 13:38:45'),(2,'Control de calidad de materia prima',1,'2024-06-21 13:39:21','2024-06-21 13:39:22'),(3,'Producción y creación de referencias de injertos óseos',2,'2024-06-21 13:40:34','2024-06-21 13:40:35'),(4,'Control de calidad de producto terminado',1,'2024-06-21 13:41:12','2024-06-21 13:41:13'),(5,'Logística de distribución y trazabilidad de implantación',2,'2024-06-21 13:41:55','2024-06-21 13:41:56');
/*!40000 ALTER TABLE `processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','2024-06-18 14:01:23','2024-06-18 14:01:23'),(2,'ASSISTANT','2024-06-18 14:02:46','2024-06-18 14:02:46');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `roleId` int NOT NULL,
  `processId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `role_id_idx` (`roleId`),
  KEY `process_id_idx` (`processId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Arturo','Escobar','psychokiller2144','$2a$10$x0.PpCTtvjg2nMzyoSaa.eeV5UKbW461a/tVJtfp1dLXXXPqrvawi','arturo@mail.com','2024-06-18 14:01:23','2024-06-30 04:44:20',1,1),(2,'Keidy','Zapardiel','keidy1234','$2a$10$inyYOQ1XU1by8hsIApRYNe1Tb05J5W6Jsi4914ueyB1.b207WvJzG','keidy@mail.com','2024-06-18 14:02:46','2024-07-05 00:21:23',1,3),(3,'Ervin','Howell','Antonette','mySuperPass','Shanna@melissa.tv','2024-06-18 15:35:15','2024-06-18 15:35:25',2,1),(4,'Norma','Gilbert','norma23415','jameson','norma.gilbert@example.com','2024-06-25 00:56:32','2024-06-25 00:56:32',2,3),(5,'Tyler','Little','tylerXLR8','harleyQueen','tyler.little@example.com','2024-06-25 01:40:37','2024-06-25 01:40:37',2,1),(6,'Arlene','Pierce','SuperArlene','$2a$10$52rbWhMCUM1tnF8JjMkfd.DxiIfuLdB607pJUgQjCIlKaM4.Zunx2','arlene.pierce@example.com','2024-06-30 00:59:58','2024-06-30 00:59:58',2,1),(9,'Claire','Stevens','claire.stevens','$2a$10$m8EKfEQk4wi8CgmQMd3n1u7MRsckA5nnJoLxm6QgeUTW5gKRwAVKO','claire.stevens@example.com','2024-06-30 01:36:51','2024-06-30 01:36:51',2,3),(10,'Henry','Rice','hendryDotRice','$2a$10$W7HKA2BdpDS8w4ty1UYQ1uenvB4REv6sHX0TxODHzD8dOoRuBVM9.','henry.rice@example.com','2024-07-01 03:35:12','2024-07-01 03:35:12',2,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-18 23:18:08
