
## // instalar las librerias 
## pip install -r requirements.txt

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, vistas, usuarios, ascensores, inspecciones, dashboard, informes, auditoria, checklist, fotografias, observaciones, programacion, solicitudes, usuario_ascensor

app = FastAPI(
    title="LiftSafe API",
    version="1.0",
    swagger_ui_init_oauth={
        "usePkceWithAuthorizationCodeGrant": True,
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(vistas.router)
app.include_router(usuarios.router)
app.include_router(ascensores.router)
app.include_router(inspecciones.router)
app.include_router(dashboard.router)
app.include_router(informes.router)
app.include_router(auditoria.router)
app.include_router(checklist.router)
app.include_router(fotografias.router)
app.include_router(observaciones.router)
app.include_router(programacion.router)
app.include_router(solicitudes.router)
app.include_router(usuario_ascensor.router)

@app.get("/")
def root():
    return {"message": "LiftSafe API funcionando"}
