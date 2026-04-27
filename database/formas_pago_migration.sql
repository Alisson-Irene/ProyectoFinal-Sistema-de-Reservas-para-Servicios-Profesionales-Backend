CREATE TABLE IF NOT EXISTS formas_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO'
);

ALTER TABLE reservas
ADD COLUMN IF NOT EXISTS forma_pago_id INT REFERENCES formas_pago(id);

ALTER TABLE servicios
ADD COLUMN IF NOT EXISTS imagen_url TEXT;

INSERT INTO formas_pago (nombre, descripcion, estado)
VALUES
    ('Efectivo', 'Pago presencial en efectivo', 'ACTIVO'),
    ('Tarjeta', 'Pago con tarjeta de debito o credito', 'ACTIVO'),
    ('Transferencia', 'Pago por transferencia bancaria', 'ACTIVO')
ON CONFLICT (nombre) DO NOTHING;
