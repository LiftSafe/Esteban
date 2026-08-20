import { Box, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../components/PageHeader';
import { elevators, statusColor } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Elevators() {
  const { user, hasAction } = useAuth();
  const isTech = user?.role === 'Técnico de mantenimiento';
  const rows = isTech ? elevators.filter((e) => e.status !== 'Operativo') : elevators;

  return (
    <Box>
      <PageHeader
        title="Ascensores"
        subtitle={isTech ? 'Equipos bajo tu responsabilidad' : 'Inventario y estado operativo'}
        breadcrumbs={[{ label: 'Inicio', path: '/dashboard' }, { label: 'Ascensores' }]}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <TextField size="small" placeholder="Buscar ascensor..." InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} sx={{ minWidth: 280 }} />
        {hasAction('createElevator') && <Button variant="contained" startIcon={<AddIcon />}>Registrar ascensor</Button>}
      </Box>
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Edificio</strong></TableCell>
                  <TableCell><strong>Marca / Modelo</strong></TableCell>
                  <TableCell><strong>Pisos</strong></TableCell>
                  <TableCell><strong>Capacidad</strong></TableCell>
                  <TableCell><strong>Última inspección</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Certificado</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} hover sx={{ cursor: 'pointer' }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.building}</TableCell>
                    <TableCell>{row.brand} {row.model}</TableCell>
                    <TableCell>{row.floors}</TableCell>
                    <TableCell>{row.capacity}</TableCell>
                    <TableCell>{row.lastInspection}</TableCell>
                    <TableCell><Chip label={row.status} color={statusColor[row.status] || 'default'} size="small" /></TableCell>
                    <TableCell>{row.certificate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
