-- Ejecutar en MySQL si la columna tipo_documento no existe aún
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS tipo_documento VARCHAR(10) NULL COMMENT 'CC, NIT, PPE, CE' AFTER telefono;
