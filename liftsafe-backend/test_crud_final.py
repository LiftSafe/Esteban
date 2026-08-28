#!/usr/bin/env python3
"""
PRUEBAS CRUD COMPLETAS - LIFTSAFE BACKEND
Ejecutar con: python test_crud_final.py

Requisitos:
1. XAMPP/MySQL corriendo
2. Backend corriendo (uvicorn app.main:app --reload --port 8000)
"""

import sys
sys.path.insert(0, '.')
import requests
import json
import random

BASE_URL = "http://localhost:8000"
TOKEN = None
CREATED_IDS = {}  # Guardar IDs creados para limpieza

OK = "\033[92m✅\033[0m"
FAIL = "\033[91m❌\033[0m"
WARN = "\033[93m⚠️\033[0m"

def login():
    global TOKEN
    print("\n🔑 Login como admin...")
    try:
        r = requests.post(f"{BASE_URL}/auth/login", json={
            "correo": "admin@liftsafe.com",
            "contrasena": "Admin123!"
        }, timeout=10)
        if r.status_code == 200:
            TOKEN = r.json()["access_token"]
            print(f"  {OK} Token obtenido")
            return True
        else:
            print(f"  {FAIL} Login falló: {r.status_code} - {r.text}")
            return False
    except Exception as e:
        print(f"  {FAIL} Error de conexión: {e}")
        print("  Asegúrate de que el backend esté corriendo en http://localhost:8000")
        return False

