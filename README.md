# LiftSafe - Sistema de Gestión de Inspecciones de Ascensores

## Descripción del Proyecto

**LiftSafe** es una aplicación web completa para la gestión de inspecciones técnicas de ascensores. El sistema permite:

- Registro y gestión de usuarios (Administradores, Coordinadores, Inspectores, Clientes, Director Técnico)
- Administración de ascensores y su historial
- Programación de inspecciones periódicas
- Generación de informes técnicos en PDF
- Captura y gestión de fotografías como evidencia
- Checklist de cumplimiento normativo
- Solicitudes de servicio
- Auditoría de operaciones
- Notificaciones por correo electrónico

## Integrantes del Equipo

| Nombre | Rol |
|--------|-----|
| Esteban | Líder de Proyecto / Backend |
| Felipe | Desarrollador Frontend |
| Dayan | Desarrollador Frontend |
| Valentina | Desarrolladora Backend / Base de Datos |
| Luz | Desarrolladora Backend / API |

## Tecnologías Utilizadas

### Backend
- **Python 3.12**
- **FastAPI 0.141.1** - Framework web de alto rendimiento
- **SQLAlchemy 2.0.52** - ORM para base de datos
- **PyMySQL 1.2.0** - Conector MySQL
- **Pydantic 2.13.4** - Validación de datos
- **python-jose 3.5.0** - Autenticación JWT
- **bcrypt 5.0.0** - Hash de contraseñas
- **reportlab 4.2.0** - Generación de PDFs
- **fastapi-mail 1.6.8** - Envío de correos
- **Pillow 12.3.0** - Procesamiento de imágenes

### Frontend
- **React 19.2.6**
- **Vite 8.0.12** - Bundler y dev server
- **Material UI (MUI) 9.0.1** - Componentes de interfaz
- **React Router DOM 7.17.0** - Enrutamiento
- **Recharts 3.8.1** - Gráficas y dashboards
- **Emotion 11.14** - Estilos CSS-in-JS

### Base de Datos
- **MySQL 8.0** (gestionada vía XAMPP / phpMyAdmin)
- Cifrado AES para contraseñas
- Vistas SQL para seguridad

## Estructura del Proyecto

```
LiftSafe/
├── liftsafe-backend/          # API REST (FastAPI)
│   ├── app/
│   │   ├── main.py             # Punto de entrada
│   │   ├── config.py           # Configuración
│   │   ├── database.py         # Conexión a MySQL
│   │   ├── models/             # Modelos SQLAlchemy
│   │   ├── routes/             # Endpoints de la API
│   │   │   ├── auth.py         # Login / JWT
│   │   │   ├── usuarios.py     # CRUD Usuarios
│   │   │   ├── ascensores.py   # CRUD Ascensores
│   │   │   ├── inspecciones.py # CRUD Inspecciones
│   │   │   ├── informes.py     # CRUD Informes + PDF
│   │   │   ├── fotografias.py  # CRUD Fotografías
│   │   │   ├── programacion.py # CRUD Programación
│   │   │   ├── usuario_ascensor.py  # CRUD Asignaciones
│   │   │   ├── checklist.py    # Checklist de inspección
│   │   │   ├── observaciones.py# Observaciones técnicas
│   │   │   ├── solicitudes.py  # Solicitudes de servicio
│   │   │   ├── auditoria.py    # Registro de auditoría
│   │   │   ├── dashboard.py    # Estadísticas
│   │   │   └── vistas.py       # Vistas SQL
│   │   ├── schemas/            # Esquemas Pydantic
│   │   ├── controllers/        # Lógica de negocio
│   │   └── utils/              # Utilidades (auth, validaciones)
│   ├── uploads/                # Archivos subidos
│   ├── requirements.txt        # Dependencias Python
│   └── .venv/                  # Entorno virtual
│
├── LiftSafe_FrontendV2/       # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Páginas principales
│   │   ├── hooks/              # Custom hooks
│   │   ├── context/            # Contextos React
│   │   ├── services/           # Llamadas a la API
│   │   └── assets/             # Imágenes y estilos
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── liftsafe_db.sql            # Script de base de datos
├── Checklist_Verificacion_LiftSafe.docx
├── CRUD_Verificacion_Modulos.docx
└── README.md
```

## Instalación Paso a Paso

### 1. Base de Datos (XAMPP + phpMyAdmin)

