DROP DATABASE IF EXISTS db_vehiculos;
CREATE DATABASE db_vehiculos;
USE db_vehiculos;

-- 2. TABLA DE MARCAS
CREATE TABLE marca_vehiculo (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(45) NOT NULL,
    descripcion VARCHAR(100)
);

-- 3. TABLA DE TRANSMISIÓN
CREATE TABLE transmision (
    idtransmision INT AUTO_INCREMENT PRIMARY KEY,
    tipo_transmision VARCHAR(45) NOT NULL
);

-- 4. TABLA DE CARROCERÍAS
CREATE TABLE carroceria (
    idcarroceria INT AUTO_INCREMENT PRIMARY KEY,
    tipo_carroceria VARCHAR(45) NOT NULL
);

-- 5. TABLA DE TIPO DE VEHÍCULO (RELACIONADA A CARROCERÍA)
CREATE TABLE tipo_vehiculo (
    idtipo_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    tipo_vehiculo VARCHAR(45) NOT NULL,
    icono_vehiculo VARCHAR(100),
    idcarroceria INT NOT NULL,
    FOREIGN KEY (idcarroceria) 
        REFERENCES carroceria(idcarroceria)
        ON DELETE RESTRICT
);

-- 6. TABLA DE COMBUSTIBLE
CREATE TABLE combustible (
    idcombustible INT AUTO_INCREMENT PRIMARY KEY,
    tipo_combustible VARCHAR(45) NOT NULL
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
    FOREIGN KEY (id_marca) 
        REFERENCES marca_vehiculo(id_marca)
        ON DELETE SET NULL,
    FOREIGN KEY (idtransmision) 
        REFERENCES transmision(idtransmision)
        ON DELETE SET NULL,
    FOREIGN KEY (idtipo_vehiculo) 
        REFERENCES tipo_vehiculo(idtipo_vehiculo)
        ON DELETE SET NULL,
    FOREIGN KEY (idcombustible) 
        REFERENCES combustible(idcombustible)
        ON DELETE SET NULL
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
    FOREIGN KEY (idvehiculo) 
        REFERENCES vehiculo(idvehiculo)
        ON DELETE CASCADE  -- al eliminar un vehículo, se borran sus asientos
);
