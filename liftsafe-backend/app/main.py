from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, vistas, usuarios, ascensores, inspecciones, dashboard, fotografias

app = FastAPI(title="LiftSafe API", version="1.0")

# ============================================
# CONFIGURACIÓN CORS
# ============================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# REGISTRO DE ROUTERS (SOLO LOS QUE EXISTEN)
# ============================================
app.include_router(auth.router)
app.include_router(vistas.router)
app.include_router(usuarios.router)
app.include_router(ascensores.router)
app.include_router(inspecciones.router)
app.include_router(dashboard.router)
app.include_router(fotografias.router)

@app.get("/")
def root():
    return {"message": "LiftSafe API funcionando"}