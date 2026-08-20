import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ElevatorOutlinedIcon from '@mui/icons-material/ElevatorOutlined';
import PageHeader from '../components/PageHeader';
import { buildings } from '../data/mockData';
import { brand } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function Buildings() {
  const { hasAction } = useAuth();
  return (
    <Box>
      <PageHeader title="Edificios" subtitle="Edificios registrados en el sistema" breadcrumbs={[{ label: 'Inicio', path: '/dashboard' }, { label: 'Edificios' }]} />
      {hasAction('createBuilding') && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />}>Agregar edificio</Button>
        </Box>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {buildings.map((b) => (
          <Card key={b.id} sx={{ '&:hover': { borderColor: brand.accent } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>{b.name}</Typography>
                <Chip label={b.id} size="small" variant="outlined" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOnOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">{b.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ElevatorOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2">{b.elevators} ascensores</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PhoneOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2">{b.manager} — {b.phone}</Typography>
              </Box>
              <Button size="small" variant="outlined" fullWidth>Ver detalle</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
