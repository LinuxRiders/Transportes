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
    icono_vehiculo VARCHAR(100),
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
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_marca) REFERENCES marca_vehiculo(id_marca) ON DELETE SET NULL,
    FOREIGN KEY (idtransmision) REFERENCES transmision(idtransmision) ON DELETE SET NULL,
    FOREIGN KEY (idtipo_vehiculo) REFERENCES tipo_vehiculo(idtipo_vehiculo) ON DELETE SET NULL,
    FOREIGN KEY (idcombustible) REFERENCES combustible(idcombustible) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- 8. TABLA DE ASIENTOS
CREATE TABLE asientos (
    idAsiento INT AUTO_INCREMENT PRIMARY KEY,
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
