import { Box, Button, Chip, LinearProgress, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import ChartCard from '../../components/dashboard/ChartCard';
import { StatusDonutChart, WeeklyActivityChart } from '../../components/dashboard/DashboardCharts';
import { inspections, statusColor } from '../../data/mockData';
import { weeklyActivity } from '../../data/dashboardData';
import { useAuth } from '../../context/AuthContext';

export default function InspectorDashboard() {
  const { user } = useAuth();
  const mine = inspections.filter((i) => i.inspector === user?.name || user?.role === 'Administrador');
  const myList = mine.length ? mine : inspections.filter((i) => i.inspector === 'Carlos Ruiz');

  const completed = myList.filter((i) => i.status === 'Aprobada').length;
  const pending = myList.filter((i) => i.status === 'Pendiente').length;
  const observations = myList.filter((i) => i.status === 'Observaciones').length;

  const statusData = [
    { name: 'Aprobadas', value: completed, color: '#0E7C4A' },
    { name: 'Pendientes', value: pending, color: '#C97B1A' },
    { name: 'Observaciones', value: observations, color: '#C0392B' },
  ].filter((s) => s.value > 0);

  const avgProgress = Math.round(myList.reduce((sum, i) => sum + i.progress, 0) / myList.length);

  return (
    <Box>
      <WelcomeBanner name={user?.name} role={user?.role} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard title="Mis inspecciones" value={String(myList.length)} subtitle="Asignadas a ti" icon={<AssignmentIcon />} accent="#0066CC" />
        <StatCard title="Completadas" value={String(completed)} subtitle="Aprobadas este mes" icon={<CheckCircleIcon />} accent="#0E7C4A" trend={15} />
        <StatCard title="Pendientes" value={String(pending)} subtitle="Por finalizar" icon={<ScheduleIcon />} accent="#C97B1A" />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
        <Button component={Link} to="/dashboard/inspecciones" variant="contained" startIcon={<AddIcon />} sx={{ boxShadow: '0 4px 14px rgba(0,102,204,0.3)' }}>
          Registrar inspección
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.2fr' }, gap: 2.5, mb: 2.5 }}>
        <ChartCard title="Mi rendimiento semanal" subtitle="Programadas vs. completadas">
          <WeeklyActivityChart data={weeklyActivity} />
        </ChartCard>
        <ChartCard title="Estado de mis trabajos" subtitle={`Progreso promedio: ${avgProgress}%`}>
          <StatusDonutChart data={statusData} height={200} centerValue={`${avgProgress}%`} centerLabel="Avance" />
        </ChartCard>
      </Box>

      <Box
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderLeft: '4px solid #0E7C4A',
          bgcolor: '#fff',
          p: 2.5,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>Mis trabajos asignados</Typography>
        {myList.map((row) => (
          <Box key={row.id} sx={{ py: 1.75, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { border: 0 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" fontWeight={600}>{row.id} — {row.building}</Typography>
              <Chip label={row.status} color={statusColor[row.status]} size="small" />
            </Box>
            <Typography variant="caption" color="text.secondary">{row.elevator} · {row.date} · {row.progress}% completado</Typography>
            <LinearProgress
              variant="determinate"
              value={row.progress}
              sx={{
                mt: 1.25,
                height: 6,
                borderRadius: 3,
                bgcolor: '#E8EDF2',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  bgcolor: row.progress === 100 ? '#0E7C4A' : '#0066CC',
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
