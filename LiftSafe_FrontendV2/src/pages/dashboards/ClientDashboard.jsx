import { Box, Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ElevatorOutlinedIcon from '@mui/icons-material/ElevatorOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import ChartCard from '../../components/dashboard/ChartCard';
import ActivityPanel from '../../components/dashboard/ActivityPanel';
import { ComplianceLineChart } from '../../components/dashboard/DashboardCharts';
import { clientCertTimeline } from '../../data/dashboardData';
import { useAuth } from '../../context/AuthContext';

const myCerts = [
  { id: 'CERT-2026-041', building: 'Torre Central', elevator: 'ASC-01', date: '05/06/2027', status: 'Vigente' },
  { id: 'CERT-2026-038', building: 'Torre Central', elevator: 'ASC-02', date: '02/06/2027', status: 'Vigente' },
];

export default function ClientDashboard() {
  const { user } = useAuth();

  const certItems = myCerts.map((c) => ({
    id: c.id,
    title: `${c.elevator} — ${c.building}`,
    subtitle: `${c.id} · Vence ${c.date}`,
    chip: c.status,
    chipColor: 'success',
    type: 'success',
  }));

  return (
    <Box>
      <WelcomeBanner name={user?.name} role={user?.role} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard title="Mis ascensores" value="2" subtitle="Torre Central" icon={<ElevatorOutlinedIcon />} accent="#7C5CBF" />
        <StatCard title="Certificados vigentes" value="2" subtitle="100% al día" icon={<CheckCircleIcon />} accent="#0E7C4A" trend={0} />
        <StatCard title="Reportes disponibles" value="2" subtitle="Listos para descarga" icon={<DescriptionOutlinedIcon />} accent="#0066CC" />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' }, gap: 2.5 }}>
        <ChartCard
          title="Estado de certificaciones"
          subtitle="Historial de vigencia en tus ascensores"
          action={
            <Button component={Link} to="/dashboard/reportes" size="small" variant="contained" startIcon={<VerifiedOutlinedIcon />}>
              Ver reportes
            </Button>
          }
        >
          <ComplianceLineChart
            data={clientCertTimeline.map((d) => ({ month: d.month, cumplimiento: d.vigentes === 2 ? 100 : 85 }))}
          />
        </ChartCard>
        <ActivityPanel
          title="Certificados de Torre Central"
          subtitle="Documentos vigentes"
          items={certItems}
          accent="#7C5CBF"
          action={<Button component={Link} to="/dashboard/reportes" size="small" variant="outlined">Descargar</Button>}
        />
      </Box>
    </Box>
  );
}
