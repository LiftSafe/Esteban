export const monthlyInspections = [
  { month: 'Ene', total: 18, aprobadas: 15, pendientes: 3 },
  { month: 'Feb', total: 22, aprobadas: 19, pendientes: 3 },
  { month: 'Mar', total: 25, aprobadas: 21, pendientes: 4 },
  { month: 'Abr', total: 20, aprobadas: 17, pendientes: 3 },
  { month: 'May', total: 28, aprobadas: 24, pendientes: 4 },
  { month: 'Jun', total: 29, aprobadas: 22, pendientes: 7 },
];

export const inspectionStatusData = [
  { name: 'Aprobadas', value: 22, color: '#0E7C4A' },
  { name: 'Pendientes', value: 7, color: '#C97B1A' },
  { name: 'Observaciones', value: 4, color: '#C0392B' },
];

export const elevatorStatusData = [
  { name: 'Operativo', value: 18, color: '#0E7C4A' },
  { name: 'En inspección', value: 5, color: '#0066CC' },
  { name: 'Con observaciones', value: 3, color: '#C0392B' },
];

export const inspectionsByBuilding = [
  { building: 'Torre Central', inspecciones: 8 },
  { building: 'Edificio Norte', inspecciones: 6 },
  { building: 'Plaza Comercial', inspecciones: 5 },
  { building: 'Residencial Sur', inspecciones: 4 },
  { building: 'Centro Médico', inspecciones: 6 },
];

export const weeklyActivity = [
  { day: 'Lun', completadas: 4, programadas: 6 },
  { day: 'Mar', completadas: 3, programadas: 5 },
  { day: 'Mié', completadas: 5, programadas: 5 },
  { day: 'Jue', completadas: 2, programadas: 4 },
  { day: 'Vie', completadas: 6, programadas: 7 },
  { day: 'Sáb', completadas: 1, programadas: 2 },
];

export const complianceTrend = [
  { month: 'Ene', cumplimiento: 91 },
  { month: 'Feb', cumplimiento: 93 },
  { month: 'Mar', cumplimiento: 94 },
  { month: 'Abr', cumplimiento: 92 },
  { month: 'May', cumplimiento: 95 },
  { month: 'Jun', cumplimiento: 96 },
];

export const clientCertTimeline = [
  { month: 'Ene', vigentes: 2, porVencer: 0 },
  { month: 'Feb', vigentes: 2, porVencer: 0 },
  { month: 'Mar', vigentes: 2, porVencer: 1 },
  { month: 'Abr', vigentes: 2, porVencer: 0 },
  { month: 'May', vigentes: 2, porVencer: 0 },
  { month: 'Jun', vigentes: 2, porVencer: 0 },
];

export const salesPipeline = [
  { etapa: 'Prospecto', cantidad: 8 },
  { etapa: 'Negociación', cantidad: 5 },
  { etapa: 'Contrato', cantidad: 3 },
  { etapa: 'Renovación', cantidad: 5 },
];

export const recentActivity = [
  { id: 1, action: 'Inspección aprobada', detail: 'ASC-01 — Torre Central', time: 'Hace 2 h', type: 'success' },
  { id: 2, action: 'Nuevo inspector registrado', detail: 'María Torres', time: 'Hace 5 h', type: 'info' },
  { id: 3, action: 'Certificado emitido', detail: 'CERT-2026-041', time: 'Ayer', type: 'success' },
  { id: 4, action: 'Observación reportada', detail: 'ASC-02 — Plaza Comercial', time: 'Ayer', type: 'warning' },
  { id: 5, action: 'Inspección programada', detail: 'ASC-03 — Edificio Norte', time: 'Hace 2 días', type: 'info' },
];

export const CHART_COLORS = {
  primary: '#0066CC',
  success: '#0E7C4A',
  warning: '#C97B1A',
  error: '#C0392B',
  purple: '#7C5CBF',
  navy: '#0B1929',
};
