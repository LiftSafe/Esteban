import { Box, Button } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import ChartCard from '../../components/dashboard/ChartCard';
import ActivityPanel from '../../components/dashboard/ActivityPanel';
import { InspectionTrendChart } from '../../components/dashboard/DashboardCharts';
import { monthlyInspections } from '../../data/dashboardData';
import { useAuth } from '../../context/AuthContext';

const pendingAssignments = [
  { id: 13, building: 'Torres del Río', elevator: 'ASC-013', desiredDate: '20/02/2025', priority: 'Alta' },
  { id: 14, building: 'Torres del Río', elevator: 'ASC-014', desiredDate: '25/02/2025', priority: 'Media' },
  { id: 15, building: 'Centro Empresarial', elevator: 'ASC-008', desiredDate: '28/02/2025', priority: 'Alta' },
];

const reportsToReview = [
  { id: 5, building: 'Edificio Lago Azul', elevator: 'ASC-005', inspector: 'Daniela Torres', status: 'En revisión' },
  { id: 6, building: 'Torre Central', elevator: 'ASC-01', inspector: 'Carlos Ruiz', status: 'Pendiente firma' },
];

export default function CoordinadorDashboard() {
  const { user } = useAuth();

  const assignmentItems = pendingAssignments.map((item) => ({
    id: item.id,
    title: `${item.elevator} — ${item.building}`,
    subtitle: `Fecha deseada: ${item.desiredDate}`,
    chip: item.priority,
    chipColor: item.priority === 'Alta' ? 'error' : 'warning',
    actionBtn: <Button size="small" variant="contained" sx={{ ml: 1, flexShrink: 0 }}>Asignar</Button>,
    type: item.priority === 'Alta' ? 'error' : 'warning',
  }));

  const reviewItems = reportsToReview.map((rep) => ({
    id: rep.id,
    title: `${rep.elevator} — ${rep.building}`,
    subtitle: `Inspector: ${rep.inspector} · ${rep.status}`,
    actionBtn: <Button size="small" variant="outlined" sx={{ flexShrink: 0 }}>Revisar</Button>,
    type: 'info',
  }));

  return (
    <Box>
      <WelcomeBanner name={user?.name} role={user?.role} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard title="Por asignar" value="4" subtitle="Requieren inspector" icon={<AssignmentOutlinedIcon />} accent="#E65100" trend={-2} />
        <StatCard title="Programadas" value="7" subtitle="Esta semana" icon={<ScheduleOutlinedIcon />} accent="#2C3E50" trend={10} />
        <StatCard title="Por revisar" value="3" subtitle="Informes pendientes" icon={<RateReviewOutlinedIcon />} accent="#0066CC" />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' }, gap: 2.5, mb: 2.5 }}>
        <ChartCard
          title="Carga de inspecciones"
          subtitle="Evolución mensual del equipo"
          action={<Button component={Link} to="/dashboard/inspecciones" size="small" variant="outlined">Gestionar</Button>}
        >
          <InspectionTrendChart data={monthlyInspections} height={220} />
        </ChartCard>
        <ActivityPanel
          title="Informes por revisar"
          subtitle="Requieren tu aprobación"
          items={reviewItems}
          accent="#0066CC"
        />
      </Box>

      <ActivityPanel
        title="Inspecciones pendientes de asignación"
        subtitle="Ordenadas por prioridad"
        items={assignmentItems}
        accent="#E65100"
        action={<Button component={Link} to="/dashboard/inspecciones" size="small" variant="outlined">Ver todas</Button>}
      />
    </Box>
  );
}
