CREATE DATABASE  IF NOT EXISTS `Sedes_referencias` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Sedes_referencias`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: basefinal
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `usuario_modificacion` mediumint DEFAULT NULL,
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
  PRIMARY KEY (`codificacion_turnos_id`),
  KEY `especialidad_codificacion_turno_idx` (`especialidad_especialidad_ID`),
  CONSTRAINT `especialidad_codificacion_turno` FOREIGN KEY (`especialidad_especialidad_ID`) REFERENCES `especialidad` (`especialidad_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referencia`
--

DROP TABLE IF EXISTS `referencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referencia` (
  `referencia_ID` int NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_envio` date DEFAULT NULL,
  `motivo_referencia` text,
  `nombre_contacto_receptor` varchar(65) NOT NULL,
  `medio_comunicacion` varchar(60) DEFAULT NULL,
  `fecha_recepcion` date DEFAULT NULL,
  `hora_recepcion` time DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=1253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

DELIMITER $$

CREATE PROCEDURE obtener_turnos_por_mes(
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

END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_turnos(
    IN p_especialidad_id INT
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
        WHERE APS.area = 'Consulta Externa' AND E.especialidad_ID = p_especialidad_id AND APS.fecha BETWEEN
		DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND
		DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY) 
        GROUP BY P.personal_ID;
    ELSE
        -- If no results, return default values
        SELECT 'S/D' AS 'Nombre', 'S/D' AS 'Horario de atencion';
    END IF;

END$$

DELIMITER ;

-- Dump completed on 2024-11-25 13:40:43
