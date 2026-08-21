"""Actualiza la contraseña del administrador principal para entorno de desarrollo."""
from app.database import SessionLocal
from app.models.models import Usuario, Rol
from app.controllers.auth_controller import hash_password

DEV_PASSWORD = "Admin123!"


def main():
    db = SessionLocal()
    admin = (
        db.query(Usuario)
        .join(Rol)
        .filter(Rol.nombre_rol == "Administrador")
        .order_by(Usuario.id_usuario.asc())
        .first()
    )
    if not admin:
        print("No hay administrador en la base de datos.")
        return

    admin.contrasena = hash_password(DEV_PASSWORD)
    db.commit()
    print(f"Contraseña del administrador actualizada.")
    print(f"Correo: {admin.correo}")
    print(f"Nueva contraseña: {DEV_PASSWORD}")
    db.close()


if __name__ == "__main__":
    main()
