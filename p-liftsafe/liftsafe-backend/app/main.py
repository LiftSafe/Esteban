## // instalar las librerias 
## pip install -r requirements.txt

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, vistas, usuarios, ascensores, inspecciones, dashboard

app = FastAPI(
    title="LiftSafe API",
    version="1.0",
    # ✅ Agregar esquema de seguridad HTTP Bearer para Swagger
    swagger_ui_init_oauth={
        "usePkceWithAuthorizationCodeGrant": True,
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


@app.get("/")
def root():
    return {"message": "LiftSafe API funcionando"}