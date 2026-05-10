CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rol VARCHAR(20) NOT NULL
);

CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url TEXT
);

CREATE TABLE profesionales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE formas_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO'
);

CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    profesional_id INT REFERENCES profesionales(id),
    fecha DATE,
    hora TIME,
    disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    servicio_id INT REFERENCES servicios(id),
    profesional_id INT REFERENCES profesionales(id),
    forma_pago_id INT REFERENCES formas_pago(id),
    fecha DATE,
    hora TIME,
    estado VARCHAR(20) DEFAULT 'ACTIVA'
);

INSERT INTO usuarios (nombre, correo, password, rol)
VALUES ('Admin', 'admin@gmail.com', '$2b$10$SvevfGDM69dGjMppjTCtV.Afi/0tg831ULJkU8mAg7m5mq7qTxjIW1234', 'admin');

INSERT INTO formas_pago (nombre, descripcion, estado)
VALUES
    ('Efectivo', 'Pago presencial en efectivo', 'ACTIVO'),
    ('Tarjeta', 'Pago con tarjeta de debito o credito', 'ACTIVO'),
    ('Transferencia', 'Pago por transferencia bancaria', 'ACTIVO');