1. Descarga e instala **XAMPP** desde: https://www.apachefriends.org/
2. Abre el **XAMPP Control Panel**
3. Inicia **Apache** y **MySQL**
4. Abre tu navegador en: http://localhost/phpmyadmin
5. Crea una nueva base de datos llamada `liftsafe_db`
6. Ve a la pestaña **Importar**
7. Selecciona el archivo `liftsafe_db.sql` del proyecto
8. Haz clic en **Go / Continuar**

### 2. Backend (Python)

```bash
# Entrar al directorio del backend
cd liftsafe-backend

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual (Windows Git Bash)
source .venv/Scripts/activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor de desarrollo
uvicorn app.main:app --reload --port 8000
```

La API estará disponible en: http://localhost:8000

Documentación interactiva (Swagger UI): http://localhost:8000/docs

### 3. Frontend (React + Vite)

```bash
# Entrar al directorio del frontend
cd LiftSafe_FrontendV2

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

## Credenciales por Defecto

### Base de Datos MySQL
| Campo | Valor |
|-------|-------|
| Host | 127.0.0.1 |
| Puerto | 3306 |
| Usuario | `liftsafe_app` |
| Contraseña | `123456` |
| Base de datos | `liftsafe_db` |

### Usuarios del Sistema (pre-cargados)

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Administrador | admin@liftsafe.com | Admin123! |
| Coordinador | coord@liftsafe.com | Coord123! |
| Inspector | inspector@liftsafe.com | Insp123! |
| Cliente | cliente@liftsafe.com | Cliente123! |

> ⚠️ **Nota:** Todas las contraseñas están encriptadas con AES en la base de datos.

## Módulos del Sistema (CRUD Completo)

| Módulo | Crear | Leer | Actualizar | Eliminar |
|--------|:-----:|:----:|:----------:|:--------:|
| Usuarios | ✅ | ✅ | ✅ | ✅ |
| Ascensores | ✅ | ✅ | ✅ | ✅ |
| Inspecciones | ✅ | ✅ | ✅ | ✅ |
| Informes | ✅ | ✅ | ✅ (envío) | ✅ |
| Fotografías | ✅ | ✅ | ✅ | ✅ |
| Programación | ✅ | ✅ | ✅ (reasignar/cancelar) | ✅ |
| Usuario-Ascensor | ✅ | ✅ | ✅ (desasignar) | ✅ |
| Solicitudes | ✅ | ✅ | ✅ | - |
| Checklist | ✅ | ✅ | - | - |
| Observaciones | ✅ | ✅ | ✅ | - |
| Auditoría | - | ✅ | - | - |

## Endpoints de la API Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/usuarios` | Crear usuario |
| GET | `/usuarios/listado` | Listar usuarios |
| PUT | `/usuarios/{id}` | Actualizar usuario |
| DELETE | `/usuarios/{id}` | Eliminar usuario |
| POST | `/ascensores/` | Crear ascensor |
| GET | `/ascensores/listado` | Listar ascensores |
| PUT | `/ascensores/{id}` | Actualizar ascensor |
| DELETE | `/ascensores/{id}` | Eliminar ascensor |
| POST | `/inspecciones/crear` | Crear inspección |
| PUT | `/inspecciones/{id}` | Actualizar inspección |
| DELETE | `/inspecciones/{id}` | Eliminar inspección |
| POST | `/informes/{id}/generar` | Generar PDF |
| DELETE | `/informes/{id}` | Eliminar informe |
| POST | `/fotografias/` | Subir foto |
| PUT | `/fotografias/{id}` | Actualizar foto |
| DELETE | `/fotografias/{id}` | Eliminar foto |
| POST | `/programacion/` | Programar inspección |
| PUT | `/programacion/{id}/reasignar` | Reasignar inspector |
| DELETE | `/programacion/{id}` | Eliminar programación |

## Variables de Entorno (opcional)

Puedes crear un archivo `.env` en `liftsafe-backend/` para sobrescribir la configuración:

```env
DB_USER=liftsafe_app
DB_PASSWORD=tu_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=liftsafe_db
SECRET_KEY=tu-secret-key
```

## Notas de Seguridad

- Las contraseñas se almacenan con cifrado AES en la base de datos
- La autenticación usa tokens JWT con expiración de 30 minutos
- El acceso a endpoints está restringido por roles
- Las vistas SQL (`vista_usuarios_segura`, `vista_resumen_inspecciones`) ocultan datos sensibles

---

**Proyecto académico - SENA**  
*Trimestre 5 - 2026*
