export const inspections = [
  { id: 'INS-2026-041', building: 'Torre Central', address: 'Calle 50 #22-10', elevator: 'ASC-01', type: 'Anual', inspector: 'Carlos Ruiz', date: '05/06/2026', nextDate: '05/06/2027', status: 'Aprobada', progress: 100, capacity: '8 personas / 630 kg' },
  { id: 'INS-2026-040', building: 'Edificio Norte', address: 'Av. Libertador #88', elevator: 'ASC-03', type: 'Periódica', inspector: 'Ana López', date: '04/06/2026', nextDate: '04/12/2026', status: 'Pendiente', progress: 60, capacity: '10 personas / 800 kg' },
  { id: 'INS-2026-039', building: 'Plaza Comercial', address: 'Carrera 15 #93-45', elevator: 'ASC-02', type: 'Extraordinaria', inspector: 'Pedro Gómez', date: '03/06/2026', nextDate: '03/09/2026', status: 'Observaciones', progress: 85, capacity: '13 personas / 1000 kg' },
  { id: 'INS-2026-038', building: 'Residencial Sur', address: 'Calle 127 #7-20', elevator: 'ASC-01', type: 'Anual', inspector: 'María Torres', date: '02/06/2026', nextDate: '02/06/2027', status: 'Aprobada', progress: 100, capacity: '6 personas / 450 kg' },
  { id: 'INS-2026-037', building: 'Centro Médico San José', address: 'Calle 72 #11-30', elevator: 'ASC-04', type: 'Periódica', inspector: 'Carlos Ruiz', date: '01/06/2026', nextDate: '01/12/2026', status: 'Aprobada', progress: 100, capacity: '15 personas / 1150 kg' },
];

export const elevators = [
  { id: 'ASC-001', building: 'Torre Central', brand: 'Otis', model: 'Gen2', year: 2018, floors: 12, capacity: '8 pers / 630 kg', lastInspection: '05/06/2026', status: 'Operativo', certificate: 'CERT-2026-041' },
  { id: 'ASC-002', building: 'Plaza Comercial', brand: 'Schindler', model: '3300', year: 2015, floors: 8, capacity: '13 pers / 1000 kg', lastInspection: '03/06/2026', status: 'Con observaciones', certificate: 'CERT-2026-039' },
  { id: 'ASC-003', building: 'Edificio Norte', brand: 'Kone', model: 'MonoSpace', year: 2020, floors: 15, capacity: '10 pers / 800 kg', lastInspection: '04/06/2026', status: 'En inspección', certificate: 'Pendiente' },
  { id: 'ASC-004', building: 'Centro Médico San José', brand: 'Otis', model: 'SkyRise', year: 2019, floors: 6, capacity: '15 pers / 1150 kg', lastInspection: '01/06/2026', status: 'Operativo', certificate: 'CERT-2026-037' },
  { id: 'ASC-005', building: 'Residencial Sur', brand: 'ThyssenKrupp', model: 'Evolution', year: 2017, floors: 10, capacity: '6 pers / 450 kg', lastInspection: '02/06/2026', status: 'Operativo', certificate: 'CERT-2026-038' },
];

export const buildings = [
  { id: 'ED-001', name: 'Torre Central', address: 'Calle 50 #22-10, Bogotá', elevators: 2, manager: 'Juan Pérez', phone: '300 123 4567' },
  { id: 'ED-002', name: 'Plaza Comercial', address: 'Carrera 15 #93-45, Bogotá', elevators: 3, manager: 'Laura Vega', phone: '310 987 6543' },
  { id: 'ED-003', name: 'Edificio Norte', address: 'Av. Libertador #88, Bogotá', elevators: 4, manager: 'Roberto Díaz', phone: '320 555 7890' },
];

export const users = [
  { id: 1, name: 'Carlos Ruiz', email: 'c.ruiz@liftsafe.com', role: 'Inspector', document: '1020304050', status: 'Activo', inspections: 48 },
  { id: 2, name: 'Ana López', email: 'a.lopez@liftsafe.com', role: 'Inspector', document: '1030405060', status: 'Activo', inspections: 35 },
  { id: 3, name: 'Pedro Gómez', email: 'p.gomez@liftsafe.com', role: 'Inspector', document: '1040506070', status: 'Activo', inspections: 29 },
  { id: 4, name: 'Admin LiftSafe', email: 'admin@liftsafe.com', role: 'Administrador', document: '1050607080', status: 'Activo', inspections: 0 },
];

export const checklistItems = [
  { category: 'Seguridad', items: ['Frenos de emergencia', 'Paracaídas', 'Límite de velocidad', 'Puertas de cabina'] },
  { category: 'Mecánica', items: ['Cables de tracción', 'Poleas', 'Motor de tracción', 'Sistema de guías'] },
  { category: 'Eléctrica', items: ['Tablero de control', 'Botonera', 'Iluminación de cabina', 'Sistema de alarma'] },
  { category: 'Documentación', items: ['Manual de mantenimiento', 'Registro de revisiones', 'Placa de capacidad', 'Certificado vigente'] },
];

export const statusColor = {
  Aprobada: 'success',
  Pendiente: 'warning',
  Observaciones: 'error',
  Operativo: 'success',
  'En inspección': 'warning',
  'Con observaciones': 'error',
  Activo: 'success',
};
