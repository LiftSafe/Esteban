import { Box, Card, CardContent, Typography, Button, Chip, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { inspections } from '../data/mockData';

const clientCerts = inspections.filter((i) => i.building === 'Torre Central' && i.status === 'Aprobada');

export default function Reports() {
  const { user } = useAuth();
  const isClient = user?.role === 'Cliente';
  const docs = isClient ? clientCerts : inspections.filter((i) => i.status === 'Aprobada');

  return (
    <Box>
      <PageHeader
        title={isClient ? 'Mis certificados' : 'Reportes y Certificados'}
        subtitle={isClient ? 'Consulta y descarga los certificados de tus ascensores' : 'Informes técnicos de inspección y certificados emitidos'}
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Reportes' }]}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: isClient ? '1fr' : '1fr 2fr' }, gap: 3 }}>
        {!isClient && (
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Resumen</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {[
                  { label: 'Certificados emitidos', value: '18' },
                  { label: 'Reportes pendientes', value: '3' },
                  { label: 'Por vencer (30 días)', value: '5' },
                ].map((s) => (
                  <Box key={s.label} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                    <Typography variant="h4" fontWeight={700} color="primary.main">{s.value}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {isClient ? 'Certificados de Torre Central' : 'Documentos recientes'}
            </Typography>
            <List>
              {docs.map((insp) => (
                <ListItem key={insp.id} divider sx={{ px: 0, flexWrap: 'wrap', gap: 1 }}>
                  <ListItemIcon><PictureAsPdfOutlinedIcon color="error" /></ListItemIcon>
                  <ListItemText
                    primary={`Certificado ${insp.id}`}
                    secondary={`${insp.building} — ${insp.elevator} — ${insp.date}`}
                  />
                  <ListItemSecondaryAction sx={{ position: 'relative', transform: 'none', display: 'flex', gap: 0.5 }}>
                    <Chip label="Vigente" color="success" size="small" />
                    <Button size="small" startIcon={<VisibilityOutlinedIcon />}>Ver</Button>
                    <Button size="small" startIcon={<DownloadOutlinedIcon />}>PDF</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
