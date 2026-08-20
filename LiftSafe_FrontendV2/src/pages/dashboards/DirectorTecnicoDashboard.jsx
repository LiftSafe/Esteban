import { Box, Button, Chip, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import StatCard from '../../components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import ChartCard from '../../components/dashboard/ChartCard';
import ActivityPanel from '../../components/dashboard/ActivityPanel';
import { ComplianceLineChart, StatusDonutChart } from '../../components/dashboard/DashboardCharts';
import { complianceTrend, inspectionStatusData } from '../../data/dashboardData';
import { useAuth } from '../../context/AuthContext';

const informesPendientes = [
  { id: 1, ascensor: 'ASC-003', cliente: 'Edificio Central', fecha: '10/02/2025', prioridad: 'Alta' },
  { id: 2, ascensor: 'ASC-007', cliente: 'Torres del Norte', fecha: '12/02/2025', prioridad: 'Media' },
  { id: 3, ascensor: 'ASC-012', cliente: 'Centro Médico', fecha: '14/02/2025', prioridad: 'Alta' },
];

const observacionesCriticas = [
  { id: 4, descripcion: 'Fuga de aceite en grupo hidráulico — pendiente corrección', riesgo: 'Alto', edificio: 'Plaza Comercial' },
  { id: 5, descripcion: 'Desgaste en cables de tracción superior al límite', riesgo: 'Alto', edificio: 'Edificio Norte' },
];

export default function DirectorTecnicoDashboard() {
  const { user } = useAuth();

  const reportItems = informesPendientes.map((inf) => ({
    id: inf.id,
    title: `${inf.ascensor} — ${inf.cliente}`,
    subtitle: `Fecha: ${inf.fecha}`,
    chip: inf.prioridad,
    chipColor: inf.prioridad === 'Alta' ? 'error' : 'warning',
    actionBtn: <Button size="small" variant="contained" sx={{ flexShrink: 0 }}>Aprobar</Button>,
    type: inf.prioridad === 'Alta' ? 'error' : 'warning',
  }));

  const totalReports = inspectionStatusData.reduce((sum, i) => sum + i.value, 0);

  return (
    <Box>
      <WelcomeBanner name={user?.name} role={user?.role} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard title="Informes pendientes" value="3" subtitle="Requieren firma" icon={<DescriptionOutlinedIcon />} accent="#7C5CBF" />
        <StatCard title="Observaciones críticas" value="2" subtitle="Sin resolver" icon={<WarningAmberOutlinedIcon />} accent="#C0392B" trend={-8} />
        <StatCard title="Aprobadas este mes" value="18" subtitle="Inspecciones validadas" icon={<VerifiedOutlinedIcon />} accent="#0E7C4A" trend={12} />
        <StatCard title="Cumplimiento normativo" value="96%" subtitle="Indicador de calidad" icon={<RuleOutlinedIcon />} accent="#0066CC" trend={4} />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' }, gap: 2.5, mb: 2.5 }}>
        <ChartCard title="Tendencia de cumplimiento" subtitle="Evolución mensual del indicador de calidad">
          <ComplianceLineChart data={complianceTrend} />
        </ChartCard>
        <ChartCard title="Resultado de inspecciones" subtitle="Distribución del mes actual">
          <StatusDonutChart data={inspectionStatusData} height={220} centerValue={totalReports} centerLabel="Total" />
        </ChartCard>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2.5 }}>
        <ActivityPanel
          title="Informes pendientes de aprobación"
          subtitle="Requieren revisión técnica"
          items={reportItems}
          accent="#7C5CBF"
        />

        <Box
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderLeft: '4px solid #C0392B',
            bgcolor: '#fff',
            p: 2.5,
          }}
        >
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Observaciones críticas sin resolver
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
            Riesgos que requieren atención inmediata
          </Typography>
          {observacionesCriticas.map((obs) => (
            <Box
              key={obs.id}
              sx={{
                mb: 1.5,
                p: 2,
                borderRadius: 2,
                bgcolor: '#C0392B08',
                border: '1px solid #C0392B22',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                <Typography variant="body2" fontWeight={600}>{obs.edificio}</Typography>
                <Chip label={obs.riesgo} color="error" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">{obs.descripcion}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
