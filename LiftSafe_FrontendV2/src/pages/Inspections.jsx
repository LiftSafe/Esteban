import { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Button, Chip, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Typography, Divider, IconButton, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../services/apiClient';

// ============================================
// SERVICIOS
// ============================================
const inspeccionService = {
  listar: () => apiClient.get('/inspecciones/mis-inspecciones'),
  obtener: (id) => apiClient.get(`/inspecciones/${id}`),
  crear: (data) => apiClient.post('/inspecciones/crear', data),
  actualizarEstado: (id, estado) => apiClient.put(`/inspecciones/${id}/estado?estado=${estado}`)
};

const checklistService = {
  listarPorInspeccion: (id) => apiClient.get(`/checklist/inspeccion/${id}`)
};

const firmaService = {
  firmarInspector: (id, firmaData) => apiClient.put(`/inspecciones/${id}/firma-inspector`, firmaData),
  firmarCliente: (id, firmaData) => apiClient.put(`/inspecciones/${id}/firma-cliente`, firmaData),
  verificarFirmas: (id) => apiClient.get(`/inspecciones/${id}/firmas`)
};

const fotografiaService = {
  subir: (id_informe, file, descripcion) => {
    const formData = new FormData();
    formData.append('id_informe', id_informe);
    formData.append('file', file);
    if (descripcion) formData.append('descripcion', descripcion);
    return apiClient.post('/fotografias', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  listarPorInforme: (id) => apiClient.get(`/fotografias/informe/${id}`),
  eliminar: (id) => apiClient.delete(`/fotografias/${id}`)
};

const statusColor = {
  'Programada': 'warning',
  'En Progreso': 'info',
  'Completada': 'success',
  'Finalizada': 'success',
  'Aprobada': 'success',
  'Cancelada': 'error',
  'Borrador': 'default'
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function Inspections() {
  const { user } = useAuth();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dialog de creación
  const [openCreate, setOpenCreate] = useState(false);
  const [newInspection, setNewInspection] = useState({
    id_ascensor: '',
    id_inspector: '',
    fecha_programada: '',
    observaciones_generales: ''
  });
  
  // Dialog de detalle
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [firmas, setFirmas] = useState({ 
    firma_inspector: false, 
    firma_cliente: false,
    ambas_firmas: false 
  });
  const [fotos, setFotos] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fotoDescripcion, setFotoDescripcion] = useState('');

  // ============================================
  // FUNCIÓN: Cargar inspecciones
  // ============================================
  const cargarInspecciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inspeccionService.listar();
      setInspections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando inspecciones:', err);
      setError('Error al cargar las inspecciones. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // Cargar inspecciones al montar
  useEffect(() => {
    const fetchData = async () => {
      await cargarInspecciones();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================
  // FUNCIÓN: Abrir detalle
  // ============================================
  const abrirDetalle = async (row) => {
    setSelected(row);
    setDetailOpen(true);
    setLoadingDetail(true);
    setChecklist([]);
    setFotos([]);
    setFirmas({ firma_inspector: false, firma_cliente: false, ambas_firmas: false });
    
    try {
      // Obtener detalle de la inspección
      const detalle = await inspeccionService.obtener(row.id_inspeccion || row.id);
      setSelected(detalle);
      
      // Obtener checklist
      try {
        const checklistData = await checklistService.listarPorInspeccion(row.id_inspeccion || row.id);
        setChecklist(Array.isArray(checklistData) ? checklistData : []);
      } catch {
        setChecklist([]);
      }
      
      // Obtener estado de firmas
      try {
        const firmasData = await firmaService.verificarFirmas(row.id_inspeccion || row.id);
        setFirmas(firmasData);
      } catch {
        setFirmas({ firma_inspector: false, firma_cliente: false, ambas_firmas: false });
      }
      
      // Obtener fotos (si tiene id_informe)
      if (detalle.id_informe) {
        try {
          const fotosData = await fotografiaService.listarPorInforme(detalle.id_informe);
          setFotos(Array.isArray(fotosData) ? fotosData : []);
        } catch {
          setFotos([]);
        }
      }
      
    } catch (err) {
      console.error('Error cargando detalle:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  // ============================================
  // FUNCIÓN: Crear inspección
  // ============================================
  const crearInspeccion = async () => {
    try {
      await inspeccionService.crear(newInspection);
      setOpenCreate(false);
      setNewInspection({
        id_ascensor: '',
        id_inspector: '',
        fecha_programada: '',
        observaciones_generales: ''
      });
      await cargarInspecciones();
      alert('✅ Inspección creada exitosamente');
    } catch (err) {
      console.error('Error creando inspección:', err);
      alert('❌ Error al crear la inspección');
    }
  };

  // ============================================
  // FUNCIÓN: Subir foto
  // ============================================
  const subirFoto = async () => {
    if (!selectedFile) {
      alert('Selecciona una foto primero');
      return;
    }
    if (!selected?.id_informe) {
      alert('Esta inspección no tiene un informe asociado');
      return;
    }
    try {
      await fotografiaService.subir(selected.id_informe, selectedFile, fotoDescripcion);
      setSelectedFile(null);
      setFotoDescripcion('');
      alert('✅ Foto subida exitosamente');
      
      // Recargar fotos
      const fotosData = await fotografiaService.listarPorInforme(selected.id_informe);
      setFotos(Array.isArray(fotosData) ? fotosData : []);
    } catch (err) {
      console.error('Error subiendo foto:', err);
      alert('❌ Error al subir la foto');
    }
  };

  // ============================================
  // RENDER
  // ============================================
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Inspecciones"
        subtitle={user?.rol === 'Administrador' ? 'Gestión global de inspecciones' : 'Tus inspecciones asignadas'}
        breadcrumbs={[{ label: 'Inicio', path: '/dashboard' }, { label: 'Inspecciones' }]}
      />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {user?.rol !== 'Cliente' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCreate(true)}>
            Nueva inspección
          </Button>
        </Box>
      )}

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Edificio/Ascensor</strong></TableCell>
                  <TableCell><strong>Tipo</strong></TableCell>
                  <TableCell><strong>Inspector</strong></TableCell>
                  <TableCell><strong>Fecha</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Firmas</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!inspections || inspections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      No hay inspecciones registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  inspections.map((row) => (
                    <TableRow 
                      key={row.id_inspeccion || row.id} 
                      hover 
                      sx={{ cursor: 'pointer' }} 
                      onClick={() => abrirDetalle(row)}
                    >
                      <TableCell>
                        <Typography fontWeight={600} color="primary.main">
                          {row.id_inspeccion || row.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.codigo_ascensor || row.elevator || 'N/A'}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.marca || ''}</Typography>
                      </TableCell>
                      <TableCell>{row.tipo_servicio || row.type || 'Periódica'}</TableCell>
                      <TableCell>{row.nombre_inspector || row.inspector || 'N/A'}</TableCell>
                      <TableCell>{row.fecha_inicio ? new Date(row.fecha_inicio).toLocaleDateString() : row.date || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.estado || row.status || 'Pendiente'} 
                          color={statusColor[row.estado || row.status] || 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        {row.firma_inspector && row.firma_cliente ? '✅' : 
                         row.firma_inspector ? '⚠️ Inspector' : 
                         row.firma_cliente ? '⚠️ Cliente' : '❌'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ========================================== */}
      {/* DIALOG DE NUEVA INSPECCIÓN */}
      {/* ========================================== */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>
          Nueva inspección
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => setOpenCreate(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField 
              label="ID del Ascensor" 
              fullWidth 
              value={newInspection.id_ascensor}
              onChange={(e) => setNewInspection({...newInspection, id_ascensor: e.target.value})}
              type="number"
              required
            />
            <TextField 
              label="ID del Inspector" 
              fullWidth 
              value={newInspection.id_inspector}
              onChange={(e) => setNewInspection({...newInspection, id_inspector: e.target.value})}
              type="number"
              required
            />
            <TextField 
              label="Fecha programada" 
              type="date" 
              fullWidth 
              InputLabelProps={{ shrink: true }}
              value={newInspection.fecha_programada}
              onChange={(e) => setNewInspection({...newInspection, fecha_programada: e.target.value})}
              required
            />
            <TextField 
              label="Observaciones iniciales" 
              multiline 
              rows={3} 
              fullWidth 
              value={newInspection.observaciones_generales}
              onChange={(e) => setNewInspection({...newInspection, observaciones_generales: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancelar</Button>
          <Button variant="contained" onClick={crearInspeccion}>
            Crear inspección
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========================================== */}
      {/* DIALOG DE DETALLE */}
      {/* ========================================== */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography fontWeight={700}>
                Inspección #{selected?.id_inspeccion || selected?.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selected?.codigo_ascensor || selected?.elevator || 'N/A'} · 
                {selected?.tipo_servicio || selected?.type || 'Periódica'} · 
                {selected?.nombre_inspector || selected?.inspector || 'N/A'}
              </Typography>
            </Box>
            <Chip 
              label={selected?.estado || selected?.status || 'Pendiente'} 
              color={statusColor[selected?.estado || selected?.status] || 'default'} 
            />
          </Box>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => setDetailOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {loadingDetail ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Información general */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Fecha inicio</Typography>
                  <Typography variant="body2">
                    {selected?.fecha_inicio ? new Date(selected.fecha_inicio).toLocaleString() : 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Fecha fin</Typography>
                  <Typography variant="body2">
                    {selected?.fecha_fin ? new Date(selected.fecha_fin).toLocaleString() : 'Pendiente'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Duración</Typography>
                  <Typography variant="body2">{selected?.duracion_minutos || 'N/A'} min</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Observaciones</Typography>
                  <Typography variant="body2">{selected?.observaciones_generales || 'Sin observaciones'}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* FIRMAS */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom color="primary.dark">
                📝 Firmas Digitales
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Inspector</Typography>
                  <Typography variant="body2" color={firmas?.firma_inspector ? 'success.main' : 'error.main'}>
                    {firmas?.firma_inspector ? '✅ Firmado' : '❌ Pendiente'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Cliente</Typography>
                  <Typography variant="body2" color={firmas?.firma_cliente ? 'success.main' : 'error.main'}>
                    {firmas?.firma_cliente ? '✅ Firmado' : '❌ Pendiente'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Ambas firmas</Typography>
                  <Typography variant="body2" color={firmas?.ambas_firmas ? 'success.main' : 'warning.main'}>
                    {firmas?.ambas_firmas ? '✅ Completas' : '⚠️ Incompletas'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* CHECKLIST */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom color="primary.dark">
                ✅ Checklist de Inspección
              </Typography>
              {!checklist || checklist.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No hay items de checklist registrados para esta inspección
                </Typography>
              ) : (
                <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                  {checklist.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                      <Chip 
                        label={item.resultado || 'Pendiente'} 
                        size="small" 
                        color={item.resultado === 'Cumple' ? 'success' : 
                               item.resultado === 'No Cumple' ? 'error' : 
                               item.resultado === 'No Aplica' ? 'default' : 'warning'}
                      />
                      <Typography variant="body2">{item.descripcion || `Item ${item.id_item}`}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Divider sx={{ mb: 2 }} />

              {/* FOTOGRAFÍAS */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom color="primary.dark">
                📸 Fotografías ({fotos.length})
              </Typography>
              
              {/* Subir foto */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="foto-upload"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <label htmlFor="foto-upload">
                  <Button variant="outlined" component="span" startIcon={<PhotoCameraIcon />}>
                    Seleccionar foto
                  </Button>
                </label>
                {selectedFile && <Typography variant="body2">{selectedFile.name}</Typography>}
                <TextField 
                  label="Descripción" 
                  size="small" 
                  value={fotoDescripcion}
                  onChange={(e) => setFotoDescripcion(e.target.value)}
                  sx={{ flex: 1, minWidth: 150 }}
                />
                <Button 
                  variant="contained" 
                  onClick={subirFoto} 
                  disabled={!selectedFile}
                >
                  Subir
                </Button>
              </Box>

              {/* Lista de fotos */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {!fotos || fotos.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No hay fotos</Typography>
                ) : (
                  fotos.map((foto) => (
                    <Box key={foto.id_foto} sx={{ 
                      border: '1px solid #ddd', 
                      borderRadius: 1, 
                      p: 1, 
                      width: 120,
                      textAlign: 'center'
                    }}>
                      <img 
                        src={`http://localhost:8000/${foto.ruta_archivo}`} 
                        alt={foto.descripcion || 'Foto'} 
                        style={{ width: '100%', height: 80, objectFit: 'cover' }}
                        onError={(e) => { e.target.src = ''; }}
                      />
                      <Typography variant="caption" display="block" noWrap>
                        {foto.descripcion || 'Sin descripción'}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDetailOpen(false)}>Cerrar</Button>
          <Button variant="outlined" onClick={() => alert('Generando reporte...')}>
            Generar reporte
          </Button>
          <Button variant="contained" onClick={() => alert('Aprobando inspección...')}>
            Aprobar inspección
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}