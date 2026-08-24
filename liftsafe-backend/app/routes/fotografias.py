from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form, status, Request
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import os
import shutil
from app.database import get_db
from app.models.models import Fotografia, Informe
from app.schemas.schemas import FotografiaResponse, MessageResponse
from app.utils.auth_deps import get_current_user_role

router = APIRouter(prefix="/fotografias", tags=["Fotografias"])

# Crear carpeta para subir fotos
UPLOAD_DIR = "uploads/fotos/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ============================================
# 1. SUBIR foto
# ============================================
@router.post("/", response_model=FotografiaResponse, status_code=status.HTTP_201_CREATED)
def subir_foto(
    id_informe: int = Form(...),
    file: UploadFile = File(...),
    descripcion: str | None = Form(None),
    request: Request = None,
    db: Session = Depends(get_db)
):
    try:
        # Obtener usuario actual
        rol, user_id, _ = get_current_user_role(request)
        
        # Validar que el usuario sea Inspector
        if rol != "Inspector":
            raise HTTPException(status_code=403, detail="Solo inspectores pueden subir fotos")
        
        # Validar tamaño (10 MB)
        if file.size > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="El archivo excede 10 MB")
        
        # Validar formato
        if not file.content_type in ["image/jpeg", "image/png"]:
            raise HTTPException(status_code=400, detail="Solo se permiten JPG y PNG")
        
        # Validar que el informe existe
        informe = db.query(Informe).filter(Informe.id_informe == id_informe).first()
        if not informe:
            raise HTTPException(status_code=404, detail="Informe no encontrado")
        
        # Crear carpeta si no existe (por si acaso)
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        
        # Guardar archivo en disco
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{file.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Guardar registro en la base de datos
        nueva_foto = Fotografia(
            id_informe=id_informe,
            nombre_archivo=filename,
            ruta_archivo=filepath,
            tamano_kb=round(file.size / 1024, 2),
            descripcion=descripcion,
            fecha_captura=datetime.now(),
            sincronizado=True
        )
        db.add(nueva_foto)
        db.commit()
        db.refresh(nueva_foto)
        return nueva_foto
        
    except Exception as e:
        print(f"Error al subir foto: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")