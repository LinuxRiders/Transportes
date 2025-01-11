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


-- BD TERMINALES
-- Usar base de datos actual
USE db_vehiculo;

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

-- Ampliar tabla vehiculos para incluir auditoría si no está
ALTER TABLE vehiculos
ADD COLUMN IF NOT EXISTS id_empresa INT,
ADD FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa) ON DELETE CASCADE,

-- Crear tabla viajes con auditoría
CREATE TABLE IF NOT EXISTS viajes (
    id_viaje INT AUTO_INCREMENT PRIMARY KEY,
    id_terminal_origen INT NOT NULL,
    id_terminal_destino INT NOT NULL,
    id_vehiculo INT NOT NULL,
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
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE CASCADE,
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
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES USER(user_id) ON DELETE SET NULL
);

-- Insertar datos iniciales
INSERT INTO empresas (nombre, direccion, telefono) VALUES
('Transporte Urbano A', 'Av. Principal', '123-456-789'),
('Transporte Interprov.', 'Calle Secundaria', '987-654-321')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), direccion=VALUES(direccion), telefono=VALUES(telefono);

INSERT INTO ciudades (nombre) VALUES
('Ciudad A'),
('Ciudad B')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

INSERT INTO terminales (nombre, direccion, id_empresa, id_ciudad) VALUES
('Terminal Central', 'Av. Transporte 123', 1, 1),
('Terminal Norte', 'Calle Secundaria 456', 2, 2)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), direccion=VALUES(direccion), id_empresa=VALUES(id_empresa), id_ciudad=VALUES(id_ciudad);

INSERT INTO vehiculos (placa, marca, modelo, capacidad, id_empresa, estado) VALUES
('ABC123', 'Toyota', 'HiAce', 15, 1, 'Activo'),
('DEF456', 'Nissan', 'Urban', 12, 2, 'Activo')
ON DUPLICATE KEY UPDATE placa=VALUES(placa), marca=VALUES(marca), modelo=VALUES(modelo), capacidad=VALUES(capacidad), id_empresa=VALUES(id_empresa), estado=VALUES(estado);

INSERT INTO viajes (id_terminal_origen, id_terminal_destino, id_vehiculo, fecha_hora_salida, fecha_hora_llegada, estado) VALUES
(1, 2, 1, '2024-05-20 08:00', '2024-05-20 10:00', 'Completado'),
(2, 1, 2, '2024-05-21 09:00', NULL, 'En curso')
ON DUPLICATE KEY UPDATE id_terminal_origen=VALUES(id_terminal_origen), id_terminal_destino=VALUES(id_terminal_destino), id_vehiculo=VALUES(id_vehiculo), fecha_hora_salida=VALUES(fecha_hora_salida), fecha_hora_llegada=VALUES(fecha_hora_llegada), estado=VALUES(estado);

INSERT INTO colas_terminal (id_terminal, id_vehiculo, hora_llegada, estado) VALUES
(1, 1, '2024-05-20 07:00', 'En cola'),
(2, 2, '2024-05-21 08:30', 'En cola')
ON DUPLICATE KEY UPDATE id_terminal=VALUES(id_terminal), id_vehiculo=VALUES(id_vehiculo), hora_llegada=VALUES(hora_llegada), estado=VALUES(estado);
```

