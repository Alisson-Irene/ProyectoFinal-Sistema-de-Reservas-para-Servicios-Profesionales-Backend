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
    precio DECIMAL(10,2) NOT NULL
);

CREATE TABLE profesionales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20)
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
    fecha DATE,
    hora TIME,
    estado VARCHAR(20) DEFAULT 'ACTIVA'
);