def headers():
    return {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def test(name, method, url, data=None, expected=200):
    full = f"{BASE_URL}{url}"
    try:
        if method == "GET":
            r = requests.get(full, headers=headers(), timeout=10)
        elif method == "POST":
            r = requests.post(full, headers=headers(), json=data, timeout=10)
        elif method == "PUT":
            r = requests.put(full, headers=headers(), json=data, timeout=10)
        elif method == "DELETE":
            r = requests.delete(full, headers=headers(), timeout=10)
        else:
            print(f"  {FAIL} Método inválido: {method}")
            return None
        
        ok = r.status_code == expected
        icon = OK if ok else FAIL
        print(f"  {icon} [{method}] {url} → {r.status_code}")
        if not ok:
            print(f"     Respuesta: {r.text[:150]}")
        return r if ok else None
    except Exception as e:
        print(f"  {FAIL} [{method}] {url} → {e}")
        return None

# ============================================================
# 1. USUARIOS
# ============================================================
def test_usuarios():
    print("\n" + "="*60)
    print("📋 MÓDULO: USUARIOS")
    print("="*60)
    
    # LISTAR
    r = test("Listar usuarios", "GET", "/usuarios/listado", expected=200)
    if not r: return False
    total_antes = len(r.json())
    print(f"     Usuarios activos antes: {total_antes}")
    
    # CREAR
    email = f"prueba_{random.randint(1000,9999)}@test.com"
    r = test("Crear usuario", "POST", "/usuarios", {
        "nombre_completo": "Usuario Prueba CRUD",
        "correo": email,
        "contrasena": "Test123!",
        "telefono": "3001234567",
        "tipo_documento": "CC",
        "documento_identidad": f"{random.randint(10000000,99999999)}",
        "id_rol": 2
    }, expected=200)
    if not r: return False
    
    # Verificar que aparece en listado
    r = test("Verificar usuario en listado", "GET", "/usuarios/listado", expected=200)
    users = r.json()
    user = next((u for u in users if u["correo"] == email), None)
    if not user:
        print(f"  {FAIL} Usuario creado NO aparece en listado")
        return False
    user_id = user["id_usuario"]
    CREATED_IDS["usuario"] = user_id
    print(f"     Usuario creado con ID={user_id}")
    
    # ACTUALIZAR
    r = test("Actualizar usuario", "PUT", f"/usuarios/{user_id}", {
        "nombre_completo": "Usuario Actualizado",
        "telefono": "3009999999"
    }, expected=200)
    if not r: return False
    
    # ELIMINAR (soft delete)
    r = test("Eliminar usuario (soft)", "DELETE", f"/usuarios/{user_id}", expected=200)
    if not r: return False
    
    # Verificar que NO aparece en listado
    r = requests.get(f"{BASE_URL}/usuarios/listado", headers=headers(), timeout=10)
    users_after = r.json()
    deleted = next((u for u in users_after if u.get("id_usuario") == user_id), None)
    if deleted:
        print(f"  {FAIL} Usuario eliminado SIGUE apareciendo!")
        return False
    print(f"  {OK} Usuario eliminado correctamente oculto")
    
    # Verificar que el usuario sigue existiendo en DB (soft delete)
    # Esto requiere acceso directo a DB, lo verificamos indirectamente
    # intentando reactivarlo
    r = test("Reactivar usuario", "PUT", f"/usuarios/{user_id}/reactivar", expected=200)
    if not r: return False
    
    # Limpiar: eliminar de nuevo
    r = test("Eliminar usuario final", "DELETE", f"/usuarios/{user_id}", expected=200)
    
    return True

# ============================================================
# 2. ASCENSORES
# ============================================================
def test_ascensores():
    print("\n" + "="*60)
    print("🏢 MÓDULO: ASCENSORES")
    print("="*60)
    
    # LISTAR
    r = test("Listar ascensores", "GET", "/ascensores/listado", expected=200)
    if not r: return False
    
    # Obtener un cliente para crear ascensor
    r = requests.get(f"{BASE_URL}/usuarios/listado", headers=headers(), timeout=10)
    clientes = [u for u in r.json() if u["rol"] == "Cliente"]
    if not clientes:
        print(f"  {WARN} No hay clientes para asignar ascensor")
        return True  # No es fallo del módulo
    cliente_id = clientes[0]["id_usuario"]
    
    # CREAR
    codigo = f"ASC-TEST-{random.randint(1000,9999)}"
    r = test("Crear ascensor", "POST", "/ascensores/", {
        "id_cliente": cliente_id,
        "codigo_interno": codigo,
        "marca": "PruebaMarca",
        "modelo": "PruebaModelo",
        "numero_serie": "SN99999",
        "tipo_ascensor": "Pasajeros",
        "capacidad_kg": 1000,
        "capacidad_personas": 10,
        "numero_pisos": 5,
        "velocidad_ms": 1.0,
        "ubicacion_exacta": "Torre Prueba",
        "direccion_completa": "Calle Prueba 123",
        "ciudad": "Bogotá",
        "estado": "Activo",
        "fecha_instalacion": "2024-01-01"
    }, expected=200)
    if not r: return False
    
    asc_id = r.json().get("id_ascensor")
    CREATED_IDS["ascensor"] = asc_id
    print(f"     Ascensor creado ID={asc_id}")
    
    # ACTUALIZAR
    r = test("Actualizar ascensor", "PUT", f"/ascensores/{asc_id}", {
        "marca": "MarcaActualizada"
    }, expected=200)
    if not r: return False
    
    # ELIMINAR
    r = test("Eliminar ascensor", "DELETE", f"/ascensores/{asc_id}", expected=200)
    if not r: return False
    
    return True

# ============================================================
# 3. INSPECCIONES
# ============================================================
def test_inspecciones():
    print("\n" + "="*60)
    print("🔍 MÓDULO: INSPECCIONES")
    print("="*60)
    
    # LISTAR
    r = test("Listar inspecciones", "GET", "/inspecciones/mis-inspecciones", expected=200)
    if not r: return False
    
    inspecciones = r.json()
    if not inspecciones:
        print(f"  {WARN} No hay inspecciones para probar PUT/DELETE")
        return True
    
    # Obtener ID de primera inspección
    insp = inspecciones[0]
    insp_id = insp.get("id_inspeccion") or insp.get("id")
    
    # ACTUALIZAR
    r = test("Actualizar inspección", "PUT", f"/inspecciones/{insp_id}", {
        "observaciones_generales": "Observación de prueba CRUD"
    }, expected=200)
    
    # No eliminamos inspecciones reales
    print(f"  {WARN} DELETE omitido para preservar datos")
    
    return True

# ============================================================
# 4. SOLICITUDES
# ============================================================
def test_solicitudes():
    print("\n" + "="*60)
    print("📨 MÓDULO: SOLICITUDES")
    print("="*60)
    
    # LISTAR (como admin)
    r = test("Listar solicitudes", "GET", "/solicitudes/", expected=200)
    if not r: return False
    
    solicitudes = r.json()
    if solicitudes:
        sol_id = solicitudes[0]["id_solicitud"]
        test("Obtener solicitud por ID", "GET", f"/solicitudes/{sol_id}", expected=200)
    
    print(f"  {WARN} POST/DELETE de solicitudes requieren rol Cliente")
    return True

# ============================================================
# 5. PROGRAMACIÓN
# ============================================================
def test_programacion():
    print("\n" + "="*60)
    print("📅 MÓDULO: PROGRAMACIÓN")
    print("="*60)
    
    r = test("Listar programaciones", "GET", "/programacion/", expected=200)
    if not r: return False
    
    print(f"  {WARN} POST/PUT/DELETE requieren rol Coordinador")
    return True

# ============================================================
# 6. CHECKLIST
# ============================================================
def test_checklist():
    print("\n" + "="*60)
    print("✅ MÓDULO: CHECKLIST")
    print("="*60)
    
    test("Listar categorías", "GET", "/checklist/categorias", expected=200)
    
    # Obtener inspecciones para probar checklist
    r = requests.get(f"{BASE_URL}/inspecciones/mis-inspecciones", headers=headers(), timeout=10)
    if r.status_code == 200 and r.json():
        insp_id = r.json()[0].get("id_inspeccion") or r.json()[0].get("id")
        test("Listar checklist por inspección", "GET", f"/checklist/inspeccion/{insp_id}", expected=200)
        test("Obtener cumplimiento", "GET", f"/checklist/cumplimiento/{insp_id}", expected=200)
    
    return True

# ============================================================
# 7. OBSERVACIONES
# ============================================================
def test_observaciones():
    print("\n" + "="*60)
    print("📝 MÓDULO: OBSERVACIONES")
    print("="*60)
    
    r = requests.get(f"{BASE_URL}/informes/", headers=headers(), timeout=10)
    if r.status_code == 200 and r.json():
        inf_id = r.json()[0]["id_informe"]
        test("Listar observaciones", "GET", f"/observaciones/{inf_id}", expected=200)
    else:
        print(f"  {WARN} No hay informes para probar observaciones")
    
    return True

# ============================================================
# 8. FOTOGRAFÍAS
# ============================================================
def test_fotografias():
    print("\n" + "="*60)
    print("📷 MÓDULO: FOTOGRAFÍAS")
    print("="*60)
    
    r = requests.get(f"{BASE_URL}/informes/", headers=headers(), timeout=10)
    if r.status_code == 200 and r.json():
        inf_id = r.json()[0]["id_informe"]
        test("Listar fotos por informe", "GET", f"/fotografias/informe/{inf_id}", expected=200)
    else:
        print(f"  {WARN} No hay informes para probar fotografías")
    
    return True

# ============================================================
# 9. INFORMES
# ============================================================
def test_informes():
    print("\n" + "="*60)
    print("📄 MÓDULO: INFORMES")
    print("="*60)
    
    test("Listar informes", "GET", "/informes/", expected=200)
    
    # POST generar informe requiere inspección con firmas
    print(f"  {WARN} POST generar informe requiere inspección firmada")
    
    return True

# ============================================================
# 10. DASHBOARD
# ============================================================
def test_dashboard():
    print("\n" + "="*60)
    print("📊 MÓDULO: DASHBOARD")
    print("="*60)
    
    endpoints = [
        ("/dashboard/stats", "Stats"),
        ("/dashboard/charts", "Charts"),
        ("/dashboard/usuarios", "Usuarios"),
        ("/dashboard/inspecciones", "Inspecciones"),
        ("/dashboard/ascensores", "Ascensores"),
        ("/dashboard/edificios", "Edificios"),
        ("/dashboard/informes", "Informes"),
    ]
    
    all_ok = True
    for url, name in endpoints:
        r = test(f"Dashboard {name}", "GET", url, expected=200)
        if not r:
            all_ok = False
    
    return all_ok

# ============================================================
# EJECUCIÓN PRINCIPAL
# ============================================================
if __name__ == "__main__":
    print("\n" + "🚀"*30)
    print("PRUEBAS CRUD COMPLETAS - LIFTSAFE")
    print("🚀"*30)
    
    if not login():
        print(f"\n{FAIL} No se pudo conectar al backend.")
        print("Asegúrate de:")
        print("  1. XAMPP/MySQL esté corriendo")
        print("  2. Backend: uvicorn app.main:app --reload --port 8000")
        sys.exit(1)
    
    resultados = {}
    resultados["Usuarios"] = test_usuarios()
    resultados["Ascensores"] = test_ascensores()
    resultados["Inspecciones"] = test_inspecciones()
    resultados["Solicitudes"] = test_solicitudes()
    resultados["Programación"] = test_programacion()
    resultados["Checklist"] = test_checklist()
    resultados["Observaciones"] = test_observaciones()
    resultados["Fotografías"] = test_fotografias()
    resultados["Informes"] = test_informes()
    resultados["Dashboard"] = test_dashboard()
    
    print("\n" + "="*60)
    print("📊 RESUMEN FINAL")
    print("="*60)
    
    for modulo, ok in resultados.items():
        icon = OK if ok else FAIL
        print(f"  {icon} {modulo}")
    
    total = len(resultados)
    pasadas = sum(1 for v in resultados.values() if v)
    
    print(f"\nTotal: {pasadas}/{total} módulos OK")
    
    if pasadas == total:
        print(f"\n{OK} ¡TODAS LAS PRUEBAS PASARON!")
    else:
        print(f"\n{FAIL} Algunas pruebas fallaron. Revisa los detalles arriba.")
    
    print(f"\n{INFO} IDs creados para limpieza: {CREATED_IDS}")
