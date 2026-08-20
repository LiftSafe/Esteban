import { Box, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../components/PageHeader';
import { users, statusColor } from '../data/mockData';

export default function UsersPage() {
  return (
    <Box>
      <PageHeader title="Usuarios" subtitle="Inspectores y administradores del sistema LiftSafe" breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Usuarios' }]} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" startIcon={<AddIcon />}>Nuevo usuario</Button>
      </Box>
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Usuario</strong></TableCell>
                  <TableCell><strong>Correo</strong></TableCell>
                  <TableCell><strong>Documento</strong></TableCell>
                  <TableCell><strong>Rol</strong></TableCell>
                  <TableCell><strong>Inspecciones</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>{u.name.charAt(0)}</Avatar>
                        {u.name}
                      </Box>
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.document}</TableCell>
                    <TableCell><Chip label={u.role} size="small" color={u.role === 'Administrador' ? 'primary' : 'default'} variant="outlined" /></TableCell>
                    <TableCell>{u.inspections}</TableCell>
                    <TableCell><Chip label={u.status} color={statusColor[u.status]} size="small" /></TableCell>
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
