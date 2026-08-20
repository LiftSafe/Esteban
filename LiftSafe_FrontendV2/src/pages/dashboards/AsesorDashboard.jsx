import { Box, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import StatCard from '../../components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import ChartCard from '../../components/dashboard/ChartCard';
import { SalesPipelineChart } from '../../components/dashboard/DashboardCharts';
import { salesPipeline } from '../../data/dashboardData';
import { useAuth } from '../../context/AuthContext';

const clientes = [
  { id: 11, nombre: 'Torres Altas PH', ciudad: 'Bogotá', inspeccionesPendientes: 1, estado: 'Activo' },
  { id: 12, nombre: 'Ascensores Plus SAS', ciudad: 'Bogotá', inspeccionesPendientes: 0, estado: 'Activo' },
  { id: 20, nombre: 'Torres del Valle PH', ciudad: 'Barranquilla', inspeccionesPendientes: 2, estado: 'Seguimiento' },
  { id: 21, nombre: 'Edificio Horizonte', ciudad: 'Medellín', inspeccionesPendientes: 0, estado: 'Activo' },
  { id: 22, nombre: 'Conjunto Los Pinos', ciudad: 'Cali', inspeccionesPendientes: 3, estado: 'Urgente' },
];

export default function AsesorDashboard() {
  const { user } = useAuth();

  return (
    <Box>
      <WelcomeBanner name={user?.name} role={user?.role} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard title="Clientes activos" value="24" subtitle="En cartera comercial" icon={<BusinessOutlinedIcon />} accent="#E65100" trend={6} />
        <StatCard title="Contratos renovados" value="5" subtitle="Este mes" icon={<TrendingUpIcon />} accent="#0E7C4A" trend={25} />
        <StatCard title="Por vencer (30 días)" value="12" subtitle="Requieren seguimiento" icon={<EventOutlinedIcon />} accent="#C97B1A" trend={-3} />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.4fr' }, gap: 2.5 }}>
        <ChartCard title="Pipeline comercial" subtitle="Clientes por etapa del proceso">
          <SalesPipelineChart data={salesPipeline} />
        </ChartCard>

        <Box
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: '#fff',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Box component="span" sx={{ fontWeight: 700, fontSize: 15, color: '#0B1929', display: 'block' }}>Seguimiento a clientes</Box>
              <Box component="span" sx={{ fontSize: 12, color: 'text.secondary' }}>Estado de inspecciones pendientes</Box>
            </Box>
            <Button size="small" variant="outlined">Exportar</Button>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Cliente</strong></TableCell>
                  <TableCell><strong>Ciudad</strong></TableCell>
                  <TableCell align="center"><strong>Pendientes</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.map((cli) => (
                  <TableRow key={cli.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{cli.nombre}</TableCell>
                    <TableCell>{cli.ciudad}</TableCell>
                    <TableCell align="center">{cli.inspeccionesPendientes}</TableCell>
                    <TableCell>
                      <Chip
                        label={cli.estado}
                        size="small"
                        color={cli.estado === 'Urgente' ? 'error' : cli.estado === 'Seguimiento' ? 'warning' : 'success'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
