# update_all_passwords.py
# Guardar en: C:\Users\esteb\OneDrive\Documentos\sena\trimestre 4\liftsafe\liftsafe\p-liftsafe\liftsafe-backend\update_all_passwords.py

from sqlalchemy import create_engine, text

# ============ CONFIGURACIÓN MANUAL ============

DB_USER = "liftsafe_app"
DB_PASSWORD = "123456"
DB_HOST = "127.0.0.1"
DB_PORT = "3306"
DB_NAME = "liftsafe_db"

NUEVA_CONTRASENA = "123456"
SECRET_KEY_MYSQL = 'LiftSafeSecretKey2026!'

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# ============ SCRIPT ============

def update_all_passwords():
    engine = create_engine(DATABASE_URL)
    
    with engine.begin() as conn:
        result = conn.execute(text("""
            SELECT id_usuario, correo, nombre_completo 
            FROM usuario 
            ORDER BY id_usuario
        """)).mappings().all()
        
        print(f"{'='*60}")
        print(f"🔐 ACTUALIZANDO CONTRASEÑAS DE {len(result)} USUARIOS")
        print(f"{'='*60}")
        print(f"Nueva contraseña: {NUEVA_CONTRASENA}")
        print(f"{'='*60}\n")
        
        for user in result:
            conn.execute(
                text("""
                    UPDATE usuario 
                    SET contrasena_encriptada = AES_ENCRYPT(:pwd, :secret)
                    WHERE id_usuario = :id
                """),
                {
                    "pwd": NUEVA_CONTRASENA,
                    "secret": SECRET_KEY_MYSQL,
                    "id": user["id_usuario"]
                }
            )
            print(f"✅ ID {user['id_usuario']:3d} | {user['correo']:30s} | {user['nombre_completo']}")
        
        print(f"\n{'='*60}")
        print(f"✅ {len(result)} usuarios actualizados correctamente")
        print(f"{'='*60}")
        print(f"\n⚠️  IMPORTANTE: Todos los usuarios ahora tienen la misma contraseña:")
        print(f"   '{NUEVA_CONTRASENA}'")
        print(f"\n🔒 Cambia tu contraseña personal después de iniciar sesión.")

if __name__ == "__main__":
    update_all_passwords()
    
    

## ejecucion 
## python update_all_passwords.py
