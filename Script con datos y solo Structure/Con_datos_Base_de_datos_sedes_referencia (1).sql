CREATE DATABASE  IF NOT EXISTS `sedes_referencia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sedes_referencia`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: sedes_referencia_final
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `acompaniante`
--

DROP TABLE IF EXISTS `acompaniante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acompaniante` (
  `acompaniante_ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(65) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `parentesco` varchar(40) NOT NULL,
  `paciente_paciente_ID` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`acompaniante_ID`),
  KEY `fk_acompaniante_paciente1_idx` (`paciente_paciente_ID`),
  CONSTRAINT `fk_acompaniante_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acompaniante`
--

LOCK TABLES `acompaniante` WRITE;
/*!40000 ALTER TABLE `acompaniante` DISABLE KEYS */;
/*!40000 ALTER TABLE `acompaniante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antecedente_obstetrico`
--

DROP TABLE IF EXISTS `antecedente_obstetrico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antecedente_obstetrico` (
  `antecedente_obstetrico` mediumint NOT NULL AUTO_INCREMENT,
  `FUM` date DEFAULT NULL,
  `gpa` varchar(10) DEFAULT NULL,
  `fpp` date DEFAULT NULL,
  `rpm` time DEFAULT NULL,
  `fcf` int DEFAULT NULL,
  `maduracion_pulmonar` tinyint DEFAULT NULL,
  `is_value` float DEFAULT NULL,
  `paciente_paciente_ID` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`antecedente_obstetrico`),
  KEY `fk_antecedente_obstetrico_paciente1_idx` (`paciente_paciente_ID`),
  CONSTRAINT `fk_antecedente_obstetrico_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antecedente_obstetrico`
--

LOCK TABLES `antecedente_obstetrico` WRITE;
/*!40000 ALTER TABLE `antecedente_obstetrico` DISABLE KEYS */;
/*!40000 ALTER TABLE `antecedente_obstetrico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_personal_salud`
--

DROP TABLE IF EXISTS `area_personal_salud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area_personal_salud` (
  `area_personal_salud_ID` int NOT NULL AUTO_INCREMENT,
  `personal_salud_personal_ID` mediumint NOT NULL,
  `area` varchar(45) NOT NULL DEFAULT 'S/A',
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`area_personal_salud_ID`),
  KEY `area_personal_idx` (`personal_salud_personal_ID`),
  CONSTRAINT `area_personal` FOREIGN KEY (`personal_salud_personal_ID`) REFERENCES `personal_salud` (`personal_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_personal_salud`
--

LOCK TABLES `area_personal_salud` WRITE;
/*!40000 ALTER TABLE `area_personal_salud` DISABLE KEYS */;
INSERT INTO `area_personal_salud` VALUES (4,1,'','2024-05-01'),(9,1,'Internado','2024-11-01'),(69,1,'Emergencia','2024-08-01'),(71,1,'Consulta Externa','2024-08-01'),(72,1,'Internado','2024-08-01'),(73,12,'Internado','2024-11-01'),(75,12,'Consulta Externa','2024-11-01'),(76,11,'Emergencia','2024-11-01'),(77,11,'Consulta Externa','2024-11-01'),(78,1,'Consulta Externa','2024-11-01');
/*!40000 ALTER TABLE `area_personal_salud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cama`
--

DROP TABLE IF EXISTS `cama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cama` (
  `cama_ID` int NOT NULL AUTO_INCREMENT,
  `estado` tinyint DEFAULT '1',
  `establecimiento_salud_ID` smallint DEFAULT NULL,
  `especialidad_ID` smallint DEFAULT NULL,
  `servicio_ID` smallint DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_creacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`cama_ID`),
  KEY `establecimiento_salud_ID` (`establecimiento_salud_ID`),
  KEY `especialidad_ID` (`especialidad_ID`),
  KEY `servicio_ID` (`servicio_ID`),
  CONSTRAINT `cama_ibfk_1` FOREIGN KEY (`establecimiento_salud_ID`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `cama_ibfk_2` FOREIGN KEY (`especialidad_ID`) REFERENCES `especialidad` (`especialidad_ID`),
  CONSTRAINT `cama_ibfk_3` FOREIGN KEY (`servicio_ID`) REFERENCES `servicio` (`servicio_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cama`
--

LOCK TABLES `cama` WRITE;
/*!40000 ALTER TABLE `cama` DISABLE KEYS */;
INSERT INTO `cama` VALUES (1,1,1,1,1,'2024-11-15 01:05:36',NULL,1),(2,1,1,5,1,'2024-11-15 01:05:36',NULL,1),(3,1,9,10,1,'2024-11-15 01:05:36',NULL,1);
/*!40000 ALTER TABLE `cama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codificacion_turnos`
--

DROP TABLE IF EXISTS `codificacion_turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codificacion_turnos` (
  `codificacion_turnos_id` int NOT NULL AUTO_INCREMENT,
  `especialidad_especialidad_ID` smallint NOT NULL,
  `Turno` varchar(45) NOT NULL,
  `Sigla` varchar(5) NOT NULL,
  `Hora_Inicio` time NOT NULL,
  `Hora_Fin` time NOT NULL,
  `Carga_Horaria` varchar(6) NOT NULL,
  `fecha` date DEFAULT NULL,
  `establecimiento_idestablecimiento_ID` smallint DEFAULT NULL,
  PRIMARY KEY (`codificacion_turnos_id`),
  KEY `especialidad_codificacion_turno_idx` (`especialidad_especialidad_ID`),
  KEY `establecimiento_codificacion_turno_idx` (`establecimiento_idestablecimiento_ID`),
  CONSTRAINT `especialidad_codificacion_turno` FOREIGN KEY (`especialidad_especialidad_ID`) REFERENCES `especialidad` (`especialidad_ID`),
  CONSTRAINT `establecimiento_codificacion_turno` FOREIGN KEY (`establecimiento_idestablecimiento_ID`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codificacion_turnos`
--

LOCK TABLES `codificacion_turnos` WRITE;
/*!40000 ALTER TABLE `codificacion_turnos` DISABLE KEYS */;
INSERT INTO `codificacion_turnos` VALUES (1,8,'Especial','w','11:13:00','21:13:00','10h','2024-05-01',1),(2,8,'preueba 25','Ep','11:14:00','16:14:00','5h','2024-05-01',1),(3,8,'Especial','w','07:01:00','19:01:00','12h','2024-11-01',1),(4,8,'Mañana','M','07:00:00','12:00:00','5h','2024-11-01',1),(5,8,'Especial5','w','11:13:00','21:13:00','10h','2024-08-01',1),(6,8,'preueba 25','Ep','11:14:00','16:14:00','5h','2024-08-01',1),(7,8,'Mañana','w','13:30:00','09:30:00','20h','2024-08-01',1),(8,8,'preueba 2','w','11:31:00','11:31:00','24h','2024-08-01',1),(9,8,'Mañanita','ES','07:41:00','13:41:00','6h','2024-11-01',2),(10,8,'Especial','Esp','09:41:00','15:41:00','6h','2024-11-01',1);
/*!40000 ALTER TABLE `codificacion_turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrareferencia`
--

DROP TABLE IF EXISTS `contrareferencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrareferencia` (
  `contrareferencia_id` int NOT NULL AUTO_INCREMENT,
  `fecha_retorno` date NOT NULL,
  `diagnostico_retorno` text,
  `evolucion` text,
  `tratamiento_realizado` text,
  `recomendaciones` text,
  `referencia_referencia_ID` int NOT NULL,
  `estado_aprobacion` tinyint DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`contrareferencia_id`),
  KEY `fk_contrareferencia_referencia1_idx` (`referencia_referencia_ID`),
  CONSTRAINT `fk_contrareferencia_referencia1` FOREIGN KEY (`referencia_referencia_ID`) REFERENCES `referencia` (`referencia_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrareferencia`
--

LOCK TABLES `contrareferencia` WRITE;
/*!40000 ALTER TABLE `contrareferencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `contrareferencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dato_clinico`
--

DROP TABLE IF EXISTS `dato_clinico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dato_clinico` (
  `dato_clinico_ID` mediumint NOT NULL AUTO_INCREMENT,
  `frecuencia_cardiaca` int DEFAULT NULL,
  `frecuencia_respiratoria` int DEFAULT NULL,
  `presion_arterial` varchar(12) DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `glasgow` int DEFAULT NULL,
  `saturacion_oxigeno` float DEFAULT NULL,
  `peso` float DEFAULT NULL,
  `talla` float DEFAULT NULL,
  `imc` float DEFAULT NULL,
  `paciente_paciente_ID` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`dato_clinico_ID`),
  KEY `fk_dato_clinico_paciente1_idx` (`paciente_paciente_ID`),
  CONSTRAINT `fk_dato_clinico_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dato_clinico`
--

LOCK TABLES `dato_clinico` WRITE;
/*!40000 ALTER TABLE `dato_clinico` DISABLE KEYS */;
/*!40000 ALTER TABLE `dato_clinico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostico`
--

DROP TABLE IF EXISTS `diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnostico` (
  `diagnostico_ID` mediumint NOT NULL AUTO_INCREMENT,
  `diagnostico_presuntivo` varchar(105) DEFAULT NULL,
  `paciente_paciente_ID` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`diagnostico_ID`),
  KEY `fk_diagnostico_paciente1_idx` (`paciente_paciente_ID`),
  CONSTRAINT `fk_diagnostico_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostico`
--

LOCK TABLES `diagnostico` WRITE;
/*!40000 ALTER TABLE `diagnostico` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `especialidad_ID` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  `emergencias` tinyint DEFAULT NULL,
  `medicina_interna` tinyint DEFAULT NULL,
  `consulta_externa` tinyint DEFAULT NULL,
  PRIMARY KEY (`especialidad_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'EMERGENCIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(2,'ANESTESIOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(3,'MEDICINA INTERNA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(4,'CIRUGIA GENERAL',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(5,'GINECOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(6,'PEDIATRIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(7,'TRAUMATOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(8,'CARDIOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(9,'CIRUGIA MAXILO FACIAL',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(10,'GASTROENTEROLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(11,'HEMATOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(12,'NEFROLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(13,'NEUMOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(14,'NEUROCIRUGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(15,'NEUROLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(16,'OTORRINOLARINGOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(17,'TOXICOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(18,'UROLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(19,'ALERGOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(20,'CIRUGIA CARDIOVASCULAR',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(21,'CIRUGIA TORAXICA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(22,'CIRUGIA ONCOLOGICA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(23,'DERMATOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(24,'ENDOCRINOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(25,'CIRUGIA PLASTICA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(26,'GERIATRIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(27,'OFTALMOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(28,'ONCOLOGIA',1,'2024-10-24 03:41:03',NULL,1,NULL,NULL,NULL,NULL),(29,'LABORATORIO',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(30,'RAYOS X',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(31,'TOMOGRAFIA',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(32,'ECOGRAFIA',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(33,'ECOCARDIOGRAMA',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(34,'ENDOSCOPIA',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(35,'FARMACIA',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(36,'FISIOTERAPIA',1,'2024-10-24 20:03:01',NULL,1,NULL,NULL,NULL,NULL),(37,'TRANSFUSIONAL',0,'2024-10-24 20:03:01','2024-11-06 15:55:09',1,1,NULL,NULL,NULL),(38,'ODONTOLOGIA',0,'2024-10-24 20:03:01','2024-11-06 15:55:05',1,1,NULL,NULL,NULL),(39,'ejemplo1',0,'2024-11-02 21:52:19','2024-11-02 21:52:36',1,1,NULL,NULL,NULL),(40,'EJMPLOD',0,'2024-11-27 09:50:38','2024-11-27 09:51:03',4,4,NULL,NULL,NULL);
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `establecimiento_salud`
--

DROP TABLE IF EXISTS `establecimiento_salud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `establecimiento_salud` (
  `idestablecimiento_ID` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(65) NOT NULL,
  `nivel` varchar(30) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `red_cordinacion_red_ID` tinyint NOT NULL,
  `municipio_ID` smallint NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  `rues` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idestablecimiento_ID`),
  KEY `fk_establecimiento_salud_red_cordinacion1_idx` (`red_cordinacion_red_ID`),
  KEY `fk_establecimiento_salud_municipio1_idx` (`municipio_ID`),
  CONSTRAINT `fk_establecimiento_salud_municipio1` FOREIGN KEY (`municipio_ID`) REFERENCES `municipio` (`municipio_ID`),
  CONSTRAINT `fk_establecimiento_salud_red_cordinacion1` FOREIGN KEY (`red_cordinacion_red_ID`) REFERENCES `red_cordinacion` (`red_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `establecimiento_salud`
--

LOCK TABLES `establecimiento_salud` WRITE;
/*!40000 ALTER TABLE `establecimiento_salud` DISABLE KEYS */;
INSERT INTO `establecimiento_salud` VALUES (1,'Hospital Solomon Klein','Segundo Nivel','4265899',-17.40046900,-66.03841400,3,21,1,'2024-10-25 04:31:43','2024-11-01 05:40:10',1,1,'HOSP001'),(2,'Hospital del Norte','Tercer Nivel','4417890',-17.35961800,-66.17515300,2,1,1,'2024-10-25 04:31:43','2024-11-01 05:12:48',1,1,'HOSP002'),(3,'Hospital del Sur','Segundo Nivel','4420987',-17.42032000,-66.18677700,2,1,0,'2024-10-25 04:31:43','2024-11-06 15:54:56',1,1,'HOSP003'),(8,'ds','Primer Nivel','345',-17.39350000,-66.15700000,1,34,1,'2024-11-08 00:55:19',NULL,1,NULL,'dfsd'),(9,'hospitalm ejemplo','Primer Nivel','453544',-17.40501181,-66.12434953,1,21,1,'2024-11-27 09:58:41','2024-11-27 09:58:57',4,4,'hosp45');
/*!40000 ALTER TABLE `establecimiento_salud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `establecimiento_salud_has_especialidad`
--

DROP TABLE IF EXISTS `establecimiento_salud_has_especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `establecimiento_salud_has_especialidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `establecimiento_salud_idestablecimiento_ID` smallint NOT NULL,
  `especialidad_ID` smallint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_establecimiento_salud_idx` (`establecimiento_salud_idestablecimiento_ID`),
  KEY `fk_establecimiento_salud_has_especialidad_idx` (`especialidad_ID`),
  CONSTRAINT `fk_establecimiento_salud_has_especialidad_idx` FOREIGN KEY (`especialidad_ID`) REFERENCES `especialidad` (`especialidad_ID`),
  CONSTRAINT `fk_establecimiento_salud_idx` FOREIGN KEY (`establecimiento_salud_idestablecimiento_ID`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `establecimiento_salud_has_especialidad`
--

LOCK TABLES `establecimiento_salud_has_especialidad` WRITE;
/*!40000 ALTER TABLE `establecimiento_salud_has_especialidad` DISABLE KEYS */;
INSERT INTO `establecimiento_salud_has_especialidad` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,2,8),(13,1,12),(14,1,13);
/*!40000 ALTER TABLE `establecimiento_salud_has_especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `establecimiento_salud_servicio`
--

DROP TABLE IF EXISTS `establecimiento_salud_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `establecimiento_salud_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `establecimiento_salud_id` smallint NOT NULL,
  `servicio_id` smallint NOT NULL,
  `equipo_instrumental` tinyint DEFAULT '0',
  `medicamentos_reactivos` tinyint DEFAULT '0',
  `insumos` tinyint DEFAULT '0',
  `fecha_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `establecimiento_salud_id` (`establecimiento_salud_id`),
  KEY `servicio_id` (`servicio_id`),
  CONSTRAINT `establecimiento_salud_servicio_ibfk_1` FOREIGN KEY (`establecimiento_salud_id`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `establecimiento_salud_servicio_ibfk_2` FOREIGN KEY (`servicio_id`) REFERENCES `servicio` (`servicio_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `establecimiento_salud_servicio`
--

LOCK TABLES `establecimiento_salud_servicio` WRITE;
/*!40000 ALTER TABLE `establecimiento_salud_servicio` DISABLE KEYS */;
INSERT INTO `establecimiento_salud_servicio` VALUES (1,1,1,0,1,1,'2024-11-27 09:48:49'),(2,1,2,0,1,1,'2024-11-27 09:48:49'),(3,1,3,0,0,0,'2024-11-27 09:48:49'),(4,1,4,1,0,0,'2024-11-27 09:48:49'),(5,1,5,1,0,0,'2024-11-27 09:48:49'),(6,1,6,1,0,0,'2024-11-27 09:48:49'),(7,1,7,1,0,0,'2024-11-27 09:48:49'),(8,1,8,1,0,0,'2024-11-27 09:48:49'),(9,1,9,1,0,0,'2024-11-27 09:48:49'),(10,1,10,1,0,0,'2024-11-27 09:48:49'),(11,1,11,1,0,0,'2024-11-27 09:48:49'),(12,1,12,1,0,0,'2024-11-27 09:48:49'),(13,1,13,0,0,0,'2024-11-27 09:48:49'),(14,1,14,0,1,0,'2024-11-27 09:48:49'),(15,1,15,0,0,0,'2024-11-27 09:48:49');
/*!40000 ALTER TABLE `establecimiento_salud_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_cama`
--

DROP TABLE IF EXISTS `historial_cama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_cama` (
  `historia_ID` int NOT NULL AUTO_INCREMENT,
  `cama_ID` int NOT NULL,
  `instalada` mediumint DEFAULT NULL,
  `ofertada` mediumint DEFAULT NULL,
  `disponible` mediumint DEFAULT NULL,
  `ocupada` mediumint DEFAULT NULL,
  `alta` mediumint DEFAULT NULL,
  `es_actual` tinyint(1) DEFAULT '0',
  `usuario_modificacion` mediumint DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`historia_ID`),
  KEY `fk_cama` (`cama_ID`),
  CONSTRAINT `fk_cama` FOREIGN KEY (`cama_ID`) REFERENCES `cama` (`cama_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_cama`
--

LOCK TABLES `historial_cama` WRITE;
/*!40000 ALTER TABLE `historial_cama` DISABLE KEYS */;
INSERT INTO `historial_cama` VALUES (1,1,50,40,20,18,2,0,1,'2024-11-14 23:52:47'),(2,2,40,35,20,13,2,0,1,'2024-11-14 23:53:30'),(3,1,50,40,19,18,3,0,0,'2024-11-15 02:02:46'),(4,1,50,40,19,18,3,1,0,'2024-11-17 01:31:16'),(5,2,40,35,19,13,3,1,0,'2024-11-17 01:32:49');
/*!40000 ALTER TABLE `historial_cama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario_establecimiento_especialidad`
--

DROP TABLE IF EXISTS `horario_establecimiento_especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario_establecimiento_especialidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `establecimiento_salud_has_especialidad_id` int NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_final` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_horario_establecimiento_especialidad_idx` (`establecimiento_salud_has_especialidad_id`),
  CONSTRAINT `fk_horario_establecimiento_especialidad` FOREIGN KEY (`establecimiento_salud_has_especialidad_id`) REFERENCES `establecimiento_salud_has_especialidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario_establecimiento_especialidad`
--

LOCK TABLES `horario_establecimiento_especialidad` WRITE;
/*!40000 ALTER TABLE `horario_establecimiento_especialidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario_establecimiento_especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoreo_traslado`
--

DROP TABLE IF EXISTS `monitoreo_traslado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monitoreo_traslado` (
  `monitoreo_traslado_ID` int NOT NULL AUTO_INCREMENT,
  `hora` time DEFAULT NULL,
  `presion_arterial` varchar(10) DEFAULT NULL,
  `saturacion_oxigeno` float DEFAULT NULL,
  `frecuencia_cardiaca` smallint DEFAULT NULL,
  `frecuencia_respiratoria` smallint DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `glasgow` int DEFAULT NULL,
  `diuresis` float DEFAULT NULL,
  `oxigenoterapia` float DEFAULT NULL,
  `reanimacion_cardiopulmonar` tinyint DEFAULT NULL,
  `liquidos_intravenosos` text,
  `transferencia_transferencia_ID` int NOT NULL,
  `estado_aprobacion` tinyint DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`monitoreo_traslado_ID`),
  KEY `fk_monitoreo_traslado_transferencia1_idx` (`transferencia_transferencia_ID`),
  CONSTRAINT `fk_monitoreo_traslado_transferencia1` FOREIGN KEY (`transferencia_transferencia_ID`) REFERENCES `transferencia` (`transferencia_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoreo_traslado`
--

LOCK TABLES `monitoreo_traslado` WRITE;
/*!40000 ALTER TABLE `monitoreo_traslado` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitoreo_traslado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipio` (
  `municipio_ID` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `provincia_provincia_ID` tinyint NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`municipio_ID`),
  KEY `fk_municipio_provincia1_idx` (`provincia_provincia_ID`),
  CONSTRAINT `fk_municipio_provincia1` FOREIGN KEY (`provincia_provincia_ID`) REFERENCES `provincia` (`provincia_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipio`
--

LOCK TABLES `municipio` WRITE;
/*!40000 ALTER TABLE `municipio` DISABLE KEYS */;
INSERT INTO `municipio` VALUES (1,'Cochabamba',7,1,'2024-10-17 19:25:21',NULL),(2,'Quillacollo',13,1,'2024-10-17 19:25:21',NULL),(3,'Vinto',13,1,'2024-10-17 19:25:21',NULL),(4,'Sipe Sipe',13,1,'2024-10-17 19:25:21',NULL),(5,'Tiquipaya',13,1,'2024-10-17 19:25:21',NULL),(6,'Colcapirhua',13,1,'2024-10-17 19:25:21',NULL),(7,'Punata',12,1,'2024-10-17 19:25:21',NULL),(8,'Villa Rivero',12,1,'2024-10-17 19:25:21',NULL),(9,'Tacachi',12,1,'2024-10-17 19:25:21',NULL),(10,'San Benito',12,1,'2024-10-17 19:25:21',NULL),(11,'Cuchumuela',12,1,'2024-10-17 19:25:21',NULL),(12,'Cliza',10,1,'2024-10-17 19:25:21',NULL),(13,'Toco',10,1,'2024-10-17 19:25:21',NULL),(14,'Tolata',10,1,'2024-10-17 19:25:21',NULL),(15,'Tarata',9,1,'2024-10-17 19:25:21',NULL),(16,'Anzaldo',9,1,'2024-10-17 19:25:21',NULL),(17,'Arbieto',9,1,'2024-10-17 19:25:21',NULL),(18,'Villa Tunari',8,1,'2024-10-17 19:25:21',NULL),(19,'Shinahota',8,1,'2024-10-17 19:25:21',NULL),(20,'Puerto Villarroel',8,1,'2024-10-17 19:25:21',NULL),(21,'Sacaba',8,1,'2024-10-17 19:25:21',NULL),(22,'Tiraque',15,1,'2024-10-17 19:25:21',NULL),(23,'Sacabamba',15,1,'2024-10-17 19:25:21',NULL),(24,'Capinota',5,1,'2024-10-17 19:25:21',NULL),(25,'Sicaya',5,1,'2024-10-17 19:25:21',NULL),(26,'Santiváñez',5,1,'2024-10-17 19:25:21',NULL),(27,'Arani',1,1,'2024-10-17 19:25:21',NULL),(28,'Vacas',1,1,'2024-10-17 19:25:21',NULL),(29,'Arque',2,1,'2024-10-17 19:25:21',NULL),(30,'Tacopaya',2,1,'2024-10-17 19:25:21',NULL),(31,'Independencia',3,1,'2024-10-17 19:25:21',NULL),(32,'Morochata',3,1,'2024-10-17 19:25:21',NULL),(33,'Mizque',11,1,'2024-10-17 19:25:21',NULL),(34,'Alalay',11,1,'2024-10-17 19:25:21',NULL),(35,'Vila Vila',11,1,'2024-10-17 19:25:21',NULL),(36,'Totora',6,1,'2024-10-17 19:25:21',NULL),(37,'Pocona',6,1,'2024-10-17 19:25:21',NULL),(38,'Pojo',6,1,'2024-10-17 19:25:21',NULL),(39,'Tapacarí',14,1,'2024-10-17 19:25:21',NULL),(40,'Bolívar',4,1,'2024-10-17 19:25:21',NULL),(41,'Cochabamba',7,1,'2024-10-24 20:45:42',NULL),(42,'Quillacollo',13,1,'2024-10-24 20:45:42',NULL),(43,'Vinto',13,1,'2024-10-24 20:45:42',NULL),(44,'Sipe Sipe',13,1,'2024-10-24 20:45:42',NULL),(45,'Tiquipaya',13,1,'2024-10-24 20:45:42',NULL),(46,'Colcapirhua',13,1,'2024-10-24 20:45:42',NULL),(47,'Punata',12,1,'2024-10-24 20:45:42',NULL),(48,'Villa Rivero',12,1,'2024-10-24 20:45:42',NULL),(49,'Tacachi',12,1,'2024-10-24 20:45:42',NULL),(50,'San Benito',12,1,'2024-10-24 20:45:42',NULL),(51,'Cuchumuela',12,1,'2024-10-24 20:45:42',NULL),(52,'Cliza',10,1,'2024-10-24 20:45:42',NULL),(53,'Toco',10,1,'2024-10-24 20:45:42',NULL),(54,'Tolata',10,1,'2024-10-24 20:45:42',NULL),(55,'Tarata',9,1,'2024-10-24 20:45:42',NULL),(56,'Anzaldo',9,1,'2024-10-24 20:45:42',NULL),(57,'Arbieto',9,1,'2024-10-24 20:45:42',NULL),(58,'Villa Tunari',8,1,'2024-10-24 20:45:42',NULL),(59,'Shinahota',8,1,'2024-10-24 20:45:42',NULL),(60,'Puerto Villarroel',8,1,'2024-10-24 20:45:42',NULL),(61,'Sacaba',8,1,'2024-10-24 20:45:42',NULL),(62,'Tiraque',15,1,'2024-10-24 20:45:42',NULL),(63,'Sacabamba',15,1,'2024-10-24 20:45:42',NULL),(64,'Capinota',5,1,'2024-10-24 20:45:42',NULL),(65,'Sicaya',5,1,'2024-10-24 20:45:42',NULL),(66,'Santiváñez',5,1,'2024-10-24 20:45:42',NULL),(67,'Arani',1,1,'2024-10-24 20:45:42',NULL),(68,'Vacas',1,1,'2024-10-24 20:45:42',NULL),(69,'Arque',2,1,'2024-10-24 20:45:42',NULL),(70,'Tacopaya',2,1,'2024-10-24 20:45:42',NULL),(71,'Independencia',3,1,'2024-10-24 20:45:42',NULL),(72,'Morochata',3,1,'2024-10-24 20:45:42',NULL),(73,'Mizque',11,1,'2024-10-24 20:45:42',NULL),(74,'Alalay',11,1,'2024-10-24 20:45:42',NULL),(75,'Vila Vila',11,1,'2024-10-24 20:45:42',NULL),(76,'Totora',6,1,'2024-10-24 20:45:42',NULL),(77,'Pocona',6,1,'2024-10-24 20:45:42',NULL),(78,'Pojo',6,1,'2024-10-24 20:45:42',NULL),(79,'Tapacarí',14,1,'2024-10-24 20:45:42',NULL),(80,'Bolívar',4,1,'2024-10-24 20:45:42',NULL);
/*!40000 ALTER TABLE `municipio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipio_has_red_cordinacion`
--

DROP TABLE IF EXISTS `municipio_has_red_cordinacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipio_has_red_cordinacion` (
  `municipio_municipio_ID` smallint NOT NULL,
  `red_cordinacion_red_ID` tinyint NOT NULL,
  PRIMARY KEY (`municipio_municipio_ID`,`red_cordinacion_red_ID`),
  KEY `fk_municipio_has_red_cordinacion_red_cordinacion1_idx` (`red_cordinacion_red_ID`),
  KEY `fk_municipio_has_red_cordinacion_municipio1_idx` (`municipio_municipio_ID`),
  CONSTRAINT `fk_municipio_has_red_cordinacion_municipio1` FOREIGN KEY (`municipio_municipio_ID`) REFERENCES `municipio` (`municipio_ID`),
  CONSTRAINT `fk_municipio_has_red_cordinacion_red_cordinacion1` FOREIGN KEY (`red_cordinacion_red_ID`) REFERENCES `red_cordinacion` (`red_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipio_has_red_cordinacion`
--

LOCK TABLES `municipio_has_red_cordinacion` WRITE;
/*!40000 ALTER TABLE `municipio_has_red_cordinacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `municipio_has_red_cordinacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `paciente_ID` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(70) NOT NULL,
  `primer_apellido` varchar(45) NOT NULL,
  `segundo_apellido` varchar(45) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `ci` varchar(12) NOT NULL,
  `domicilio` text,
  `telefono` varchar(12) NOT NULL,
  `historia_clinica` varchar(45) DEFAULT NULL,
  `procedencia` varchar(45) DEFAULT NULL,
  `sexo` char(1) NOT NULL,
  `discapacidad` char(2) NOT NULL,
  `tipo_discapacidad` varchar(50) DEFAULT NULL,
  `grado_discapacidad` varchar(50) DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_especialidad_hospital`
--

DROP TABLE IF EXISTS `personal_especialidad_hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_especialidad_hospital` (
  `idPersonal_Especialidad_Hospital` int NOT NULL AUTO_INCREMENT,
  `Personal_salud_id` mediumint NOT NULL,
  `Especialidad_id` smallint NOT NULL,
  `Hospital_id` smallint NOT NULL,
  PRIMARY KEY (`idPersonal_Especialidad_Hospital`),
  KEY `Especialidad_idx` (`Especialidad_id`),
  KEY `Hospital_idx` (`Hospital_id`),
  KEY `Personal_salud_idx` (`Personal_salud_id`),
  CONSTRAINT `Especialidad` FOREIGN KEY (`Especialidad_id`) REFERENCES `especialidad` (`especialidad_ID`),
  CONSTRAINT `Hospital` FOREIGN KEY (`Hospital_id`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `Personal_salud` FOREIGN KEY (`Personal_salud_id`) REFERENCES `personal_salud` (`personal_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_especialidad_hospital`
--

LOCK TABLES `personal_especialidad_hospital` WRITE;
/*!40000 ALTER TABLE `personal_especialidad_hospital` DISABLE KEYS */;
INSERT INTO `personal_especialidad_hospital` VALUES (1,1,8,1),(3,12,8,1),(4,11,8,2),(5,2,8,1);
/*!40000 ALTER TABLE `personal_especialidad_hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_salud`
--

DROP TABLE IF EXISTS `personal_salud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_salud` (
  `personal_ID` mediumint NOT NULL AUTO_INCREMENT,
  `nombres` varchar(70) NOT NULL,
  `primer_apellido` varchar(45) NOT NULL,
  `segundo_apellido` varchar(45) NOT NULL,
  `ci` varchar(12) NOT NULL,
  `matricula_profesional` varchar(60) NOT NULL,
  `sexo` char(1) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `establecimiento_salud_idestablecimiento_ID` smallint NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `telefono` int DEFAULT NULL,
  PRIMARY KEY (`personal_ID`),
  KEY `fk_personal_salud_establecimiento_salud1_idx` (`establecimiento_salud_idestablecimiento_ID`),
  CONSTRAINT `fk_personal_salud_establecimiento_salud1` FOREIGN KEY (`establecimiento_salud_idestablecimiento_ID`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_salud`
--

LOCK TABLES `personal_salud` WRITE;
/*!40000 ALTER TABLE `personal_salud` DISABLE KEYS */;
INSERT INTO `personal_salud` VALUES (1,'joel','lopez','ticlla','12345678','SQ-123456','M','Jefe',1,1,'2024-11-09 02:31:52','2024-11-27 10:47:23',1,NULL,'yajuego69@gmail.com',NULL),(2,'Angelica','Cespedez','Arancibia','99887766','MP00121','F','Jefe',1,1,'2024-11-15 01:21:49','2024-11-27 10:48:30',1,NULL,'mp2797598@gmail.com',78548962),(3,'Rover','Serrano','Rovercito','1234567899','SQ-0034','M','Admin Hospital',1,1,'2024-11-15 08:58:03',NULL,2,NULL,'serranorover436@gmail.com',78548962),(4,'Angel','Perez','Sanches','99887766','MP00122','M','Jefe',1,1,'2024-11-16 22:18:43','2024-11-27 15:05:36',2,NULL,'serranorover436@gmail.com',78958651),(11,'Jorge','Varela','Quiroz','13184246','MP12345','M','Jefe',2,1,'2024-11-21 11:20:00','2024-11-27 06:22:57',1,NULL,'nic.tigre95@gmail.com',60615017),(12,'Russell','Quiroz','Varela','13184249','MP12345','M','Doctor',1,1,'2024-11-21 11:33:45','2024-11-21 23:19:56',1,NULL,'nic.tigre95@gmail.com',60615013);
/*!40000 ALTER TABLE `personal_salud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `provincia_ID` tinyint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(65) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`provincia_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (1,'Arani',1,'2024-10-17 19:16:49',NULL),(2,'Arque',1,'2024-10-17 19:16:49',NULL),(3,'Ayopaya',1,'2024-10-17 19:16:49',NULL),(4,'Bolívar',1,'2024-10-17 19:16:49',NULL),(5,'Capinota',1,'2024-10-17 19:16:49',NULL),(6,'Carrasco',1,'2024-10-17 19:16:49',NULL),(7,'Cercado',1,'2024-10-17 19:16:49',NULL),(8,'Chapare',1,'2024-10-17 19:16:49',NULL),(9,'Esteban Arce',1,'2024-10-17 19:16:49',NULL),(10,'Germán Jordán',1,'2024-10-17 19:16:49',NULL),(11,'Mizque',1,'2024-10-17 19:16:49',NULL),(12,'Punata',1,'2024-10-17 19:16:49',NULL),(13,'Quillacollo',1,'2024-10-17 19:16:49',NULL),(14,'Tapacarí',1,'2024-10-17 19:16:49',NULL),(15,'Tiraque',1,'2024-10-17 19:16:49',NULL),(16,'José Carrasco',1,'2024-10-17 19:16:49',NULL),(17,'Arani',1,'2024-10-24 20:45:19',NULL),(18,'Arque',1,'2024-10-24 20:45:19',NULL),(19,'Ayopaya',1,'2024-10-24 20:45:19',NULL),(20,'Bolívar',1,'2024-10-24 20:45:19',NULL),(21,'Capinota',1,'2024-10-24 20:45:19',NULL),(22,'Carrasco',1,'2024-10-24 20:45:19',NULL),(23,'Cercado',1,'2024-10-24 20:45:19',NULL),(24,'Chapare',1,'2024-10-24 20:45:19',NULL),(25,'Esteban Arce',1,'2024-10-24 20:45:19',NULL),(26,'Germán Jordán',1,'2024-10-24 20:45:19',NULL),(27,'Mizque',1,'2024-10-24 20:45:19',NULL),(28,'Punata',1,'2024-10-24 20:45:19',NULL),(29,'Quillacollo',1,'2024-10-24 20:45:19',NULL),(30,'Tapacarí',1,'2024-10-24 20:45:19',NULL),(31,'Tiraque',1,'2024-10-24 20:45:19',NULL),(32,'José Carrasco',1,'2024-10-24 20:45:19',NULL);
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `red_cordinacion`
--

DROP TABLE IF EXISTS `red_cordinacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `red_cordinacion` (
  `red_ID` tinyint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(65) NOT NULL,
  `numeracion` char(6) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`red_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `red_cordinacion`
--

LOCK TABLES `red_cordinacion` WRITE;
/*!40000 ALTER TABLE `red_cordinacion` DISABLE KEYS */;
INSERT INTO `red_cordinacion` VALUES (1,'Red A','X',1,'2024-10-17 19:21:54',NULL,1,NULL),(2,'Red B','IX',1,'2024-10-17 19:21:54',NULL,1,NULL),(3,'Red C','VIII',1,'2024-10-17 19:21:54',NULL,1,NULL),(4,'ejemplo','23',0,'2024-11-05 23:52:41','2024-11-06 00:32:45',1,1),(5,'ejemplo2','11',0,'2024-11-05 23:55:36','2024-11-06 00:32:38',1,1),(6,'ejemplo3','11',0,'2024-11-05 23:56:19','2024-11-06 00:27:43',1,1),(7,'344','33',0,'2024-11-06 00:57:41','2024-11-06 01:12:38',1,1),(8,'232','32',0,'2024-11-06 01:01:35','2024-11-06 01:12:41',1,1),(9,'22','22',0,'2024-11-06 01:04:01','2024-11-06 01:12:43',1,1),(10,'22','22',0,'2024-11-06 01:12:30','2024-11-06 01:12:45',1,1),(11,'ejemplo','XV',1,'2024-11-08 01:33:01','2024-11-08 01:41:44',1,1),(12,'RED F','XXXIX',1,'2024-11-27 09:59:52','2024-11-27 10:00:06',4,4);
/*!40000 ALTER TABLE `red_cordinacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referencia`
--

DROP TABLE IF EXISTS `referencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referencia` (
  `referencia_ID` int NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` date NOT NULL,
  `fecha_envio` date NOT NULL,
  `motivo_referencia` text,
  `nombre_contacto_receptor` varchar(65) NOT NULL,
  `medio_comunicacion` varchar(60) DEFAULT NULL,
  `fecha_recepcion` date NOT NULL,
  `hora_recepcion` time NOT NULL,
  `paciente_paciente_ID` int NOT NULL,
  `establecimiento_salud_receptor` smallint NOT NULL,
  `establecimiento_salud_referente` smallint NOT NULL,
  `estado_aprobacion` tinyint DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`referencia_ID`),
  KEY `fk_referencia_paciente1_idx` (`paciente_paciente_ID`),
  KEY `fk_referencia_establecimiento_salud1_idx` (`establecimiento_salud_receptor`),
  KEY `fk_referencia_establecimiento_salud2_idx` (`establecimiento_salud_referente`),
  CONSTRAINT `fk_referencia_establecimiento_salud1` FOREIGN KEY (`establecimiento_salud_receptor`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `fk_referencia_establecimiento_salud2` FOREIGN KEY (`establecimiento_salud_referente`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `fk_referencia_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referencia`
--

LOCK TABLES `referencia` WRITE;
/*!40000 ALTER TABLE `referencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `referencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio` (
  `servicio_ID` smallint NOT NULL AUTO_INCREMENT,
  `codigo` varchar(15) DEFAULT NULL,
  `nombre` varchar(500) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  `especialidad_ID` smallint NOT NULL,
  PRIMARY KEY (`servicio_ID`),
  KEY `especialidad_ID` (`especialidad_ID`),
  CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`especialidad_ID`) REFERENCES `especialidad` (`especialidad_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1254 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (1,'T02510001','Cardioversión farmacológica durante la atención prehospitalaria de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(2,'T02510002','Desfibrilación externa automática en atención prehospitalaria de emergencia (Cardioversión eléctrica)',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(3,'T02510003','RCP durante la atención prehospitalaria de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(4,'T02511001','Atención prehospitalaria del parto',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(5,'T02511002','Atención prehospitalaria en domicilio',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(6,'T02511003','Atención prehospitalaria en vía pública',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(7,'T02511004','Cateterismo venoso periférico durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(8,'T02511005','Cateterismo vesical durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(9,'T02511006','Colocación de sonda nasogástrica durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(10,'T02511007','Curaciones durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(11,'T02511008','Sutura en atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(12,'T02511009','Tratamiento prehospitalario de fracturas expuestas o cerradas',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(13,'T02511010','Tratamiento prehospitalario de luxaciones',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(14,'T02662001','Cardioversión farmacológica de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(15,'T02662002','Desfibrilación externa automática de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(16,'T02662003','Extracción de cuerpos extraños de vías respiratorias mediante laringoscopía de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(17,'T02662004','Intubación endotraqueal de emergencia (neonatos)',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(18,'T02662005','Intubación endotraqueal de emergencia (no neonatos)',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(19,'T02662006','Lavado gástrico de intoxicaciones',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(20,'T02662007','RCP de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(21,'T02662008','Toracocentesis diagnóstica y terapéutica de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(22,'T02662009','Traqueostomía convencional de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(23,'T02662010','Traqueostomía percutánea de emergencia',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(24,'T02662011','Colocación de catéter venoso central en emergencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(25,'T02663001','Cateterismo venoso periférico en urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(26,'T02663002','Cateterismo vesical en urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(27,'T02663003','Colocación de sonda nasogástrica en urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(28,'T02663004','Inmovilización de fracturas expuestas o cerradas (tratamiento prereferencia)',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(29,'T02663005','Lavado ocular en urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(30,'T02663006','Sutura en urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(31,'T02663007','Taponamiento nasal posterior y anterior',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(32,'T02663008','Traslado de pacientes en casos de urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(33,'T02663009','Tratamiento durante la prereferencia y el traslado de pacientes referidos',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(34,'T02663010','Colocación de catéter venoso central en urgencias',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(35,'T02511001','Atención prehospitalaria del partoComprende la atención de la madre y el recién nacido en vía pública o durante el traslado a un establecimiento de salud',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(36,'T02511002','Atención prehospitalaria en domicilioIncluye',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(37,'T02511003','Cateterismo vesical durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(38,'T02511006','Colocación de sonda nasogástrica durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(39,'T02511007','Curaciones durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(40,'T02511008','Sutura en atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(41,'T02511009','Tratamiento prehospitalario de fracturas expuestas o cerradas',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(42,'T02511010','Tratamiento prehospitalario de luxaciones',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(43,'T02511004','Cateterismo venoso periférico durante la atención prehospitalaria',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(44,'T02663011','Servicios solicitados a otro establecimiento de salud público (paciente ambulatorio de otra jurisdicción) Incluirá los servicios de laboratorio y banco de sangre que fueron solicitados a laboratorios de referencia nacional departamental y bancos de sangre ',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(45,'T03507009','Referencia de embarazadas en emergencia obstétrica y perinatal',1,'2024-10-24 05:59:01',NULL,1,NULL,1),(46,'T08639001','Anestesia general balanceada',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(47,'T08639002','Anestesia general endovenosa total (TIVA)',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(48,'T08639003','Anestesia general inhalatoria',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(49,'T08639004','Anestesia local',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(50,'T08639005','Anestesia regional endovenosa (Bloqueo de Bier)',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(51,'T08639006','Anestesia regional neuroaxial',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(52,'T08639007','Bloqueo peridural y caudal',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(53,'T08639008','Bloqueo subaracnoideo, raquídeo o espinal',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(54,'T08639009','Bloqueos troncales de miembro inferior',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(55,'T08639010','Bloqueos troncales de miembro superior',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(56,'T08639011','Sedación',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(57,'T08639012','Sedoanalgesia en procedimientos ambulatarios',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(58,'T08639013','Valoración preanestésica',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(59,'T08640006','Técnica de radiofrecuencia',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(60,'T08640007','Bloqueo facetario posterior vertebral',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(61,'T08640021','Bloqueo transforaminal con fluoroscopia',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(62,'T08640001','Analgesia del parto',1,'2024-10-24 06:33:08',NULL,1,NULL,2),(63,'SUS4','ERITROCITOSIS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(64,'SUS19','DIABETES MELLITUS CON CETOACIDOSIS (MANEJO EN TERAPIA INTERMEDIA)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(65,'SUS21','DIABETES MELLITUS TIPO I (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(66,'SUS22','DIABETES MELLITUS TIPO II (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(67,'SUS23','HIPOTIROIDISMO (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(68,'SUS25','HIPERTIROIDISMO (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(69,'SUS26','SÍNDROME METABÓLICO Y DISLIPIDEMIAS (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(70,'SUS38','ENFERMEDAD DE CHAGAS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(71,'SUS39','FASCIOLASIS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(72,'SUS42','COQUELUCHE',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(73,'SUS43','ERISIPELA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(74,'SUS44','FIEBRE TIFOIDEA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(75,'SUS45','CÓLERA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(76,'SUS48','MALARIA (MANEJO HOSPITALARIO DE CASOS COMPLICADOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(77,'SUS51','REACCIONES ADVERSAS MODERADAS AL TRATAMIENTO DE TUBERCULOSIS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(78,'SUS52','REACCIONES ADVERSAS MODERADAS AL TRATAMIENTO DE CHAGAS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(79,'SUS61','CEFALEAS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(80,'SUS62','MIGRAÑAS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(81,'SUS118','HIPERTENSIÓN ARTERIAL PRIMARIA (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(82,'SUS119','HIPERTENSIÓN ARTERIAL SECUNDARIA (DIAGNÓSTICO Y TRATAMIENTO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(83,'SUS126','ENFERMEDAD CARDIOVASCULAR ATEROESCLERÓTICA (DIAGNÓSTICO Y TRATAMIENTO AMBULATORIO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(84,'SUS127','INSUFICIENCIA CARDIACA COMPENSADA (DIAGNÓSTICO Y TRATAMIENTO AMBULATORIO INICIAL EN CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(85,'SUS128','FLEBITIS Y TROMBOFLEBITIS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(86,'SUS130','FIEBRE REUMÁTICA SIN CARDITIS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(87,'SUS147','ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(88,'SUS155','CÓLICO BILIAR SIMPLE',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(89,'SUS166','SÍNDROME ULCEROSO PÉPTICO',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(90,'SUS170','TIÑA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(91,'SUS171','ÚLCERAS DE DECÚBITO',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(92,'SUS172','ANGIOEDEMA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(93,'SUS175','ARTRITIS (DIAGNÓSTICO Y TRATAMIENTO INICIAL DE CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(94,'SUS176','ARTRITIS (SEGUIMIENTO Y TRATAMIENTO DE PACIENTES CRÓNICOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(95,'SUS181','ARTROSIS (DIAGNÓSTICO Y TRATAMIENTO INICIAL DE CASOS NUEVOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(96,'SUS185','ATAQUE AGUDO DE GOTA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(97,'SUS193','SÍNDROME NEFRÓTICO',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(98,'SUS194','INFECCIÓN URINARIA ALTA',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(99,'SUS195','INFECCIÓN URINARIA RECURRENTE',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(100,'SUS276','HEMOPTISIS',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(101,'SUS293','INTOXICACIONES',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(102,'SUS301','BRONQUITIS AGUDA (ADULTOS)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(103,'SUS146','ASMA (TRATAMIENTO AMBULATORIO)',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(104,'T17576001','Consulta de seguimiento de enfermedades no transmisibles o crónicas',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(105,'P07636010','Prevención de la desnutrición en la persona adulta mayor con complemento nutricional',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(106,'P07637003','Prevención de la desnutrición en la persona con TB sensible con complemento nutricional',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(107,'P07637004','Prevención de la desnutrición grave en paciente internado por TB con nutrición parenteral',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(108,'T17576017','Consulta integral de medicina interna',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(109,'T17576036','Consulta integral en servicio de urgencias/emergencias',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(110,'T17576040','Consulta repetida o de seguimiento a patologías agudas',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(111,'T17638015','Lavado de oídos en consultorio externo',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(112,'T17638021','Taponamiento nasal anterior en consultorio externo',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(113,'T02662001','Cardioversión farmacológica de emergencia',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(114,'T02662002','Desfibrilación externa automática de emergencia',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(115,'T02662006','Lavado gástrico de intoxicaciones',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(116,'T02662007','RCP de emergencia',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(117,'T02662008','Toracocentesis diagnóstica y terapéutica de emergencia',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(118,'T02663002','Cateterismo vesical en urgencias',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(119,'T02663003','Colocación de sonda nasogástrica en urgencias',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(120,'T02663009','Tratamiento durante la pre referencia y el traslado de pacientes referidos',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(121,'T19602016','Día cama internación en sala común de medicina interna',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(122,'T19606016','Interconsulta de medicina interna',1,'2024-10-24 06:56:56',NULL,1,NULL,3),(123,'T18553001','Drenaje de abscesos o colecciones de pared abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(124,'T18553002','Laparotomía exploradora',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(125,'T18553003','Resección de tumores benignos y malignos de pared abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(126,'T18553007','Laparoscopia exploratoria',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(127,'T18601001','Tratamiento quirúrgico de diástasis de rectos',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(128,'T18601002','Tratamiento quirúrgico de hernia diafragmática por vía abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(129,'T18601003','Tratamiento quirúrgico de hernia incisional o evisceración post operatoria',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(130,'T18601004','Tratamiento quirúrgico de hernia simple o estrangulada sin resección intestinal por vía laparoscópica',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(131,'T18572003','Colecistectomía por vía laparoscópica o convencional con o sin colangiografía operatoria',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(132,'T18572004','Colecistectomía por videolaparoscopía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(133,'T18551001','Apendicectomía y/o drenaje de absceso apendicular por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(134,'T18551010','Oclusión intestinal con resección',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(135,'T18551018','Tratamiento quirúrgico de divertículo de Meckel',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(136,'T18551023','Tratamiento quirúrgico de perforación y/o herida de intestino, única o múltiple',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(137,'T18575003','Drenaje de absceso sacrocoxígeo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(138,'T18575018','Tratamiento quirúrgico de absceso anorrectal simple',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(139,'T18575026','Tratamiento quirúrgico de hemorroides y/o trombectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(140,'T18575033','Tratamiento quirúrgico de quiste sacrocoxígeo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(141,'D10643003','Punción aspirativa con aguja fina de nódulo tiroideo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(142,'T10554001','Drenaje descomprensivo de angina de Ludwing',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(143,'T28547006','Drenaje de absceso o flegmón periamigdaliano',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(144,'T10550003','Extirpación de quiste o mucocele de glándula salival menor de labios',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(145,'T10550012','Tratamiento quirúrgico de absceso parotídeo, sub-maxilar y/o cervical profundo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(146,'T10564007','Tiroidectomía bilateral subtotal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(147,'T10564008','Tiroidectomía bilateral total',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(148,'T10564009','Tiroidectomía total ampliada',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(149,'T10560001','Tratamiento quirúrgico de otros quistes y/o tumores',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(150,'T30561001','Cirugía de tórax abierto traumático y/o fijación de tórax volante, osteosíntesis costales múltiples y de esternón',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(151,'T30561009','Resección de tumores de pared torácica',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(152,'T30561010','Retiro de cuerpo extraño de pared torácica',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(153,'T30548014','Pleurostomía y drenaje pleural',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(154,'T30567001','Cirugía del diafragma con cirugía de vísceras abdominales o torácicas',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(155,'T30567008','Tratamiento quirúrgico de heridas traumáticas del diafragma',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(156,'T30567009','Tratamiento quirúrgico de tumores, malformaciones o quistes del diafragma',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(157,'T29544004','Biopsia quirúrgica ganglionar',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(158,'T29544005','Debridación de piel y úlcera venosa',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(159,'T29544006','Denudación arterial',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(160,'T29544007','Denudación venosa',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(161,'T29544009','Disección y extirpación ganglionar regional: áxilo-supraclavicular',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(162,'T29544010','Disección y extirpación ganglionar regional: cérvico-torácica',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(163,'T29544011','Disección y extirpación ganglionar regional: ileoinguinal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(164,'T29544013','Disección y extirpación ganglionar regional: lumbo-aórticos',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(165,'T29544056','Vaciamiento ganglionar cervical radical, clásico ipsilateral',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(166,'T18553006','Tratamiento quirúrgico de peritonitis difusa aguda',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(167,'T18574001','Drenaje de colecciones intraoperatorias',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(168,'T18574002','Excéresis de tumor y/o quiste peritoneal parietal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(169,'T18574003','Excéresis de tumor y/o quiste retroperitoneal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(170,'T18571003','Esofagomiotomía convencional o laparoscópica en acalasia',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(171,'T18571004','Gastrectomía subtotal con disección ganglionar',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(172,'T18571005','Gastrectomía sub-total con vagotomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(173,'T18571006','Gastrectomía sub-total proximal con esófago-gastro-anastomosis u otra derivación',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(174,'T18571008','Gastrectomía total',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(175,'T18571009','Gastrectomía total con ostomías proximal y distal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(176,'T18571010','Gastrectomía total o sub-total ampliada',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(177,'T18571011','Gastroenteroanastomosis',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(178,'T18571012','Gastropexia u otra cirugía antirreflujo con o sin vagotomía por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(179,'T18571013','Gastrotomía y/o gastrostomía por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(180,'T18571014','Piloromiotomía y piloroplastía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(181,'T18571015','Reconstitución de tránsito en 2° tiempo de operación',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(182,'T18571016','Tratamiento quirúrgico de perforación gástrica aguda',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(183,'T18572001','Cistoyeyunoanastomosis por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(184,'T18572002','Colangioenteroanastomosis intrahepática',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(185,'T18572005','Colecistectomía y coledocostomía (sonda T y colangiografía postoperatoria) con o sin colangiografía operatoria',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(186,'T18572006','Colecistogastroanastomosis o colecistoenteroanastomosis',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(187,'T18572007','Colecistostomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(188,'T18572008','Colédoco o hepatoenteroanastomosis',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(189,'T18572009','Coledocostomía supraduodenal o hepaticostomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(190,'T18572013','Drenaje de colecciones líquidas y abscesos hepáticos por vía laparoscópica o convencional con o sin apoyo ecográfico',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(191,'T18572016','Hepatectomía segmentaria',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(192,'T18572017','Lobectomía hepática',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(193,'T18572018','Tratamiento quirúrgico de herida traumática de hígado y/o vía biliar',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(194,'T18572019','Tratamiento quirúrgico de quiste hidatídico hepático único o múltiple por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(195,'T18572020','Tratamiento quirúrgico de tumores hepáticos y de vesícula biliar',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(196,'T18573001','Pancreatectomía parcial',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(197,'T18573002','Pancreatectomía total con o sin esplenectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(198,'T18573003','Pancreatoduodenectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(199,'T18573004','Secuestrectomía en pancreatitis aguda',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(200,'T18573005','Tratamiento quirúrgico de abscesos, tumores, quistes, pseudoquistes o similares de páncreas',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(201,'T18573006','Tratamiento quirúrgico de heridas y/o traumatismos de páncreas',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(202,'T18573007','Yeyunopancreatostomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(203,'T18570001','Esplenectomía total o parcial por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(204,'T18570002','Operación de etapificación',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(205,'T18570003','Sutura esplénica',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(206,'T18551002','Cierre de colostomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(207,'T18551003','Colectomía parcial o hemicolectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(208,'T18551004','Colectomía total abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(209,'T18551005','Colostomía por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(210,'T18551006','Colostomía, complicaciones tardías',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(211,'T18551007','Entero-enteroanastomosis o enterocoloanastomosis',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(212,'T18551008','Enterotomía o enterostomía (yeyunostomía u otra)',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(213,'T18551009','Ileostomía terminal o en asa',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(214,'T18551010','Oclusión intestinal con resección',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(215,'T18551011','Oclusión intestinal sin resección',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(216,'T18551012','Operación de Hartmann o similar',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(217,'T18551013','Reconstitución de tránsito post operación de Hartmann o similar por vía laparoscópica o convencional',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(218,'T18551014','Resección de intestino y enteroanastomosis',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(219,'T18551015','Resección en descenso de colon con conservación del esfínter',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(220,'T18551016','Resección intestinal con ostomías proximal y distal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(221,'T18551017','Resección intestinal masiva por trombosis mesentérica u otra etiología',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(222,'T18551018','Tratamiento quirúrgico de divertículo de Meckel',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(223,'T18551019','Tratamiento quirúrgico de duplicación intestinal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(224,'T18551020','Tratamiento quirúrgico de invaginación intestinal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(225,'T18551021','Tratamiento quirúrgico de la persistencia del conducto onfalomesentérico',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(226,'T18551022','Tratamiento quirúrgico de mal rotación intestinal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(227,'T18551023','Tratamiento quirúrgico de perforación y/o herida de intestino, única o múltiple',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(228,'T18551024','Tratamiento quirúrgico de quiste de uraco',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(229,'T18551025','Tratamiento quirúrgico de quiste y/o tumor del mesenterio y/o epiplones, único y/o múltiple',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(230,'T18575001','Biopsia quirúrgica rectal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(231,'T18575002','Criptectomía y/o papilectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(232,'T18575003','Drenaje de absceso sacrocoxígeo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(233,'T18575004','Esfinterotomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(234,'T18575005','Extracción de cuerpo extraño rectal, por vía abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(235,'T18575006','Extracción de cuerpo extraño rectal, por vía anal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(236,'T18575007','Panproctocolectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(237,'T18575008','Plastía de estenosis anal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(238,'T18575009','Plastía de estenosis rectal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(239,'T18575011','Reconstitución del tránsito por vía perineal en imperforación anal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(240,'T18575012','Reparación quirúrgica de fisura anal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(241,'T18575013','Resección abdómino-perineal de ano y recto',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(242,'T18575014','Resección abdómino-perineal de ano y recto ampliada',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(243,'T18575015','Resección anterior de recto',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(244,'T18575016','Resección perineal de ano y recto',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(245,'T18575017','Tratamiento quirúrgico de absceso anorrectal complejo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(246,'T18575018','Tratamiento quirúrgico de absceso anorrectal simple',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(247,'T18575019','Tratamiento quirúrgico de condilomas anales',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(248,'T18575020','Tratamiento quirúrgico de desgarros y heridas anorrectales con compromiso del esfínter',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(249,'T18575021','Tratamiento quirúrgico de desgarros y heridas anorrectales sin compromiso del esfínter',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(250,'T18575022','Tratamiento quirúrgico de fecaloma',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(251,'T18575023','Tratamiento quirúrgico de fístula anorrectal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(252,'T18575024','Tratamiento quirúrgico de fístula rectovaginal, rectouretral o uretrovaginal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(253,'T18575025','Tratamiento quirúrgico de fístula rectovesical',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(254,'T18575026','Tratamiento quirúrgico de hemorroides y/o trombectomía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(255,'T18575027','Tratamiento quirúrgico de incontinencia anal, con plastía muscular',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(256,'T18575028','Tratamiento quirúrgico de la incontinencia anal, con cerclaje',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(257,'T18575029','Tratamiento quirúrgico de pólipo rectal por vía abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(258,'T18575030','Tratamiento quirúrgico de pólipo rectal por vía anal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(259,'T18575031','Tratamiento quirúrgico de prolapso rectal por vía abdominal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(260,'T18575032','Tratamiento quirúrgico de prolapso rectal por vía anal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(261,'T18575033','Tratamiento quirúrgico de quiste sacrocoxígeo',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(262,'T11690001','Curación de quemadura, de 5 a 10% de superficie corporal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(263,'T11690002','Curación de quemadura, mayor al 10 % de superficie corporal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(264,'T11690003','Curación de quemadura, menor al 5% de superficie corporal',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(265,'T27515003','Biopsia por laparoscopía',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(266,'T27515004','Biopsia de ganglio centinela',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(267,'T27515005','Puncion aspirativa con aguja fina',1,'2024-10-24 07:17:19',NULL,1,NULL,4),(268,'P20502001','Salpingoclasia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(269,'D20647002','Biopsia de endometrio, vulva, vagina o cuello uterino',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(270,'D20647003','Biopsia fraccionada',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(271,'D20647006','Colposcopía y biopsia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(272,'D20647008','Culdocentesis (Punción de Douglas)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(273,'T20666001','Criocauterización de cuello uterino',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(274,'T20659001','Anexectomía y/o vaciamiento de absceso tubo-ovárico, uni o bilateral',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(275,'T20659002','Aspiración manual endouterina (AMEU)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(276,'T20659008','Conización y/o amputación del cuello uterino, diagnóstica y/o terapéutica con o sin biopsia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(277,'T20659010','Extirpación de la glándula de Bartolino o bartolinocistoneostomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(278,'T20659011','Extracción quirúrgica de DIU incrustado, por vía abdominal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(279,'T20659012','Histerectomía por vía vaginal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(280,'T20659014','Histerectomía subtotal por vía abdominal o laparoscópica',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(281,'T20659015','Histerectomía total con intervención de incontinencia urinaria',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(282,'T20659016','Histerectomía total o ampliada por vía abdominal o laparoscópica',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(283,'T20659018','Interrupción legal del embarazo (ILE) con medicamentos',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(284,'T20659019','Interrupción legal del embarazo (ILE) instrumental',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(285,'T20659020','Laparoscopía ginecológica exploradora',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(286,'T20659021','Legrado uterino instrumental por metrorragia o por restos de aborto (LUI)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(287,'T20659025','Miomectomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(288,'T20659026','Ooforectomía parcial o total, uni o bilateral',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(289,'T20659028','Polipectomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(290,'T20659029','Salpingectomía uni o bilateral',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(291,'T20659031','Tratamiento de aborto retenido',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(292,'T20659032','Tratamiento quirúrgico de absceso y/o hematoma de mama',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(293,'T20659033','Tratamiento quirúrgico de desgarro cervical',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(294,'T20659034','Tratamiento quirúrgico de embarazo ectópico',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(295,'T20659035','Tratamiento quirúrgico de incompetencia cervical',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(296,'T20659038','Tratamiento quirúrgico de prolapso anterior y/o posterior con o sin incontinencia urinaria por vía vaginal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(297,'T20659039','Tratamiento quirúrgico de prolapso anterior y/o posterior con reparación, incontinencia urinaria por vía extravaginal o combinada',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(298,'T20659040','Tratamiento quirúrgico de quiste, desgarro y/o tabique vaginal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(299,'T20659042','Tratamiento quirúrgico de tumor benigno de mama, quiste mamario y/o biopsia quirúrgica extemporánea',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(300,'T20659043','Vaciamiento y drenaje de bartolinitis',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(301,'T24508001','Atención del parto distócico vaginal y del recién nacido',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(302,'T24508002','Atención del parto normal y del recién nacido',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(303,'T24508003','Código Rojo Equipo de Respuesta Inmediata',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(304,'T24508005','Compresión uterina en hemorragia obstétrica',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(305,'T24508006','Monitoreo fetal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(306,'T24508007','Prevención del distress respiratorio del recién nacido (maduración pulmonar)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(307,'T24508008','Revisión de la cavidad uterina y conducto del parto',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(308,'T24517001','Atención del parto mediante cesárea con histerectomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(309,'T24517002','Atención del parto mediante cesárea con o sin salpingoclasia o salpingectomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(310,'D20647005','Biopsia guiada por mamografía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(311,'D20647011','Biopsia Core',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(312,'T20666003','Punción evacuadora de quistes mamarios',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(313,'T20666005','Taponamiento vaginal en tumores cervicouterinos',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(314,'T20659013','Histerectomía radical con disección pelviana completa de territorios ganglionares, incluye ganglios lumboaórticos',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(315,'T20659022','Mastectomía parcial (cuadrantectomía o similar) o total sin vaciamiento ganglionar',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(316,'T20659023','Mastectomía radical o tumorectomía con vaciamiento ganglionar',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(317,'T20659024','Mastectomía total con vaciamiento ganglionar',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(318,'T20659027','Plastía uterina',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(319,'P07504001','Administración de inyectable trimestral (depoprovera)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(320,'P07504002','Control de DIU',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(321,'P07504003','Inserción de DIU',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(322,'P07504004','Inserción de implante subdérmico anticonceptivo',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(323,'P07504005','Orientación en método de días fijos',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(324,'P07504006','Orientación en método de lactancia amenorrea',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(325,'P07504007','Orientación en método del ritmo',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(326,'P07504008','Provisión de anticonceptivo de emergencia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(327,'P07504009','Provisión de anticonceptivos orales',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(328,'P07504010','Provisión de método de barrera (condón femenino)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(329,'P07504011','Provisión de método de barrera (condón masculino)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(330,'P07504012','Retiro de DIU',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(331,'P07504013','Retiro de implante subdérmico anticonceptivo',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(332,'P07636011','Toma de muestra para test de HPV',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(333,'P07636012','Toma de papanicolau e IVAA',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(334,'P07636013','Cepillado Endocervical',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(335,'P07637002','Prevención de infecciones oportunistas en PVVs',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(336,'P07637007','Prevención de la transmisión materno infantil (PTMI) de la sífilis congénita.',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(337,'P07637008','Prevención de la transmisión materno infantil (PTMI) del VIH',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(338,'P07637009','Profilaxis de ITS por violencias sexual antes de las 72 horas',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(339,'P07637010','Profilaxis de la transmisión del VIH en el recién nacido expuesto',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(340,'P07637014','Profilaxis post exposición en VIH antes de las 72 horas (obligatorio en accidente laboral y violencia sexual)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(341,'T17576012','Consulta integral de ginecología y obstetricia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(342,'T17576039','Consulta prenatal repetida atendido por médico',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(343,'T17576045','Cuarto control prenatal atendido por médico',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(344,'T17576041','Control prenatal de alto riesgo obstétrico atendido por médico',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(345,'T17576044','Control puerperal atendido por médico',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(346,'T02511001','Atención pre hospitalaria del parto',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(347,'T02663009','Tratamiento durante la pre referencia y el traslado de pacientes referidos',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(348,'T19602011','Día cama internación en sala común de ginecología',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(349,'T20659041','Tratamiento quirúrgico de sinequia y/o estenosis cervical',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(350,'T24508004','Colocación de balón hidrostático de Bacry',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(351,'P07636004','Prevención de anemia en embarazadas',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(352,'P07636006','Prevención de anemia en puérperas',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(353,'P07501001','Día cama en hogar para embarazadas',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(354,'P07625001','Muestreo de aceite vegetal fortificado con vitamina A para consumo humano',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(355,'P07625002','Muestreo de harina de trigo, mezcla de harina y derivados fortificados',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(356,'P07625003','Muestreo de sal fortificada con yodo para consumo humano y animal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(357,'T03507001','Atención conjunta del control del embarazo por partera tradicional y médico académico (Atención intercultural)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(358,'T03507002','Atención conjunta del parto por partera tradicional y médico académico (parto intercultural)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(359,'T03507003','Atención conjunta del recién nacido por partera tradicional y médico académico (Atención intercultural)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(360,'T03507004','Atención del parto natural por partera tradicional en establecimientos de salud',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(361,'T03507005','Atención del recién nacido por partera tradicional',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(362,'T03507006','Atención del sobreparto por partera tradicional',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(363,'T03507007','Captación temprana de embarazo y referencia a establecimiento de salud por partera tradicional',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(364,'T03507008','Control del embarazo por partera tradicional',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(365,'T03507009','Referencia de embarazadas en emergencia obstétrica y perinatal',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(366,'T32660078','Vesiculostomía diagnóstica y/o terapéutica',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(367,'D20647001','Amniocentesis',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(368,'D20647004','Biopsia guiada con arpón de cualquier tejido (Estereotáxica)',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(369,'D20647007','Cordocentesis',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(370,'D20647009','Hidrocromotubación por laparoscopía o laparotomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(371,'D20647010','Histeroscopía diagnóstica',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(372,'T20666002','Histeroscopía terapéutica',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(373,'T20659003','Cirugía citoreductora de endometrio',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(374,'T20659004','Cirugía citoreductora de ovario',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(375,'T20659005','Cirugía etapificadora de endometrio',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(376,'T20659006','Cirugía etapificadora de ovario',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(377,'T20659007','Colpoceliotomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(378,'T20659009','Exanteración pélvica anterior y/o posterior',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(379,'T20659017','Histeropexia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(380,'T20659030','Traquelectomía con o sin linfadenectomía',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(381,'T20659036','Tratamiento quirúrgico de ligamento ancho',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(382,'T20659037','Tratamiento quirúrgico de mama supernumeraria, mama aberrante y/o politelia',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(383,'T20659044','Vulvectomía radical',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(384,'T20659045','Vulvectomía simple',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(385,'T24517003','Atención del parto mediante cesárea con técnica Simil Exit',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(386,'T24512001','Donación de leche humana para el Banco de Leche Materna',1,'2024-10-24 08:18:02',NULL,1,NULL,5),(387,'A06','AMEBIASIS',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(388,'D50','ANEMIA FERROPENICA (ANEMIAS POR DEFICIENCIA DE HIERRO)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(389,'PC20','ANTICONCEPCIÓN DE EMERGENCIA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(390,'M05','ARTRITIS',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(391,'Z380','ATENCIÓN DEL RECIÉN NACIDO',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(392,'N481','BALANOPOSTITIS',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(393,'H010','BLEFARITIS',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(394,'E86','DESHIDRATACIÓN SEVERA (PLAN C DE REHIDRATACIÓN)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(395,'L08','ECTIMA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(396,'J030','FARINGOAMIGDALITIS ESTREPTOCÓCICA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(397,'A010','FIEBRE TIFOIDEA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(398,'N10','INFECCIÓN URINARIA ALTA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(399,'N30','INFECCIÓN URINARIA BAJA (CISTITIS)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(400,'N308','INFECCIÓN URINARIA RECURRENTE',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(401,'J040','LARINGITIS AGUDA (IRA SIN NEUMONÍA)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(402,'J042','LARINGOTRAQUEITIS AGUDA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(403,'J15','NEUMONÍA',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(404,'P07694001','Vacunación con BCG',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(405,'T17576029','Consulta integral de pediatría',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(406,'T17576001','Consulta de seguimiento de enfermedades no trasmisibles o crónicas',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(407,'P07636001','Desparasitación en niños y niñas de 1 a12 años (1ra dosis)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(408,'P07636002','Desparasitación en niños y niñas de 1 a12 años (2da dosis)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(409,'P07636005','Prevención de anemia en niños escolares y adolescentes',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(410,'P07637005','Prevención de la transición de VIH por lactancia materna',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(411,'P07637009','Profilaxis de la transmisión del VIH en el recién nacido expuesto',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(412,'T17638009','Curación en consultorio externo',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(413,'T17638015','Lavado de oídos en consultorio externo',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(414,'T17638019','Retiro de puntos en consultorio externo',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(415,'T17638020','Sutura en consultorio externo',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(416,'T17638021','Taponamiento nasal anterior en consultorio externo',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(417,'T02511006','Colocación de sonda nasogástrica durante la atención pre hospitalaria',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(418,'T02511007','Curaciones durante la atención pre hospitalaria',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(419,'T02511008','Sutura en atención pre hospitalaria',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(420,'T02662004','Intubación endotraqueal de emergencia (neonatos)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(421,'T02662005','Intubación endotraqueal de emergencia (no neonatos)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(422,'T02662006','Lavado gástrico de intoxicaciones',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(423,'T02662007','RCP de emergencia',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(424,'T02663003','Colocación de sonda nasogástrica en urgencias',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(425,'T02663004','Inmovilización de fracturas expuestas o cerradas (tratamiento pre referencia)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(426,'T02663005','Lavado ocular en urgencias',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(427,'T02663006','Sutura en urgencias',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(428,'T02663008','Traslado de pacientes en casos de urgencias',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(429,'T02663009','Tratamiento durante la pre referencia y el traslado de pacientes referidos',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(430,'T19602028','Día cama internación en sala común de pediatría',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(431,'T19655001','Alimentación por sonda orogástrica de neonatos internados',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(432,'T19655003','Aspiración de secreciones en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(433,'T19655004','Aspirado faríngeo para diagnóstico de tuberculosis en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(434,'T19655005','Aspirado gástrico para diagnóstico de tuberculosis en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(435,'T19655009','Colocación de sonda nasogástrica en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(436,'T19655014','Curación en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(437,'T19655018','Fototerapia en neonato internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(438,'T19655019','Hisopado faríngeo en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(439,'T19655020','Hisopado nasal en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(440,'T19655021','Intubación endotraqueal en sala de internación (neonatos)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(441,'T19655022','Intubación endotraqueal en sala de internación (no neonatos)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(442,'T19655024','Lavado gástrico en paciente internado (neonato)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(443,'T19655025','Lavado gástrico en paciente internado (no neonato)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(444,'T19655026','Lavado ocular en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(445,'T19655028','Nebulización en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(446,'T19655034','Protolisis (aplicación de enemas) en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(447,'T19655035','Reanimación cardiopulmonar en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(448,'T19655036','Reanimación neonatal',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(449,'T19655037','Retiro de puntos en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(450,'T19655038','Sutura en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(451,'T19655039','Taponamiento nasal anterior en paciente internado',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(452,'T19655043','Tratamiento por vía oral en neonatos',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(453,'T19606029','Interconsulta de pediatría',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(454,'T24508002','Atención del parto normal y del recién nacido',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(455,'','Prevención de anemia en embarazadas',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(456,'','Prevención de anemia en puérperas',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(457,'','Prevención de deficiencia de vitamina A en niños (primera dosis)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(458,'','Prevención de deficiencia de vitamina A en niños (segunda dosis)',1,'2024-10-24 08:39:11',NULL,1,NULL,6),(459,'T31514001','Biopsia ósea por punción',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(460,'T31514002','Biopsia ósea quirúrgica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(461,'T31514003','Biopsia sinovial o muscular por punción',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(462,'T31514004','Biopsia sinovial o muscular quirúrgica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(463,'T31514005','Biopsia vertebral por punción',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(464,'T31674001','Reducción incruenta de fracturas mayores (columna, pelvis, supracondílea, codo, epífisis femorales)',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(465,'T31674002','Reducción incruenta de fracturas medianas (diáfisis humeral, radial, cubital, diáfisis femoral, tibial, peroneal, clavicular, plat',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(466,'T31674003','Reducción incruenta de fracturas menores',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(467,'T31686001','Reducción incruenta de luxaciones de articulaciones mayores (columna, cadera, pelvis)',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(468,'T31686002','Reducción incruenta de luxaciones de articulaciones medianas (hombro, codo, rodilla, tobillo, muñeca, tarso y esternoclavic',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(469,'T31686003','Reducción incruenta de luxaciones de articulaciones menores',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(470,'T31686004','Tratamiento de esguinces',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(471,'T31692001','Tratamiento funcional de extremidad inferior con técnica de sarmiento y similares',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(472,'T31692002','Tratamiento funcional de extremidad superior con técnica de sarmiento y similares',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(473,'T31693001','Tratamiento ortopédico completo de luxación congénita de cadera, (uni o bilateral)',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(474,'T31693002','Tratamiento ortopédico completo de pie bot, uni o bilateral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(475,'T31668001','Regularización de muñón de amputación',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(476,'T31668002','Tracción halocraneana o estribo-craneana',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(477,'T31668003','Tracción halocraneo-femoral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(478,'T31668004','Tracción transesquelética o de partes blandas en adultos o en niños',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(479,'T31668005','Tratamiento quirúrgico de exostosis u osteocondroma',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(480,'T31668006','Tratamiento quirúrgico de osteocondrosis o epifisitis',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(481,'T31668007','Tratamiento quirúrgico de quistes sinoviales de vainas flexoras, bursas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(482,'T31505001','Artrodesis de codo o muñeca',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(483,'T31505002','Artrodesis de hombro, cadera, rodilla, tobillo o sacroiliaca',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(484,'T31505003','Artrodesis de mano o pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(485,'T31687001','Tratamiento completo de fracturas expuestas de brazo, antebrazo, muslo y pierna',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(486,'T31687002','Tratamiento completo de fracturas expuestas de mano o pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(487,'T31688001','Artrotomía de codo, muñeca, tobillo o temporomandibular',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(488,'T31688002','Tratamiento quirúrgico de pseudoartrosis infectada de huesos largos con o sin dispositivo de osteoclisis, con o sin osteosíntesis o aparato de yeso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(489,'T31689001','Drenaje quirúrgico de osteomielitis aguda hematógena con o sin dispositivos de osteoclisis',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(490,'T31689002','Legrado óseo de osteítis con o sin secuestrectomía',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(491,'T31689003','Legrado óseo de osteomielitis crónica huesos largos, legrado óseo con o sin osteosíntesis o aparato de yeso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(492,'T31678001','Sinovectomías quirúrgicas de codo o muñeca o metacarpofalángicas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(493,'T31678002','Sinovectomías quirúrgicas de rodilla o cadera u hombro',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(494,'T31534001','Amputación quirúrgica interescápulo-torácica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(495,'T31534002','Desarticulación escápulo-humeral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(496,'T31534003','Fijación de escápula',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(497,'T31534004','Osteosíntesis de fractura de clavícula',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(498,'T31534005','Osteosíntesis de fractura de escápula',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(499,'T31534006','Reducción o plastía cápsuloligamentosa y osteosíntesis de luxación acromio-clavicular o esterno-clavicular',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(500,'T31534007','Reducción y osteosíntesis luxofractura de hombro',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(501,'T31534008','Transposiciones musculares',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(502,'T31534009','Tratamiento quirúrgico de fractura de cuello humeral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(503,'T31534010','Tratamiento quirúrgico de luxación recidivante de hombro',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(504,'T31534011','Tratamiento quirúrgico de luxación traumática de hombro, reducción cruenta',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(505,'T31534012','Tratamiento quirúrgico de ruptura del manguito de rotadores con o sin acromiectomía',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(506,'T31530001','Amputación quirúrgica de brazo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(507,'T31530002','Osteosíntesis de pseudoartrosis de húmero, con o sin yeso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(508,'T31530003','Osteosíntesis diafisiaria de húmero',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(509,'T31530004','Osteosíntesis supra o intercondilea',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(510,'T31530005','Osteotomía de húmero',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(511,'T31530006','Tracción esquelética de fractura supracondilea en niño, con o sin osteosíntesis y aparato de yeso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(512,'T31532001','Artroplastía con fascia codo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(513,'T31532002','Artroplastía de cúpula radial',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(514,'T31532003','Osteosíntesis epitróclea-epicóndilo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(515,'T31532004','Osteosíntesis olécranon u osteosíntesis de cúpula radial',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(516,'T31532005','Reducción cruenta de luxación de codo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(517,'T31532006','Reducción cruenta de luxofractura de codo, con o sin resección de cúpula radial',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(518,'T31532008','Traslocación de nervio cubital',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(519,'T31532009','Tratamiento quirúrgico de epicondilitis',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(520,'T31529001','Amputación quirúrgica de antebrazo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(521,'T31529002','Extirpación de metáfisis distal del cúbito y artrodesis radiocubital inferior',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(522,'T31529003','Operación de salvataje radio-procúbito',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(523,'T31529004','Osteosíntesis de fractura cerrada de cúbito y/o radio',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(524,'T31529005','Osteotomía de radio y/o cúbito, con o sin osteosíntesis, con o sin yeso o tratamiento quirúrgico de enfermedad de Kienbock',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(525,'T31529006','Pseudoartrosis de cúbito y/o radio con o sin osteosíntesis con o sin yeso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(526,'T31529007','Reducción y osteosíntesis de luxofracturas del codo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(527,'T31529008','Trasplantes músculo-tendinosos de antebrazo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(528,'T31529009','Tratamiento quirúrgico de sinostosis radio-cubital, con o sin injerto',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(529,'T31536001','Neurolisis de contractura isquémica de Volkmann',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(530,'T31536002','Osteosíntesis del radio',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(531,'T31536003','Reducción y osteosíntesis semicruenta o cruenta de luxación semilunar o escafoidea',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(532,'T31536004','Resección de estiloides cubital y/o radial',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(533,'T31536005','Tratamiento quirúrgico de fractura o pseudoartrosis de escafoides',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(534,'T31536006','Tratamiento quirúrgico de luxación radiocarpiana',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(535,'T31536007','Tratamiento quirúrgico de tendovaginosis de Quervain',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(536,'T31535001','Amputación quirúrgica de dedos',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(537,'T31535002','Amputación quirúrgica de la mano o del pulgar',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(538,'T31535003','Amputación quirúrgica de pulpejos',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(539,'T31535004','Aseo quirúrgico completo con o sin osteosíntesis, con o sin injertos de mutilación grave de mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(540,'T31535005','Microcirugía de sutura de nervios digitales',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(541,'T31535006','Osteosíntesis metacarpianas o de falanges',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(542,'T31535007','Pulgarización de dedo índice o anular',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(543,'T31535009','Reparación de flexores de la mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(544,'T31535010','Reparación del nervio digital con injerto interfascicular',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(545,'T31535011','Tenorrafia de extensores de mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(546,'T31535012','Tenorrafia o injertos de flexores de mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(547,'T31535013','Transposiciones tendinosas flexoras o extensoras de mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(548,'T31535014','Traslocaciones tendinosas, plastías capsulares, tenotomías o inmovilización postoperatoria de mano reumática en ráfaga',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(549,'T31535015','Tratamiento quirúrgico de contractura Dupuytren',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(550,'T31535016','Tratamiento quirúrgico de contusión-compresión grave de la mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(551,'T31535017','Tratamiento quirúrgico de dedos en gatillo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(552,'T31535018','Tratamiento quirúrgico de flegmón de la mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(553,'T31535019','Tratamiento quirúrgico de luxofractura metacarpofalángica o interfalángica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(554,'T31535020','Tratamiento quirúrgico de panadizo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(555,'T31535021','Tratamiento quirúrgico de rupturas cerradas cápsulo-ligamentosa o tendinosas de mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(556,'T31535022','Tratamiento quirúrgico de tenosinovitis séptica de mano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(557,'T31538001','Osteosíntesis en fractura de arco anterior de pelvis y disyunciones pubianas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(558,'T31538002','Osteosíntesis quirúrgica de fractura de pelvis',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(559,'T31538003','Osteotomía pelviana',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(560,'T31538004','Triple osteotomía de pelvis',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(561,'T31531003','Implantación de endoprótesis parcial de cadera, con o sin cementación',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(562,'T31531004','Implantación de endoprótesis total de cadera',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(563,'T31531005','Operación de salvataje de cadera, columna o similares',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(564,'T31531006','Osteosíntesis de fractura de cuello de fémur',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(565,'T31531007','Osteotomías femorales',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(566,'T31531008','Reducción cruenta de luxación traumática de cadera',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(567,'T31531009','Reducción cruenta en luxación congénita',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(568,'T31531010','Reducción cruenta y acetabuloplastía femoral, con o sin osteotomía femoral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(569,'T31531011','Reducción cruenta y osteotomía femoral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(570,'T31531012','Resección de epífisis femoral de fractura de cuello de fémur',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(571,'T31531013','Tenotomía de aductores, con o sin botas, con yugo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(572,'T31531014','Tratamiento quirúrgico de epifisiolisis lenta o aguda',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(573,'T31531015','Tratamiento quirúrgico de luxofractura acetabular',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(574,'T31531016','Trocanteroplastías',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(575,'T31537001','Amputación quirúrgica de muslo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(576,'T31537002','Epifisiodesis de fémur y/o tibia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(577,'T31537003','Osteosíntesis diafisiaria o metafisiaria de fémur',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(578,'T31537004','Osteotomía correctora de muslo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(579,'T31537005','Osteotomía de alargamiento o acortamiento con osteosíntesis inmediata o distracción instrumental progresiva de muslo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(580,'T31537006','Osteotomía en rosario con enclavijamiento con clavo telescópico',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(581,'T31537007','Tratamiento quirúrgico de pseudoartrosis de muslo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(582,'T31537008','Tratamiento quirúrgico de ruptura y/o hernia muscular de muslo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(583,'T31541001','Artrotomía por cuerpos libres, osteocondritis de rodilla',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(584,'T31541002','Desarticulación de rodilla',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(585,'T31541004','Meniscectomía quirúrgica, interna y/o externa',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(586,'T31541005','Meniscectomía u otras intervenciones por vía artroscópica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(587,'T31541006','Osteosíntesis o patelectomía parcial o total de fractura de rótula',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(588,'T31541007','Realineamiento de disfunción patelo-femoral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(589,'T31541008','Reconstrucción capsuloligamentosa de inestabilidad crónica de rodilla',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(590,'T31541009','Reconstrucción del aparato extensor de la rodilla',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(591,'T31541010','Reducción y osteosíntesis de fracturas condíleas o de platillos tibiales',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(592,'T31541011','Reparación quirúrgica de ligamentos colaterales y/o cruzados de rodilla',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(593,'T31541012','Traslocaciones músculo-tendinosas en rodilla paralítica o espástica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(594,'T31541013','Tratamiento quirúrgico de luxación o rotura de ligamentos y cápsulo-ligamentoso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(595,'T31541014','Tratamiento quirúrgico de quiste poplíteo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(596,'T31540001','Amputación quirúrgica de pierna',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(597,'T31540002','Fasciotomía por síndrome compartimental',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(598,'T31540003','Osteosíntesis tibio-peroné',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(599,'T31540004','Osteotomía correctora de ejes de pierna',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(600,'T31540005','Osteotomía de alargamiento o acortamiento con osteosíntesis inmediata o distracción instrumental progresiva de pierna',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(601,'T31540006','Osteotomía del peroné',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(602,'T31540007','Peroné protibia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(603,'T31540008','Pseudoartrosis con o sin osteosíntesis de pierna',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(604,'T31540009','Tratamiento quirúrgico completo de colgajo cruzado de pierna',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(605,'T31542002','Extirpación de huesos supernumerarios',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(606,'T31542003','Implantación de endoprótesis total de tobillo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(607,'T31542004','Osteoplastia tibio-calcánea',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(608,'T31542005','Osteosíntesis de fractura de astrágalo y/o calcáneo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(609,'T31542006','Osteosíntesis y reparación cápsulo-ligamentosa de luxofractura de tobillo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(610,'T31542007','Reducción cruenta y osteosíntesis de luxación tibio-astragalina-calcánea',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(611,'T31542008','Tenorrafia de extensores o tenotomía de alargamiento de tendón de Aquiles',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(612,'T31542009','Tenorrafia de ruptura tibial anterior u otros',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(613,'T31542010','Tenorrafia primaria y/o transposiciones tendinosas de ruptura de tendón de Aquiles o tibial posterior',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(614,'T31542011','Traslocación tendinosa de tobillo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(615,'T31542012','Tratamiento quirúrgico de esguince grave de tobillo, cápsulo-ligamentoso',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(616,'T31539001','Amputación de ortejos del pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(617,'T31539002','Amputación quirúrgica transmetatarsiana',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(618,'T31539003','Extirpación de sesamoideos del pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(619,'T31539004','Fasciotomía plantar',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(620,'T31539005','Reducción cruenta de luxaciones, luxofracturas y fracturas del pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(621,'T31539006','Tenorrafia de extensores del pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(622,'T31539007','Trasplantes tendinosos del pie',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(623,'T31539008','Tratamiento quirúrgico completo de hallux valgus o rigidus',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(624,'T31539009','Tratamiento quirúrgico completo de mal perforante plantar',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(625,'T31539010','Tratamiento quirúrgico completo de neuroma de Morton',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(626,'T31539011','Tratamiento quirúrgico completo de ortejos en garra',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(627,'T31539012','Tratamiento quirúrgico completo de pie bot u otras malformaciones congénitas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(628,'T31539013','Tratamiento quirúrgico completo de pie cavo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(629,'T31539014','Tratamiento quirúrgico completo de pie plano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(630,'T31539015','Tratamiento quirúrgico completo de pie reumatoideo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(631,'T31539016','Tratamiento quirúrgico de astrágalo vertical',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(632,'T31539017','Tratamiento quirúrgico de espolón calcáneo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(633,'T31539018','Tratamiento quirúrgico de exostosis del 5° metatarsiano',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(634,'T31691001','Legrado óseo de lesiones quísticas intraósea, con o sin relleno de injertos',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(635,'T31691002','Legrado tumoral de metástasis ósea con o sin fractura patológica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(636,'T31691004','Resección en bloque de tumor óseo con o sin osteosíntesis y/o aparato de inmovilización postoperatorio',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(637,'T31691005','Resección en bloque de tumores óseos, epifisiaria con artrodesis o diafisiaria',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(638,'T31691006','Tratamiento quirúrgico de lesiones quísticas con fractura patológica',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(639,'T31691007','Tratamiento quirúrgico de tumores o quistes o lesiones pseudoquísticas o musculares y/o tendinosas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(640,'T31677001','Retiro de endoprótesis u osteosíntesis internas articulares o de columna vertebral',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(641,'T31677002','Retiro de placas rectas o anguladas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(642,'T31677003','Retiro de tornillos, clavos, agujas de osteosíntesis o similares',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(643,'T31605001','Autotrasplante óseo microquirúrgico',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(644,'T31605002','Injerto esponjoso metafisiario',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(645,'T31605003','Injertos esponjosos o córtico-esponjosos de cresta iliaca',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(646,'D31651003','ARTROCENTESIS',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(647,'T17576034','Consulta integral de traumatología y ortopedia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(648,'T17638010','Debridamiento de lesiones infectadas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(649,'T17638014','Inyectables en consultorio externo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(650,'T17638017','Onicectomía (excéresis de uña encarnada) en consultorio externo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(651,'T17638019','Retiro de puntos en consultorio externo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(652,'T17638020','Sutura en consultorio externo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(653,'T02511007','Curaciones durante la atención prehospitalaria',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(654,'T02511009','Tratamiento prehospitalario de fracturas expuestas o cerradas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(655,'T02511010','Tratamiento prehospitalario de luxaciones',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(656,'T19602033','Día cama internación en sala común de traumatología y ortopedia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(657,'T19655014','Curación en paciente internado',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(658,'T19655015','Debridamiento de lesiones infectadas (limpieza quirúrgica) en paciente internado',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(659,'T19655037','Retiro de puntos en paciente internado',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(660,'T19655038','Sutura en paciente internado',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(661,'T19606001','Interconsulta de traumatología y ortopedia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(662,'T15653024','Infiltración articular - partes blandas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(663,'T15653027','Infiltración de bursas',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(664,'T15653028','Infiltración de tendones',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(665,'T15653029','Infiltración periférica articular con ácido hialurónico',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(666,'T15653030','Infiltración periférica articular con anestésico local o proloterapia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(667,'T15653031','Infiltración periférica articular con corticoides',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(668,'T15653032','Infiltración periférica de puntos gatillo con anestesia local o proloterapia',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(669,'T31532007','Resección de cúpula radial',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(670,'T31541003','Implantación de endoprótesis total de rodilla',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(671,'T31542001','Desarticulación de tobillo',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(672,'T31531001','Amputación inter-ilio abdominal',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(673,'T31531002','Desarticulación de cadera',1,'2024-10-24 19:02:18',NULL,1,NULL,7),(674,'D09641006','Electrocardiograma',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(675,'D09641008','Electrocardiograma de esfuerzo',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(676,'D09641009','Monitoreo ambulatorio de la presión arterial (MAPA)',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(677,'D09641010','Pericardiocentesis',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(678,'T09661001','Control de marcapaso',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(679,'T09661002','Implante de marcapaso transitorio (transdérmico)',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(680,'T09661003','Implante de marcapaso transitorio endocavitario (percutáneo)',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(681,'T17576002','Consulta integral de cardiología',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(682,'T17576001','Consulta de seguimiento de enfermedades no trasmisibles o crónicas',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(683,'T19602002','Día cama internación en sala común de cardiología',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(684,'T19655006','Cardioversión farmacológica en paciente internado',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(685,'T19655035','Reanimación cardiopulmonar en paciente internado',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(686,'T19606003','Interconsulta de cardiología',1,'2024-10-24 19:07:34',NULL,1,NULL,8),(687,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:11:09',NULL,1,NULL,9),(688,'T17576009','Consulta integral de gastroenterología',1,'2024-10-24 19:16:36',NULL,1,NULL,10),(689,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:16:36',NULL,1,NULL,10),(690,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:18:29',NULL,1,NULL,11),(691,'T21579003','Sesión de hemodiálisis en casos agudos',1,'2024-10-24 19:21:05',NULL,1,NULL,12),(692,'T21579007','Inserción de catéter temporal de hemodiálisis',1,'2024-10-24 19:21:05',NULL,1,NULL,12),(693,'T17576018','Consulta integral de nefrología',1,'2024-10-24 19:21:05',NULL,1,NULL,12),(694,'D32652004','BIOPSIA RENAL PERCUTANEA',1,'2024-10-24 19:21:05',NULL,1,NULL,12),(695,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:21:05',NULL,1,NULL,12),(696,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:23:12',NULL,1,NULL,13),(697,'T23549002','Instalación de derivativas de LCR',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(698,'T23629001','Extirpación de tumor de nervio periférico',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(699,'T23629002','Extirpación de tumor o quiste medular o intrarraquídeo',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(700,'T23629003','Extirpación de tumores de calota',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(701,'T23629004','Resección de tumores, quistes y/o cavernoma de base de cráneo',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(702,'T23629005','Resección de tumores, quistes y/o cavernoma encefálicos y de hipófisis',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(703,'T23629007','Tratamiento quirúrgico de tumor espinal extradural',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(704,'T23626003','Fijación de columna (cervical-dorsal-lumbar)',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(705,'T23626004','Laminectomía descompresiva',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(706,'T23632005','Tratamiento quirúrgico de aneurismas, malformaciones arteriovenosas encefálicas u orbitarias, fístulas durales',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(707,'T23626006','Rizotomía',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(708,'T23626008','Tratamiento quirúrgico de heridas raquimedulares',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(709,'T23626009','Tratamiento quirúrgico de hernia de núcleo pulposo, estenorraquis, aracnoiditis, fibrosis perirradicular cervical, dorsal o lumbar',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(710,'T23631001','Liberación de nervio cubital a nivel del codo',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(711,'T23631002','Liberación quirúrgica de nervio periférico extracraneano',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(712,'T23631004','Neurolisis con técnica microquirúrgica',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(713,'T23631006','Neurolisis o microcompresión percutánea',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(714,'T23631007','Neurotomías',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(715,'T17576021','Consulta integral de neurocirugía',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(716,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:26:29',NULL,1,NULL,14),(717,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:29:44',NULL,1,NULL,15),(718,'T28558002','Extracción de cuerpo extraño en conducto auditivo externo',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(719,'T28558004','Tratamiento quirúrgico de absceso y/o hematomas de oído externo',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(720,'T28559009','Tratamiento quirúrgico de fístula preauricular complicada',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(721,'T28547001','Adenoidectomía',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(722,'T28547002','Amigdalectomía con o sin adenoidectomía, uni o bilateral',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(723,'T28547003','Biopsia buco-faríngea',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(724,'T28547004','Drenaje de absceso o flegmón de piso de boca',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(725,'T28547005','Drenaje de absceso o flegmón de vestíbulo bucal',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(726,'T28547014','Sección y/o resección de frenillos cavidad bucal',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(727,'T28557001','Abertura del seno esfenoidal por cualquier vía de abordaje',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(728,'T28557003','Cauterización de la arteria esfenopalatina, por vía nasal',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(729,'T28557007','Ligadura de arterias etmoidales anteriores',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(730,'T28557008','Reducción con o sin inmovilización de fractura nasal reciente, cerrada o expuesta',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(731,'T28557012','Tratamiento quirúrgico de abscesos y hematoma del tabique nasal',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(732,'T28557016','Tratamiento quirúrgico de pólipo nasal',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(733,'T28557019','Tratamiento quirúrgico de sinequia nasal',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(734,'T28557020','Turbinectomía o cauterización de cornetes',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(735,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:32:10',NULL,1,NULL,16),(736,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:41:47',NULL,1,NULL,17),(737,'P32503001','Vasectomía',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(738,'D32652001','Cistoscopía diagnóstica',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(739,'D32652002','Cistoscopía terapéutica',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(740,'T32660001','Amputación parcial o total del pene',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(741,'T32660003','Biopsia de pene',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(742,'T32660005','Cambio o retiro de catéter de cistostomía, nefrostomía o ureterostomía',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(743,'T32660006','Circuncisión',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(744,'T32660008','Cirugía abierta o laparoscópica de litiasis renal o ureteral por pielotomía o nefrotomía mínima o anatrófica',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(745,'T32660010','Cirugía de traumatismo peneano o curvaturas adquiridas de la albugínea',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(746,'T32660011','Cirugía del epidídimo y cordón espermático, incluye cirugía intravaginal y/o de varicocele',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(747,'T32660013','Cirugía intravaginal de hidrocele, hematocele, quistes de cordón, epidídimo y/o hidatidectomía',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(748,'T32660017','Cistotomía con o sin extracción de cuerpo extraño con o sin instalación de catéter suprapúbico',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(749,'T32660020','Drenaje percutáneo o endoscópico de hidronefrosis',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(750,'T32660021','Drenaje y cistostomía de flegmón urinoso',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(751,'T32660022','Electrocoagulación de pólipo en meato',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(752,'T32660024','Exploración y tratamiento del escroto agudo',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(753,'T32660026','Extirpación de quistes del cordón espermático y/o epidídimo',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(754,'T32660027','Fistulectomía uretral',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(755,'T32660028','Hidatidectomía unilateral con o sin eversión de la túnica vaginal',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(756,'T32660031','Meatotomía en hombre y/o sección de frenillo y/o incisión dorsal',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(757,'T32660032','Meatotomía en mujer',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(758,'T32660033','Meatotomía quirúrgica con o sin resección de pólipo o carúncula',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(759,'T32660035','Nefrectomía por patología benigna o malformación o trasplante',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(760,'T32660039','Orquidectomía',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(761,'T32660040','Orquidectomía ampliada por cáncer testicular',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(762,'T32660041','Orquidopexia',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(763,'T32660042','Pielotomía exploradora y/o terapéutica',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(764,'T32660043','Plastía de epidídimo-deferente',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(765,'T32660044','Plastía de escroto',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(766,'T32660046','Reparación vesical por trauma o daño de cualquier tipo',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(767,'T32660048','Resección transuretral de próstata (RTUP)',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(768,'T32660049','Resección transuretral de tumor vesical (RTUV)',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(769,'T32660056','Tratamiento quirúrgico de adenoma prostático por cualquier vía de abordaje o técnica abierta',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(770,'T32660057','Tratamiento quirúrgico de descenso testículo inguinal con o sin hernioplastía',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(771,'T32660062','Tratamiento quirúrgico para incontinencia urinaria de esfuerzo, por cualquier vía de abordaje, única o combinada, con o sin',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(772,'T32660076','Uretrotomía interna y/o uretrolitotomía, próstata y vesículas seminales',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(773,'T32660077','Varicocele unilateral y/o denervación de cordón espermático',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(774,'T19602034','Día cama internación en sala común de urología',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(775,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:46:10',NULL,1,NULL,18),(776,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:46:53',NULL,1,NULL,19),(777,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:48:03',NULL,1,NULL,20),(778,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:49:57',NULL,1,NULL,21),(779,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:50:48',NULL,1,NULL,22),(780,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:51:54',NULL,1,NULL,23),(781,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:52:45',NULL,1,NULL,24),(782,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:53:23',NULL,1,NULL,25),(783,'T17576011','Consulta integral de geriatría',1,'2024-10-24 19:55:23',NULL,1,NULL,26),(784,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:55:23',NULL,1,NULL,26),(785,'D26649007','Examen de fondo de ojo',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(786,'D26649014','Refracción o medición de lentes',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(787,'D26649016','Tonometria aplánica unilateral',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(788,'T26552001','Extirpación de pterigion y/o pseudopterigion o su recidiva',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(789,'T26552004','Sutura de herida o dehiscencia de la conjuntiva',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(790,'T26521001','Biopsia de globo ocular',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(791,'T26521002','Enucleación o implantación de prótesis ocular',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(792,'T26521003','Evisceración de globo ocular',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(793,'T26521005','Sutura de lesión traumática de globo o musculo ocular',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(794,'T26519002','Extracción de cuerpo extraño en córnea y/o esclera',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(795,'T26519006','Recubrimiento conjuntival',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(796,'T26519010','Tratamiento quirúrgico de glaucoma',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(797,'T26519011','Tratamiento quirúrgico de herida corneal o córnea-escleral o dehiscencia de sutura',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(798,'T26519012','Tratamiento quirúrgico de herida penetrante corneal o córnea-escleral o dehiscencia de sutura',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(799,'T26523001','Iridectomia periférica y/u óptica',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(800,'T26566004','Facoéresis extracapsular con implante de lente intraocular',1,'2024-10-24 19:57:37',NULL,1,NULL,27),(801,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 19:58:10',NULL,1,NULL,28),(802,'L06612011','Dimero-D',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(803,'L06612019','Ferritina CLIA',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(804,'L06612020','Fibrinógeno',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(805,'L06612023','Grupo sanguíneo y factor Rh',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(806,'L06612024','Hemoglobina glicosilada (HbA1C)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(807,'L06612025','Hemoglobina y hematocrito',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(808,'L06612026','Hemograma completo',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(809,'L06612027','Hierro sérico',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(810,'L06612041','Recuento de plaquetas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(811,'L06612042','Recuento de reticulocitos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(812,'L06612045','Tiempo de protrombina (Incluye porcentaje de actividad y el INR)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(813,'L06612048','Tiempo parcial de tromboplastina activada',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(814,'L06612050','Velocidad de eritrosedimentación globular (VES)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(815,'L06608001','Ácido úrico',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(816,'L06608004','Albúmina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(817,'L06608006','Amilasa pancreática',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(818,'L06608010','Bilirrubinas totales y fracciones',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(819,'L06608012','Calcio sérico',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(820,'L06608014','Colesterol total',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(821,'L06608015','Creatina kinasa-CK',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(822,'L06608016','Creatina kinasa-MB',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(823,'L06608017','Creatinina sérica',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(824,'L06608021','Electrolitos en sangre (sodio, potasio, calcio iónico y cloro)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(825,'L06608023','Fosfatasa alcalina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(826,'L06608024','Fósforo en sangre',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(827,'L06608026','Gasometría arterial o venosa + ácido láctico + electrolitos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(828,'L06608027','Glicemia basal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(829,'L06608029','HDL-Colesterol',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(830,'L06608033','LDH deshidrogenasa láctica',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(831,'L06608035','Magnesemia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(832,'L06608037','Nitrógeno uréico/Úrea/NUS',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(833,'L06608043','Perfil lipídico: Colesterol, triglicéridos,HDL-C, LDL-C, VLDL-C',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(834,'L06608047','Proteínas totales',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(835,'L06608048','Prueba de tolerancia a la glucosa (5 mediciones)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(836,'L06608056','Transaminasas GOT y GPT',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(837,'L06608057','Troponina I por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(838,'L06608060','Triglicéridos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(839,'L06613005','BHCG cuantitativa (CLIA)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(840,'L06613012','Estradiol por inmunofluorescencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(841,'L06613016','FSH por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(842,'L06613019','Gonadotrofina coriónica humana (HCG)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(843,'L06613025','Insulina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(844,'L06613026','LH por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(845,'L06613029','Progesterona por quimioluminiscencia (PRG)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(846,'L06613030','Prolactina por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(847,'L06613032','T3 libre',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(848,'L06613034','T3 total por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(849,'L06613035','T4 libre',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(850,'L06613036','T4 libre por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(851,'L06613037','T4 total',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(852,'L06613038','T4 total por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(853,'L06613039','Testosterona',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(854,'L06613043','TSH',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(855,'L06613044','TSH por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(856,'L06615023','Antiestreptolisina O (ASO)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(857,'L06615029','CA 15-3',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(858,'L06615034','CA-125',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(859,'L06615055','ELISA para PSA libre',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(860,'L06615056','ELISA para PSA total',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(861,'L06615059','Factor reumatoideo',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(862,'L06615078','Procalcitonina por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(863,'L06615080','Proteina C reactiva (PCR) cuantitativa',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(864,'L06615085','PSA libre por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(865,'L06615086','PSA total por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(866,'L06615090','Proteina C reactiva (PCR) cualitativa',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(867,'L06609001','Coprocultivo y antibiograma',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(868,'L06609002','Cultivo de biopsias o tejidos blandos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(869,'L06609003','Cultivo de hisopado uretral',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(870,'L06609005','Cultivo de líquido seminal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(871,'L06609006','Cultivo de secreción vaginal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(872,'L06609008','Cultivo para gérmenes comunes y antibiograma',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(873,'L06609018','Estudio de brotes de infecciones asociadas a la atención en salud (IAAS)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(874,'L06609019','Hemocultivo seriado (dos muestras)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(875,'L06609022','Urocultivo, recuento de colonias y antibiograma',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(876,'L06609023','Cultivos de líquidos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(877,'L06609025','Cultivos de secreciones',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(878,'L06609026','Hemocultivo simple y antibiograma',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(879,'L06616004','Examen en fresco',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(880,'L06616005','Examen micológico directo',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(881,'L06616010','Tinción Gram',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(882,'L06618005','ELISA para chlamydia Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(883,'L06618046','Prueba rápida para Helicobacter pilory',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(884,'L06618049','RPR para sífilis-VDRL',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(885,'L06618051','Reacción de Widal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(886,'L06617002','Coproparasitológico seriado',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(887,'L06617003','Coproparasitológico simple',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(888,'L06617010','Prueba de Strout para chagas (micrométodo de concentración para chagas)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(889,'L06617012','Técnica de Graham',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(890,'L06619002','ELISA para chagas Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(891,'L06619008','ELISA para toxoplasmosis Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(892,'L06619010','Hemaglutinación indirecta (HAI) para chagas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(893,'L06620020','ELISA para anti HBC (anticore hepatitis B totales)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(894,'L06620034','ELISA para HBsAg (antígeno de superficie-hepatitis B)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(895,'L06620036','ELISA para hepatitis A Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(896,'L06620062','Prueba rápida Ig G/Ig M anti SARS CoV 2 (COVID-19)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(897,'L06620063','Prueba rápida para antigeno de superficie de Hepatitis B',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(898,'L06620064','Prueba rápida para dengue',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(899,'L06612018','Ferritina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(900,'L06612022','Frotis de sangre periférica para análisis de morfología celular',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(901,'L06612031','Leucograma',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(902,'L06612035','Procalcitonina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(903,'L06612036','Prueba de Coombs directa',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(904,'L06612037','Prueba de Coombs indirecta',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(905,'L06612039','Recuento absoluto de neutrofilos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(906,'L06612040','Recuento de eosinófilos nasales (citograma nasal)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(907,'L6612046','Tiempo de sangría y recalcificación',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(908,'L06608018','Depuración de creatinina (clearence de creatinina)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(909,'L06608025','Gamaglutamil transferasa (GGT)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(910,'L06608028','Glicemia postprandial',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(911,'L06608034','Lipasa sérica',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(912,'L06608055','Tamizaje para rotura prematura de membranas (prueba de cristalización)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(913,'L06615083','Prueba rápida para PSA',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(914,'L06609013','Cultivo para tuberculosis',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(915,'L06609021','Retrocultivo',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(916,'L06609027','Cultivo Para Investigacion De Streptococcus Agalactiae',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(917,'L06609028','Cultivo Para Investigacion De Bacterias Anaerobias',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(918,'L06609029','Cultivo Para Investigacion De Colonizacion Por Bacterias Resistentes A Los Antimicrobianos De Interes Nosocomiales',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(919,'L06609031','Cultivo Para Identificacion Y/O Confirmacion De Especies Bacterianas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(920,'L06609032','Cultivo Para Control De Esterilidad De Medios De Cultivo Y Reactivos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(921,'L06609033','Cultivo De Vigilancia De Estado Portador De Bacterias Multiresistentes',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(922,'L06616001','Baciloscopía de diagnóstico (incluye 2 tomas, tinción y lectura)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(923,'L06616002','Baciloscopía de seguimiento (incluye 1 tomas, tinción y lectura)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(924,'L06617006','Gota gruesa y Frotis sanguíneo + tinción (Malaria)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(925,'L06617009','Prueba de Ritchie o Coproparasitológico por concentración',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(926,'L06617011','Separación de larvas de strongiloides (método de Baerman)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(927,'L06618047','Prueba rápida para Sifilis',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(928,'L06618022','PCR en tiempo real (Gene Xpert) para detección del complejo de Micobacterium y resistencia a rifampicina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(929,'L06620061','Prueba rápida de diagnóstico para detección de antígenos de SARS CoV 2 (antígeno nasal)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(930,'L06620065','PRUEBA RAPIDA PARA HEPATITIS A',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(931,'L06620066','PRUEBA RAPIDA PARA HEPATITIS C',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(932,'L06620067','Prueba rápida para Rotavirus',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(933,'L06620068','Prueba rápida para VIH/ SIDA',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(934,'L06620077','RT PCR en tiempo real para SARS CoV 2 (COVID-19) (PCR)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(935,'L06619009','Elisa para toxoplasmosis Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(936,'L06619017','Prueba rápida para Chagas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(937,'L06621005','Espermograma',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(938,'L06621006','Examen citológico de liquido cefalorraquídeo de LCR',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(939,'L06621011','Moco fecal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(940,'L06621012','PH en heces',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(941,'L06621013','Sangre oculta en heces',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(942,'L06621015','Helicobacter pylori antígeno fecal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(943,'L06622008','Examen general de orina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(944,'L06622010','Morfología de glóbulos rojos en orinas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(945,'L06622012','Proteinuria de 24 horas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(946,'D01588007','Tinción Papanicolau (Citodiagnostico+tinción)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(947,'S14684001','ACTO TRANSFUSIONAL+ PRUEBAS DE COMPATIBILIDAD + TIPIFICACION DE GRUPO SANGUINEO ABO Y FACTOR RH EQUIPO TRANSFUSOR',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(948,'S14513022','TEST DE COOMBS (DIRECTO)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(949,'S14513023','TEST DE COOMBS (INDIRECTO)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(950,'L06612028','Hierro sérico y TIBC',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(951,'L06612046','Tiempo de sangría y recalcificación',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(952,'L06612047','Tiempo de trombina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(953,'L06612049','Transferrina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(954,'L06608003','Adenosinadesaminasa (ADA)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(955,'L06608007','Amoniaco sérico',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(956,'L06608013','Cloruro sérico',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(957,'L06608049','Prueba rápida de glucosa',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(958,'L06615001','AFP por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(959,'L06615002','Alfafetoproteína (AFP)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(960,'L06615011','Anticuerpos anti DNA',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(961,'L06615012','Anticuerpos anticitoplasmaticos (ANCA)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(962,'L06615013','Anticuerpos anticitoplasmáticos (ANCA) LIA',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(963,'L06615014','Anticuerpos anticitrulinados (anti CCP)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(964,'L06615017','Anticuerpos antinucleares ANA (IFI)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(965,'L06615018','Anticuerpos antinucleares ANA HEP-2 (IFI)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(966,'L06615026','B-HCG total por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(967,'L06615030','CA 19-9',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(968,'L06615035','CLIA para anticuerpos antinuclear extraible (ENA)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(969,'L06615036','CLIA para anticuerpos antinucleares (ANA)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(970,'L06615037','CLIA para inmunoglobulina E (Ig E)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(971,'L06615038','CLIA para interleuquina 6',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(972,'L06615047','ELISA para ANA (anticuerpos antinucleares)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(973,'L06615052','ELISA para anticuerpos extraibles - perfil ENA',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(974,'L06615054','ELISA para procalcitonina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(975,'L06615067','Inmunoglobulina A (Ig A) quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(976,'L06615071','Inmunoglobulina G (Ig G) quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(977,'L06615074','Inmunoglobulina M (Ig M) quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(978,'L06609004','Cultivo de lavado broncoalveolar (BAL)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(979,'L06609012','Cultivo para micobacterias (tipificación)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(980,'L06609014','Cultivos automatizados en VITEK',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(981,'L06609015','Determinación de concentración inhibitoria mínima para antibióticos',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(982,'L06609016','Determinación de sensibilidad a colistina (método de elución)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(983,'L06616051','Reacción de Widal',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(984,'L06618006','ELISA para chlamydia Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(985,'L06618007','ELISA para Entamoeba histolytica en heces',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(986,'L06618008','ELISA para Entamoeba histolytica en sangre',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(987,'L06618009','ELISA para helicobacter antígeno',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(988,'L06618010','ELISA para helicobacter Ig A',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(989,'L06618011','ELISA para helicobacter Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(990,'L06618012','ELISA para helicobacter Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(991,'L06618015','ELISA para sífilis',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(992,'L06617001','Amebas en fresco',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(993,'L06619004','ELISA para Giardia lamblia en heces',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(994,'L06619007','ELISA para toxoplasmosis Ig A',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(995,'L06619020','Toxoplasmosis IgG por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(996,'L06619021','Toxoplasmosis IgM por quimioluminiscencia',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(997,'L06620002','Anticuerpos anti HCV (ELISA)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(998,'L06620004','Anticuerpos Ig M anti HAV',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(999,'L06620006','Anticuerpos totales anti HAV (Ig M - Ig G - HAV)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1000,'L06620010','CLIA para anti HBC (anticore hepatitis B totales)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1001,'L06620011','CLIA para anticuerpos \"E\" de hepatitis B (Anti-Hbe)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1002,'L06620012','CLIA para anticuerpos de antígeno de superficie (anti HBS) post vacunación',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1003,'L06620013','CLIA para anticuerpos de hepatitis C',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1004,'L06620017','CLIA para HAV Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1005,'L06620018','CLIA para VIH Ac/Ag',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1006,'L06620021','ELISA para anticuerpos \"E\" de hepatitis B (Anti-Hbe)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1007,'L06620025','ELISA para citomegalovirus Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1008,'L06620026','ELISA para citomegalovirus Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1009,'L06620027','ELISA para dengue Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1010,'L06620028','ELISA para dengue Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1011,'L06620033','ELISA para HBsAg (antígeno \"E\" hepatitis B)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1012,'L06620035','ELISA para hepatitis A Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1013,'L06620037','ELISA para herpes virus 1 y 2 Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1014,'L06620038','ELISA para herpes virus 1 y 2 Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1015,'L06620039','ELISA para rubeola Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1016,'L06620040','ELISA para rubeola Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1017,'L06620041','ELISA para sarampión Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1018,'L06620042','ELISA para SARS CoV2 (COVID-19) Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1019,'L06620043','ELISA para SARS CoV2 (COVID-19) Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1020,'L06620044','ELISA para varicela Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1021,'L06620045','ELISA para varicela Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1022,'L06620046','ELISA para VIH',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1023,'L06620047','ELISA para virus chapare - 2019 Ig G (arenavirus)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1024,'L06620048','ELISA para virus chapare - 2019 Ig M (arenavirus)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1025,'L06620049','ELISA para zika IgG',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1026,'L06620050','ELISA para zika Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1027,'L06620069','Quimioluminiscencia Ig G para citomegalovirus',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1028,'L06620070','Quimioluminiscencia Ig G para herpes virus tipo 1 y 2',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1029,'L06620071','Quimioluminiscencia Ig G para rubéola',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1030,'L06620072','Quimioluminiscencia Ig M para citomegalovirus',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1031,'L06620073','Quimioluminiscencia Ig M para herpes virus tipo 1 y 2',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1032,'L06620074','Quimioluminiscencia Ig M para rubéola',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1033,'L06620075','Quimioluminiscencia para SARS CoV2 (COVID-19) Ig G',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1034,'L06620076','Quimioluminiscencia para SARS CoV2 (COVID-19) Ig M',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1035,'L06620093','Elisa para hepatitis C',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1036,'L06621014','Test de ureasa',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1037,'L06622006','Creatinina en orina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1038,'L06622007','Electrolitos en orina (sodio, potasio y Cloro)',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1039,'L06622009','Microalbumina en orina',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1040,'L06622013','Úrea en orina de 24 Horas',1,'2024-10-24 20:14:43',NULL,1,NULL,29),(1041,'G05594001','Perfilograma nasal',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1042,'G05594002','Radiografía de cráneo (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1043,'G05594003','Radiografía de maxilar inferior (PA y axiolateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1044,'G05594006','Radiografía de partes blandas, laringe lateral, cavum rinofaringeo',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1045,'G05594007','Radiografía de senos paranasales (proyección de Caldwell)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1046,'G05594008','Radiografía de senos paranasales (proyección de Waters)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1047,'G05594013','Radiografías de base de cráneo, proyecciones especiales de Hirtz (arco sigomático), Towne',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1048,'G05595002','Radiografía de articulaciones sacroilíacas',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1049,'G05595003','Radiografía de cadera (Pediátrico)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1050,'G05595004','Radiografía de caderas en bipedestación (Pediátrico)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1051,'G05595005','Radiografía de columna cervical (frontal, lateral y oblicuas)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1052,'G05595006','Radiografía de columna dorsal (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1053,'G05595007','Radiografía de columna lumbar o lumbosacra (frontal, lateral y focalizada en el 5° espacio)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1054,'G05595009','Radiografía de columna total (pediátrico) (frontal o lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1055,'G05595010','Radiografía de pelvis (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1056,'G05595011','Radiografía de pelvis o cadera, proyecciones especiales (rotación interna, abducción, lateral, Lawenstein u otras)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1057,'G05595012','Radiografía de sacro-coxis',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1058,'G05595013','Radiografía pediátrica de columna dorsolumbar (en bipedestación)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1059,'G05595014','Radiografías dinámicas de columna vertebral en extensión y flexión',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1060,'G05595015','Radiografía de cadera (Adulto)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1061,'G05598001','Radiografía de costillas/parrilla costal (AP y oblicua)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1062,'G05598002','Radiografía de esternón (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1063,'G05598004','Radiografía de tórax PA y lateral (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1064,'G05598005','Radiografía de tórax PA y lateral (pediátrica)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1065,'G05598006','Radiografía de tórax PA (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1066,'G05598007','Radiografía de tórax PA (pediátrica)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1067,'G05598008','Radiografía de tórax proyección complementaria (oblicuas, selectivas u otras)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1068,'G05598009','Radiografía tóraco-abdominal (pediátrica)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1069,'G05594004','Radiografía de oído',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1070,'G05594005','Radiografía de órbitas',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1071,'G05594009','Radiografía de silla turca (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1072,'G055940013','Radiografías de base de cráneo, proyecciones especiales de Hirtz (arco sigomático), Towne',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1073,'G05594015','Radiografía articulación temperó mandibular (boca abierta y cerrada)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1074,'G055950010','Radiografía de pelvis (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1075,'G055950011','Radiografía de pelvis o cadera, proyecciones (rotación Interna, abducción, lateral, lawenstein u otras)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1076,'G055950012','Radiografía de sacro-coxis',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1077,'G055950013','Radiografía pediátrica de columna dorso lumbar (bipedestación)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1078,'G055950014','Radiografía dinámica de columna vertebral en extensión y flexión',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1079,'G05595016','Radiografía de caderas en bipedestación (adulto)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1080,'G05591001','Radiografía de abdomen simple en bipedestación (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1081,'G05591002','Radiografía de abdomen simple en bipedestación (pediátricos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1082,'G05591003','Radiografía de abdomen simple proyección Complementaria',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1083,'G05596001','Radiografía de antebrazo (frontal y lateral) (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1084,'G05596002','Radiografía comparativa de antebrazo (frontal y lateral) (pediátricos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1085,'G05596003','Radiografía de brazo (frontal y lateral) (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1086,'G05596004','Radiografía de brazo (frontal y lateral) (pediátricos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1087,'G05596005','Radiografía de clavícula',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1088,'G05596006','Radiografía de codo (frontal, lateral y oblicuo)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1089,'G05596007','Radiografía de dedos de la mano (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1090,'G05596008','Radiografía de dedos del pie (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1091,'G05596009','Radiografía de fémur (frontal y lateral) (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1092,'G055960010','Radiografía de fémur (frontal y lateral) (pediátrico)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1093,'G055960011','Radiografía de hombro (AP axial y transtorácica)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1094,'G055960012','Radiografía de huesos largos en neonatos',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1095,'G055960013','Radiografía de mano (frontal y oblicua)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1096,'G055960014','Radiografía de muñeca (frontal, lateral y oblicuas)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1097,'G055960015','Radiografía de pie en apoyo (frontal y oblicua)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1098,'G055960016','Radiografía de pierna (frontal y lateral) (adultos)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1099,'G055960017','Radiografía de pierna (frontal y lateral) (pediátrico)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1100,'G055960018','Radiografía de pies comparativa con carga',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1101,'G055960019','Radiografía de rodilla (frontal, lateral y axial)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1102,'G055960020','Radiografía de rodilla en bipedestación 2 proyecciones',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1103,'G055960021','Radiografía de tibiotarsiana (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1104,'G055960022','Radiografía de tobillo en bipedestación (frontal, lateral y oblicua)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1105,'G05596024','Radiografía en Test de Farrel',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1106,'G055960025','Radiografía de escápula en Y',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1107,'G055960026','Radiografía comparativa de hombro (frontal y lateral) (pediátrico)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1108,'G055960027','Radiografía de calcáneo (frontal y lateral)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1109,'G055960028','Radiografía de calcáneo (axial)',1,'2024-10-24 20:21:44',NULL,1,NULL,30),(1110,'G05683001','AngioTAC aorta abdominal',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1111,'G05683003','AngioTAC carótidas - vasos de cuello',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1112,'G05683004','AngioTAC cerebral',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1113,'G05683005','AngioTAC miembros inferiores',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1114,'G05683006','AngioTAC miembros superiores',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1115,'G05683007','AngioTAC pulmonar',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1116,'G05683010','TAC de abdomen',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1117,'G05683011','TAC de abdomen-pelvis',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1118,'G05683013','TAC de columna cervical',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1119,'G05683014','TAC de columna total',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1120,'G05683015','TAC de cráneo y encéfalo',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1121,'G05683016','TAC de cuello, partes blandas',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1122,'G05683019','TAC de mediastino',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1123,'G05683020','TAC de oído-temporal',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1124,'G05683021','TAC de órbitas-maxilofacial',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1125,'G05683022','TAC de tórax',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1126,'G05683023','TAC pielografía',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1127,'G05683024','TAC trifásico de hígado',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1128,'G05683025','TAC de miembros superiores',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1129,'G05683026','TAC de miembros inferiores',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1130,'G05683027','TAC de columna dorsal',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1131,'G05683028','TAC de columna lumbar',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1132,'G05683029','TAC de columna lumbosacra',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1133,'G05683030','TAC de columna sacrocoxígea',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1134,'G05683001','Angio TAC aorta abdominal',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1135,'G05683002','AngioTAC cardiaco',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1136,'G05683017','AngioTAC de Aorta Abdominal',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1137,'G05683018','TAC de hipotálamo-hipófisis',1,'2024-10-24 20:25:20',NULL,1,NULL,31),(1138,'G05582001','Ecografía morfológica fetal',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1139,'G05582002','Ecografía obstétrica del primer trimestre',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1140,'G05582003','Ecografía obstétrica del segundo trimestre',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1141,'G05582004','Ecografía obstétrica del tercer trimestre',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1142,'G05581001','Ecografía abdominal',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1143,'G05581002','Ecografía de apoyo en cirugías, biopsias y otros procedimientos',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1144,'G05581005','Ecografía renal, suprarrenal y de vías urinarias',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1145,'G05581006','Ecografía vesical y prostática',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1146,'G05580001','Ecografía escrotal o testicular',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1147,'G05580002','Ecografía ginecológica',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1148,'G05580003','Ecografía mamaria',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1149,'G05580005','Ecografía partes blandas',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1150,'G05580006','Ecografía tiroides y paratiroides',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1151,'G05580007','Ecografía transfontanelar',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1152,'G05580008','Ecografía transvaginal o transrectal',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1153,'G05583001','Ecografía doppler abdominal',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1154,'G05583002','Ecografía doppler de vasos del cuello',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1155,'G05583003','Ecografía doppler feto placentario',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1156,'G05583005','Ecografía doppler color de tiroides',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1157,'G05583009','Ecografía doppler testicular y escrotal',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1158,'G05581003','Ecografía de rastreo abdominal en neonatos',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1159,'G05581004','Ecografía renal y de vías urinarias en neonatos',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1160,'G05581008','Ecografía de pulmón',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1161,'G05581009','Ecografía torácica',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1162,'G05580009','Ecografía Musculoesqueleticas',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1163,'G05580010','Ecografía Hepato- Bilio- Pancreatica',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1164,'G05583006','Ecografía doppler color de grandes vasos cervicales',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1165,'G05581007','Perfil Biofísico Fetal',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1166,'G05583004','Ecografía vascular arterial o venosa',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1167,'G05583007','Ecografía doppler de miembros inferiores',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1168,'G05583008','Ecografía doppler de miembros superiores',1,'2024-10-24 20:27:48',NULL,1,NULL,32),(1169,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 20:29:45',NULL,1,NULL,33),(1170,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',1,'2024-10-24 20:30:19',NULL,1,NULL,34),(1171,'T15600001','Electroterapia (corrientes de alta, media y baja frecuencia)',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1172,'T15600002','Estimulación temprana',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1173,'T15600003','Evaluación en fisioterapia',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1174,'T15600006','Fisioterapia cardiovascular',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1175,'T15600007','Fisioterapia en la comunidad',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1176,'T15600008','Fisioterapia en terapia intensiva',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1177,'T15600009','Fisioterapia geriátrica',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1178,'T15600010','Fisioterapia musculoesquelética',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1179,'T15600011','Fisioterapia neonatal',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1180,'T15600012','Fisioterapia neurológica',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1181,'T15600013','Fisioterapia obstétrica',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1182,'T15600015','Fisioterapia pre y post operatoria',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1183,'T15600016','Fisioterapia preventiva',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1184,'T15600017','Fisioterapia psicomotora',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1185,'T15600018','Fisioterapia traumatológica',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1186,'T15600019','Fisioterapia/kinesioterapia general',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1187,'T15600020','Fisioterapia/kinesioterapia respiratoria',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1188,'T15600022','Hidrocineciterapia',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1189,'T15600023','Masoterapia',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1190,'T15600031','Termoterapia',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1191,'T15600014','Fisioterapia oncológica',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1192,'T15670001','Atención/evaluación psicomotriz',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1193,'T15675001','Atención/evaluación psicopedagógica',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1194,'T15682001','Terapia ocupacional en integración sensorial',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1195,'T15682002','Terapia ocupacional en integración social',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1196,'T15682003','Terapia ocupacional en intervención comunitaria',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1197,'T15682004','Terapia ocupacional física',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1198,'T15682005','Terapia ocupacional intelectual',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1199,'T15682006','Evaluación en terapia ocupacional',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1200,'T15682007','Promoción de la independencia y de la autonomía',1,'2024-10-24 20:33:27',NULL,1,NULL,36),(1201,'S14513001','Aféresis',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1202,'S14513003','Concentrado de plaquetas (CP) por cada unidad',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1203,'S14513004','Concentrado globular (PG) ≥ 181 ml',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1204,'S14513005','Crioprecipitados (Factor VIII) por cada unidad',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1205,'S14513007','Extracción terapéutica (sangrías) con suero fisiológico de reposición + equipo de venoclisis',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1206,'S14513016','Plasma convaleciente (plasmaféresis + pruebas laboratoriales) por unidad',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1207,'S14513018','Plasma fresco congelado (PFC)',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1208,'S14513024','Estudio de reacciones adversas',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1209,'S14684001','Acto transfusional + pruebas de compatibilidad + tipificación de grupo sanguíneo ABO y factor Rh equipo transfusor',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1210,'S14513008','Filtración de sangre y hemocomponentes',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1211,'S14513009','Glóbulos rojos lavados (GRL) ≥181ml + suero fisiológico',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1212,'S14513010','Glóbulos rojos lavados pediátrico (GRLp) ≤80ml + suero fisiológico',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1213,'S14513014','Paquete globular pediátrico (PGp) ≤80ml',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1214,'S14513015','Paquete globular pediátrico (PGp) 81ml a 180ml',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1215,'S14513021','Sangre total reconstituída',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1216,'S14513022','Test de coombs (directo)',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1217,'S14513023','Test de coombs (indirecto)',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1218,'S14513025','Estudio de reacciones adversas + identificación de cuerpos irregulares',1,'2024-10-24 20:36:51',NULL,1,NULL,37),(1219,'M33623001','Alianzas estratégicas',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1220,'M33623002','Educación en salud',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1221,'M33623003','Participación Social',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1222,'P07500001','Aplicación de cariostático',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1223,'P07500002','Fluoración tópica - barniz B (en consultorio)',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1224,'P07500003','Fluoración tópica - gel A (en consultorio)',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1225,'P07500004','Prevención de caries y otras enfermedades bucodentales',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1226,'P07500005','Sellado de fosas y fisuras',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1227,'T17577005','Consulta odontológica general',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1228,'T17577006','Consulta odontológica pediátrica',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1229,'T25585001','Endodoncia en pieza biradicular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1230,'T25585002','Endodoncia en pieza multiradicular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1231,'T25585003','Endodoncia en pieza uniradicular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1232,'T25585004','Endodoncia sistema rotatorio en pieza biradicular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1233,'T25585005','Endodoncia sistema rotatorio en pieza multiradicular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1234,'T25585006','Endodoncia sistema rotatorio en pieza uniradicular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1235,'T25585007','Pulpotomía',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1236,'T25633001','Ferulización de fractura dentoalveolar simple',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1237,'T25633002','Obturaciones con ionómero',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1238,'T25633003','Obturaciones con resina fotopolimerizable',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1239,'T25633004','Práctica restauradora atraumática (PRAT)',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1240,'T25634001','Gingivectomía',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1241,'T25634002','Profilaxis bucal - Limpieza dentaria',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1242,'T25634003','Tartrectomía',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1243,'T25524001','Cirugía odontológica ambulatoria',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1244,'T25524002','Drenaje de absceso vía dentaria',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1245,'T25524004','Exodoncia de piezas incluidas e impactadas',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1246,'T25524005','Exodoncia de piezas temporarias o permanentes',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1247,'T25633005','Restauración con resina fotopolimerizable y corona de celuloide',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1248,'T25634004','Tratamiento quirúrgico - Colgajo',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1249,'T25524003','Reducción cruenta de luxación temporomandibular',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1250,'T25524006','Curetaje de alveolitis',1,'2024-10-24 20:40:23',NULL,1,NULL,38),(1251,'SUS21','Diabetes mellitus tipo I (Diagnóstico y tratamiento inicial en casos nuevos)',0,'2024-10-24 20:40:23','2024-11-06 15:55:22',1,1,38),(1252,'exapl','ejemplo2',0,'2024-10-25 06:24:02','2024-11-05 22:47:16',1,1,16),(1253,'T45455','EJEMPLO',1,'2024-11-27 09:52:09',NULL,4,NULL,5);
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transferencia`
--

DROP TABLE IF EXISTS `transferencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transferencia` (
  `transferencia_ID` int NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_envio` date DEFAULT NULL,
  `hora_envio` time DEFAULT NULL,
  `motivo_transferencia` text,
  `nombre_contacto_receptor` varchar(65) DEFAULT NULL,
  `medio_comunicacion` varchar(60) DEFAULT NULL,
  `fecha_recepcion` date DEFAULT NULL,
  `hora_recepcion` time DEFAULT NULL,
  `paciente_admitido` tinyint DEFAULT NULL,
  `paciente_paciente_ID` int NOT NULL,
  `establecimiento_salud_referente` smallint NOT NULL,
  `establecimiento_salud_receptor` smallint NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`transferencia_ID`),
  KEY `fk_transferencia_paciente1_idx` (`paciente_paciente_ID`),
  KEY `fk_transferencia_establecimiento_salud1_idx` (`establecimiento_salud_referente`),
  KEY `fk_transferencia_establecimiento_salud2_idx` (`establecimiento_salud_receptor`),
  CONSTRAINT `fk_transferencia_establecimiento_salud1` FOREIGN KEY (`establecimiento_salud_referente`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `fk_transferencia_establecimiento_salud2` FOREIGN KEY (`establecimiento_salud_receptor`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `fk_transferencia_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transferencia`
--

LOCK TABLES `transferencia` WRITE;
/*!40000 ALTER TABLE `transferencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `transferencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamiento` (
  `tratamiento_ID` mediumint NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  `paciente_paciente_ID` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`tratamiento_ID`),
  KEY `fk_tratamiento_paciente1_idx` (`paciente_paciente_ID`),
  CONSTRAINT `fk_tratamiento_paciente1` FOREIGN KEY (`paciente_paciente_ID`) REFERENCES `paciente` (`paciente_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `turno_ID` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `personal_salud_personal_ID` mediumint NOT NULL,
  `establecimiento_salud_idestablecimiento_ID` smallint NOT NULL,
  `especialidad_especialidad_ID` smallint NOT NULL,
  `codificacion_codificacion_turnos_ID` int DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` mediumint NOT NULL,
  `usuario_modificacion` mediumint DEFAULT NULL,
  PRIMARY KEY (`turno_ID`),
  KEY `fk_turno_personal_salud1_idx` (`personal_salud_personal_ID`),
  KEY `fk_turno_establecimiento_salud1_idx` (`establecimiento_salud_idestablecimiento_ID`),
  KEY `fk_turno_especialidad1_idx` (`especialidad_especialidad_ID`),
  KEY `fk_turno_codificacion_turno_idx` (`codificacion_codificacion_turnos_ID`),
  CONSTRAINT `fk_turno_codificacion_turno` FOREIGN KEY (`codificacion_codificacion_turnos_ID`) REFERENCES `codificacion_turnos` (`codificacion_turnos_id`),
  CONSTRAINT `fk_turno_especialidad1` FOREIGN KEY (`especialidad_especialidad_ID`) REFERENCES `especialidad` (`especialidad_ID`),
  CONSTRAINT `fk_turno_establecimiento_salud1` FOREIGN KEY (`establecimiento_salud_idestablecimiento_ID`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`),
  CONSTRAINT `fk_turno_personal_salud1` FOREIGN KEY (`personal_salud_personal_ID`) REFERENCES `personal_salud` (`personal_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (1,'2024-05-11',1,1,8,3,1,'2024-11-11 06:50:11','2024-11-23 14:04:03',1,NULL),(2,'2024-05-13',1,1,8,2,1,'2024-11-11 06:50:11','2024-11-11 06:57:10',1,NULL),(3,'2024-06-11',1,1,8,4,1,'2024-11-11 07:02:56','2024-11-23 14:10:56',1,NULL),(4,'2024-06-13',1,1,8,3,1,'2024-11-11 07:02:56','2024-11-23 14:10:56',1,NULL),(5,'2024-11-06',1,1,8,3,1,'2024-11-11 10:27:42',NULL,1,NULL),(6,'2024-11-09',1,1,8,4,1,'2024-11-11 10:27:42',NULL,1,NULL),(7,'2024-11-11',1,1,8,4,1,'2024-11-11 10:28:24','2024-11-23 14:02:23',1,NULL),(8,'2024-11-13',1,1,8,4,1,'2024-11-11 10:28:24',NULL,1,NULL),(9,'2024-11-16',1,1,8,3,1,'2024-11-23 14:04:52',NULL,2,NULL),(10,'2024-11-16',12,1,8,3,1,'2024-11-23 14:10:34','2024-11-23 14:10:56',2,NULL),(11,'2024-11-18',1,1,8,3,1,'2024-11-23 14:10:56',NULL,2,NULL),(12,'2024-11-12',12,1,8,4,1,'2024-11-23 14:10:56',NULL,2,NULL),(13,'2024-11-10',12,1,8,4,1,'2024-11-23 14:10:56',NULL,2,NULL),(14,'2024-11-13',12,1,8,4,1,'2024-11-27 05:45:35',NULL,2,NULL),(15,'2024-11-27',1,1,8,3,1,'2024-11-27 06:07:41',NULL,2,NULL),(16,'2024-11-26',12,1,8,4,1,'2024-11-27 06:07:41',NULL,2,NULL),(17,'2024-11-29',11,2,8,9,1,'2024-11-27 07:43:17','2024-11-27 07:44:49',2,NULL),(18,'2024-11-20',12,1,8,3,1,'2024-11-27 07:43:52',NULL,2,NULL),(19,'2024-11-08',1,1,8,3,1,'2024-11-27 09:41:53',NULL,4,NULL),(20,'2024-11-14',12,1,8,4,1,'2024-11-27 09:41:53',NULL,4,NULL);
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `rol` varchar(20) NOT NULL,
  `establecimiento_id` smallint DEFAULT NULL,
  `personal_ID` mediumint DEFAULT NULL,
  `usuario_ID` mediumint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`usuario_ID`),
  KEY `fk_usuario_establecimiento` (`establecimiento_id`),
  KEY `fk_personal_id` (`personal_ID`),
  CONSTRAINT `fk_personal_id` FOREIGN KEY (`personal_ID`) REFERENCES `personal_salud` (`personal_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_usuario_establecimiento` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimiento_salud` (`idestablecimiento_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('jlopezt','$2b$10$ypxA3F5qbZSzIA4afXJGLOX4C.eCA2LKRIiStFvzLprIh/wQYeXYS',1,'2024-11-09 02:31:52',NULL,'ADMIN',1,1,1),('acespedeza','$2b$10$pu1RjR5mZgyP8x5NlXkJ0.lvTFB88sZDFfzojmSySbvx/hnE8tRXm',1,'2024-11-15 01:21:49',NULL,'Doctor',1,2,2),('rserranor','$2b$10$ojcD4ts.FzbOJqzIU2Biru3M3JLePlKQIt7bp6JfdbwUN6kWcSMV.',1,'2024-11-15 08:58:03',NULL,'Admin Hospital',1,3,3),('aperezs','$2b$10$E3q29R7rLSpR8e9JPMqR0ODizGAIvgyGv4Lvbj2hEoGusr0XWsV9y',1,'2024-11-16 22:18:43','2024-11-27 09:55:28','Admin Sedes',1,4,4),('jvarelaq','$2b$10$u617J.Vr65dZCLZRqWpYjOyMcaKqZlwk8vpDBMk0xlFg4SD2qQLJC',1,'2024-11-21 11:20:00','2024-11-27 05:34:43','Doctor',2,11,9),('rquirozv','$2b$10$ER0SfgercIKZkm21.3ZI9uNp.L8XRiC/0pcJlsxyDBaHexR.8qC1i',1,'2024-11-21 11:33:45',NULL,'Doctor',1,12,10);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_especialidades_conteo_areas`
--

DROP TABLE IF EXISTS `vista_especialidades_conteo_areas`;
/*!50001 DROP VIEW IF EXISTS `vista_especialidades_conteo_areas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_especialidades_conteo_areas` AS SELECT 
 1 AS `ID`,
 1 AS `Especialidad`,
 1 AS `Hospital ID`,
 1 AS `Emergencia`,
 1 AS `Consulta Externa`,
 1 AS `Internado`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'sedes_referencia_final'
--
/*!50003 DROP PROCEDURE IF EXISTS `obtener_turnos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_turnos`(
    IN p_especialidad_id INT,
    IN p_hospital_id INT
)
BEGIN
    DECLARE total_count INT;

    -- First attempt to get the main query result count
    SET total_count = (
        SELECT COUNT(*)
        FROM personal_salud P
        INNER JOIN area_personal_salud APS ON APS.personal_salud_personal_ID = P.personal_ID
        INNER JOIN turno T ON T.personal_salud_personal_ID = P.personal_ID
        INNER JOIN especialidad E ON E.especialidad_ID = T.especialidad_especialidad_ID
        WHERE APS.area = 'Consulta Externa' AND E.especialidad_ID = p_especialidad_id
    );

    -- If results are found, execute the main query
    IF total_count > 0 THEN
        SELECT IFNULL(CONCAT(P.nombres, ' ', P.primer_apellido, ' ', P.segundo_apellido), 'S/D') AS 'Nombre', 
            IFNULL((
                SELECT GROUP_CONCAT(CONCAT(DAYNAME(TSC.fecha), '-', IFNULL(CONCAT('Disponible de ', TIME_FORMAT(CT.Hora_Inicio, '%H:%i'), ' a ', TIME_FORMAT(CT.Hora_Fin, '%H:%i')), 'S/H')) SEPARATOR ',')
                FROM turno TSC
                LEFT JOIN codificacion_turnos CT ON CT.codificacion_turnos_id = TSC.codificacion_codificacion_turnos_ID
                WHERE TSC.fecha BETWEEN DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) 
                AND DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY) 
                AND TSC.personal_salud_personal_ID = P.personal_ID
            ), 'S/D') AS 'Horario de atencion'
        FROM personal_salud P
        INNER JOIN area_personal_salud APS ON APS.personal_salud_personal_ID = P.personal_ID
        INNER JOIN turno T ON T.personal_salud_personal_ID = P.personal_ID
        INNER JOIN especialidad E ON E.especialidad_ID = T.especialidad_especialidad_ID
        WHERE APS.area = 'Consulta Externa' AND T.establecimiento_salud_idestablecimiento_ID = p_hospital_id AND E.especialidad_ID = p_especialidad_id AND T.fecha BETWEEN
		DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND
		DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY) AND APS.fecha BETWEEN 
		DATE_SUB(CURDATE(), INTERVAL DAY(CURDATE()) - 1 DAY) 
		AND LAST_DAY(CURDATE())
        GROUP BY P.personal_ID;
    ELSE
        -- If no results, return default values
        SELECT 'S/D' AS 'Nombre', 'S/D' AS 'Horario de atencion';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtener_turnos_por_mes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_turnos_por_mes`(
    IN p_mes INT,
    IN p_anio INT,
    IN p_especialidad_id INT,
    IN p_establecimiento_id INT
)
BEGIN
    SELECT
        P.personal_ID AS 'Personal ID',
        CONCAT(P.nombres, ' ', P.primer_apellido, ' ', P.segundo_apellido) AS 'Nombre Completo',
        IFNULL((
            SELECT GROUP_CONCAT(CONCAT(area_personal_salud_ID, ':', area) SEPARATOR ',')
            FROM area_personal_salud
            WHERE personal_salud_personal_ID = P.personal_ID 
            AND MONTH(fecha) = p_mes 
            AND YEAR(fecha) = p_anio
        ), 'S/A') AS Area,
        IFNULL(GROUP_CONCAT(
            CONCAT(DAY(T.fecha), ':', IFNULL(C.Sigla, 'S/I'), ':', T.turno_ID)
            ORDER BY T.fecha
            SEPARATOR ','
        ), 'S/T') AS 'Turnos'
    FROM personal_salud P
    INNER JOIN personal_especialidad_hospital PEH ON PEH.Personal_salud_id = P.personal_ID
    LEFT JOIN turno T ON P.personal_ID = T.personal_salud_personal_ID
                      AND MONTH(T.fecha) = p_mes
                      AND YEAR(T.fecha) = p_anio
                      AND T.especialidad_especialidad_ID = p_especialidad_id
                      AND T.establecimiento_salud_idestablecimiento_ID = p_establecimiento_id
    LEFT JOIN codificacion_turnos C ON C.codificacion_turnos_id = T.codificacion_codificacion_turnos_ID
    WHERE PEH.Especialidad_id = p_especialidad_id
      AND P.establecimiento_salud_idestablecimiento_ID = p_establecimiento_id
    GROUP BY P.personal_ID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vista_especialidades_conteo_areas`
--

/*!50001 DROP VIEW IF EXISTS `vista_especialidades_conteo_areas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_especialidades_conteo_areas` AS select `e1`.`especialidad_ID` AS `ID`,`e1`.`nombre` AS `Especialidad`,`esh`.`establecimiento_salud_idestablecimiento_ID` AS `Hospital ID`,(select count(`aps1`.`area_personal_salud_ID`) from ((`area_personal_salud` `aps1` join `personal_salud` `ps1` on((`ps1`.`personal_ID` = `aps1`.`personal_salud_personal_ID`))) join `personal_especialidad_hospital` `peh1` on((`peh1`.`Personal_salud_id` = `ps1`.`personal_ID`))) where ((`aps1`.`area` = 'Emergencia') and (`peh1`.`Especialidad_id` = `e1`.`especialidad_ID`) and (`peh1`.`Hospital_id` = `esh`.`establecimiento_salud_idestablecimiento_ID`) and (month(`aps1`.`fecha`) = month(curdate())) and (year(`aps1`.`fecha`) = year(curdate())))) AS `Emergencia`,(select count(`aps2`.`area_personal_salud_ID`) from ((`area_personal_salud` `aps2` join `personal_salud` `ps2` on((`ps2`.`personal_ID` = `aps2`.`personal_salud_personal_ID`))) join `personal_especialidad_hospital` `peh2` on((`peh2`.`Personal_salud_id` = `ps2`.`personal_ID`))) where ((`aps2`.`area` = 'Consulta Externa') and (`peh2`.`Especialidad_id` = `e1`.`especialidad_ID`) and (`peh2`.`Hospital_id` = `esh`.`establecimiento_salud_idestablecimiento_ID`) and (month(`aps2`.`fecha`) = month(curdate())) and (year(`aps2`.`fecha`) = year(curdate())))) AS `Consulta Externa`,(select count(`aps3`.`area_personal_salud_ID`) from ((`area_personal_salud` `aps3` join `personal_salud` `ps3` on((`ps3`.`personal_ID` = `aps3`.`personal_salud_personal_ID`))) join `personal_especialidad_hospital` `peh3` on((`peh3`.`Personal_salud_id` = `ps3`.`personal_ID`))) where ((`aps3`.`area` = 'Internado') and (`peh3`.`Especialidad_id` = `e1`.`especialidad_ID`) and (`peh3`.`Hospital_id` = `esh`.`establecimiento_salud_idestablecimiento_ID`) and (month(`aps3`.`fecha`) = month(curdate())) and (year(`aps3`.`fecha`) = year(curdate())))) AS `Internado` from (`especialidad` `e1` join `establecimiento_salud_has_especialidad` `esh` on((`esh`.`especialidad_ID` = `e1`.`especialidad_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27 18:39:38
