"""Aplica migraciones pendientes en la base de datos."""
from sqlalchemy import text
from app.database import engine

MIGRATIONS = [
    """
    SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'usuario'
      AND COLUMN_NAME = 'tipo_documento'
    """,
]


def column_exists(conn, column_name: str, table_name: str = "usuario") -> bool:
    result = conn.execute(
        text(
            """
            SELECT COUNT(*) FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = :table
              AND COLUMN_NAME = :column
            """
        ),
        {"table": table_name, "column": column_name},
    ).scalar()
    return result > 0


def run():
    with engine.begin() as conn:
        if not column_exists(conn, "tipo_documento"):
            conn.execute(
                text(
                    "ALTER TABLE usuario ADD COLUMN tipo_documento VARCHAR(10) NULL "
                    "COMMENT 'CC, NIT, PPE, CE' AFTER telefono"
                )
            )
            print("Columna tipo_documento agregada.")
        else:
            print("Columna tipo_documento ya existe.")


if __name__ == "__main__":
    run()
