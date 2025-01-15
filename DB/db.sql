DROP DATABASE IF EXISTS db_vehiculos;
CREATE DATABASE db_vehiculos;
USE db_vehiculos;

-- SELECT * FROM `USER`;

-- //////////////////////////////////////////// GRUPO USUARIOS Y AUTH ///////////////////////////////////////
-- TABLE: USER
-- DROP TABLE USER;
CREATE TABLE `USER` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` INT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` INT NULL,
  `deleted_at` DATETIME NULL,
  CONSTRAINT fk_user_created_by FOREIGN KEY (`created_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL,
  CONSTRAINT fk_user_updated_by FOREIGN KEY (`updated_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- DROP TABLE REFRESH_TOKEN;
CREATE TABLE IF NOT EXISTS `REFRESH_TOKEN` (
  `refresh_token_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `token` VARCHAR(255) NOT NULL UNIQUE,
  `expires_at` DATETIME NOT NULL,
  `revoked_at` DATETIME NULL,
  `session_start` DATETIME NOT NULL,
  `refresh_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `USER`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE: ROLE
CREATE TABLE `ROLE` (
  `role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` INT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` INT NULL,
  `deleted_at` DATETIME NULL,
  FOREIGN KEY (`created_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`updated_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE: USER_ROLE
CREATE TABLE `USER_ROLE` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` INT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` INT NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  FOREIGN KEY (`user_id`) REFERENCES `USER`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `ROLE`(`role_id`) ON DELETE RESTRICT,
  FOREIGN KEY (`created_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`updated_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE persona (
  idPersona INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  apellido_paterno VARCHAR(45),
  apellido_materno VARCHAR(45),
  fecha_nacimiento DATE,
  celular VARCHAR(45),
  direccion VARCHAR(100),
  user_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT NULL,
  deleted_at DATETIME NULL,
  FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);


CREATE TABLE guia_turistico (
  idGuia_turistico INT AUTO_INCREMENT PRIMARY KEY,
  numero_licencia_turismo VARCHAR(45),
  idioma_materno JSON,
  idPersona INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT NULL,
  deleted_at DATETIME NULL,
  FOREIGN KEY (idPersona) REFERENCES persona(idPersona) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

CREATE TABLE pasajero (
  idPasajero INT AUTO_INCREMENT PRIMARY KEY,
  foto_pasajero VARCHAR(200),
  idPersona INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT NULL,
  deleted_at DATETIME NULL,
  FOREIGN KEY (idPersona) REFERENCES persona(idPersona) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES user(user_id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by) REFERENCES user(user_id) ON DELETE SET NULL
);

CREATE TABLE conductor (
  idConductor INT AUTO_INCREMENT PRIMARY KEY,
  foto_conductor TEXT,
  celular_contacto VARCHAR(17),
  idPersona INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT NULL,
  deleted_at DATETIME NULL,
  FOREIGN KEY (idPersona) REFERENCES persona(idPersona) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- //////////////////////////////////////////// VEHICULO ///////////////////////////////////////

-- 2. TABLA DE MARCAS
CREATE TABLE marca_vehiculo (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(45) NOT NULL,
    descripcion VARCHAR(100),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 3. TABLA DE TRANSMISIÓN
CREATE TABLE transmision (
    idtransmision INT AUTO_INCREMENT PRIMARY KEY,
    tipo_transmision VARCHAR(45) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 4. TABLA DE CARROCERÍAS
CREATE TABLE carroceria (
    idcarroceria INT AUTO_INCREMENT PRIMARY KEY,
    tipo_carroceria VARCHAR(45) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 5. TABLA DE TIPO DE VEHÍCULO (RELACIONADA A CARROCERÍA)
CREATE TABLE tipo_vehiculo (
    idtipo_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    tipo_vehiculo VARCHAR(45) NOT NULL,
    idcarroceria INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (idcarroceria) REFERENCES carroceria(idcarroceria) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 6. TABLA DE COMBUSTIBLE
CREATE TABLE combustible (
    idcombustible INT AUTO_INCREMENT PRIMARY KEY,
    tipo_combustible VARCHAR(45) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- Crear o actualizar tabla empresas con auditoría
CREATE TABLE IF NOT EXISTS empresas (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    ruc VARCHAR(45) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 7. TABLA DE VEHÍCULO
-- Fotos en un campo JSON [{foto1}, {foto2}, {foto3]
CREATE TABLE vehiculo (
    idvehiculo INT AUTO_INCREMENT PRIMARY KEY,
    capacidad_asientos INT NOT NULL,
    capacidad_maletas INT NOT NULL,
    anio_fabricacion INT NOT NULL,
    num_chasis VARCHAR(45),
    placa VARCHAR(45),
    modelo VARCHAR(45),
    kilometraje_actual VARCHAR(45),
    fecha_compra VARCHAR(45),
    estado VARCHAR(45),
    fecha_registro_vehiculo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fotos_vehiculo JSON,  -- Campo JSON para las fotos
    id_marca INT,
    idtransmision INT,
    idtipo_vehiculo INT,
    idcombustible INT,
    id_empresa INT, -- Nuevo
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_marca) REFERENCES marca_vehiculo(id_marca) ON DELETE SET NULL,
    FOREIGN KEY (idtransmision) REFERENCES transmision(idtransmision) ON DELETE SET NULL,
    FOREIGN KEY (idtipo_vehiculo) REFERENCES tipo_vehiculo(idtipo_vehiculo) ON DELETE SET NULL,
    FOREIGN KEY (idcombustible) REFERENCES combustible(idcombustible) ON DELETE SET NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa) ON DELETE CASCADE, -- Nuevo
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 8. TABLA DE ASIENTOS
CREATE TABLE asientos (
    idAsiento INT AUTO_INCREMENT PRIMARY KEY,
    piso INT NOT NULL DEFAULT 1,
    fila INT NOT NULL,
    columna CHAR(1) NOT NULL,
    tipo_asiento VARCHAR(45),
    estado_asiento VARCHAR(45),
    caracteristica VARCHAR(255),
    idvehiculo INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (idvehiculo) REFERENCES vehiculo(idvehiculo) ON DELETE CASCADE, -- al eliminar un vehículo, se borran sus asientos
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL 
);


-- Crear o actualizar tabla ciudades con auditoría
CREATE TABLE IF NOT EXISTS ciudades (
    id_ciudad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- Crear o actualizar tabla terminales con auditoría
CREATE TABLE IF NOT EXISTS terminales (
    id_terminal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    id_empresa INT,
    id_ciudad INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);



-- TABLA: rutas
CREATE TABLE IF NOT EXISTS rutas (
    id_rutas INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ruta VARCHAR(255) NOT NULL,
    descripcion TEXT,
    duracion VARCHAR(50),
    precio DECIMAL(10, 2),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);


-- Crear tabla viajes con auditoría
CREATE TABLE IF NOT EXISTS viajes (
    id_viaje INT AUTO_INCREMENT PRIMARY KEY,
    id_terminal_origen INT NOT NULL,
    id_terminal_destino INT NOT NULL,
    id_vehiculo INT NOT NULL,
    ruta_id INT,
    fecha_hora_salida DATETIME NOT NULL,
    fecha_hora_llegada DATETIME NOT NULL,
    estado ENUM('pendiente', 'en_progreso', 'completado', 'interrumpido', 'cancelado') DEFAULT 'pendiente',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_terminal_origen) REFERENCES terminales(id_terminal) ON DELETE CASCADE,
    FOREIGN KEY (id_terminal_destino) REFERENCES terminales(id_terminal) ON DELETE CASCADE,
    FOREIGN KEY (ruta_id) REFERENCES rutas(id_rutas) ON DELETE CASCADE,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(idvehiculo) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- Crear tabla colas_terminal con auditoría
CREATE TABLE IF NOT EXISTS colas_terminal (
    id_cola INT AUTO_INCREMENT PRIMARY KEY,
    id_terminal INT NOT NULL,
    id_vehiculo INT NOT NULL,
    hora_llegada DATETIME NOT NULL,
    estado VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_terminal) REFERENCES terminales(id_terminal) ON DELETE CASCADE,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(idvehiculo) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);


-- TABLA: categorias_lugares
CREATE TABLE IF NOT EXISTS categorias_lugares (
    id_categoria_lugares INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(255) NOT NULL,
    descripcion TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- TABLA: lugares_turisticos
CREATE TABLE IF NOT EXISTS lugares_turisticos (
    id_lugares_turisticos INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(255),
    categoria_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias_lugares(id_categoria_lugares) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- TABLA: ruta_lugares
CREATE TABLE IF NOT EXISTS ruta_lugares (
    id_ruta_lugares INT AUTO_INCREMENT PRIMARY KEY,
    ruta_id INT NOT NULL,
    lugar_turistico_id INT NOT NULL,
    orden_visita INT NOT NULL,
    tiempo_estancia DECIMAL(8,2) NOT NULL, -- Tiempo en minutos o horas
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (ruta_id) REFERENCES rutas(id_rutas) ON DELETE CASCADE,
    FOREIGN KEY (lugar_turistico_id) REFERENCES lugares_turisticos(id_lugares_turisticos) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

INSERT INTO `USER` (
  `user_id`,
  `username`,
  `email`,
  `password_hash`,
  `status`,
  `created_at`,
  `created_by`,
  `updated_at`,
  `updated_by`,
  `deleted_at`
) 
VALUES (
  1,
  'Fractal',
  'fractalinsight@gmail.com',
  '$2b$10$n0YmTrcI/Jwr.DO0svPXXO6.yw922L1gRrZLMgYKQM2c24qFLCP.C',
  'active',
  '2025-01-15 00:16:28',
  NULL,
  '2025-01-15 00:16:28',
  NULL,
  NULL
);

INSERT INTO `ROLE` (
  `role_id`,
  `name`,
  `description`,
  `created_at`,
  `created_by`,
  `updated_at`,
  `updated_by`,
  `deleted_at`
)
VALUES (
  1,
  'Admin',
  'Rol SuperUsuario del Sistema',
  '2025-01-15 00:26:08',
  NULL,
  '2025-01-15 00:26:08',
  NULL,
  NULL
);
INSERT INTO `ROLE` (
  `role_id`,
  `name`,
  `description`,
  `created_at`,
  `created_by`,
  `updated_at`,
  `updated_by`,
  `deleted_at`
)
VALUES (
  2,
  'User',
  'Rol usuario común',
  '2025-01-15 00:26:08',
  NULL,
  '2025-01-15 00:26:08',
  NULL,
  NULL
);
INSERT INTO `ROLE` (
  `role_id`,
  `name`,
  `description`,
  `created_at`,
  `created_by`,
  `updated_at`,
  `updated_by`,
  `deleted_at`
)
VALUES (
  3,
  'Guia',
  'Rol usuario tipo Guia',
  '2025-01-15 00:26:08',
  NULL,
  '2025-01-15 00:26:08',
  NULL,
  NULL
);
INSERT INTO `ROLE` (
  `role_id`,
  `name`,
  `description`,
  `created_at`,
  `created_by`,
  `updated_at`,
  `updated_by`,
  `deleted_at`
)
VALUES (
  4,
  'Conductor',
  'Rol usuario tipo Conductor',
  '2025-01-15 00:26:08',
  NULL,
  '2025-01-15 00:26:08',
  NULL,
  NULL
);

INSERT INTO `USER_ROLE` (
  `user_id`,
  `role_id`,
  `created_at`,
  `created_by`,
  `updated_at`,
  `updated_by`,
  `deleted_at`
)
VALUES (
  1,
  1,
  '2025-01-15 00:27:15',
  NULL,
  '2025-01-15 00:27:15',
  NULL,
  NULL
);
