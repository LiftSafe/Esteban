import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Alert, InputAdornment, MenuItem } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { brand } from '../theme/colors';


const ROLES = ['Administrador', 'Asesor', 'Coordinador', 'Director Técnico', 'Inspector', 'Cliente'];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    bgcolor: 'rgba(255,255,255,0.05)',
    '& fieldset': { borderColor: 'rgba(43,124,184,0.3)' },
    '&:hover fieldset': { borderColor: brand.accent },
    '&.Mui-focused fieldset': { borderColor: brand.accent },
  },
  '& .MuiInputLabel-root': { color: brand.silverDark },
  '& .MuiInputLabel-root.Mui-focused': { color: brand.accent },
  '& .MuiSelect-icon': { color: brand.accent },
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', document: '', role: 'Cliente', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Completa los campos obligatorios'); return; }
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden'); return; }
    register(form);
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      allowScroll
      title="Crear cuenta"
      subtitle="Completa el formulario para crear tu cuenta"
    >
      <Box component="form" onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <TextField fullWidth size="small" label="Nombre completo" name="name" value={form.name} onChange={handleChange} sx={fieldSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlinedIcon sx={{ color: brand.accent, fontSize: 20 }} /></InputAdornment> }} />
          <TextField fullWidth size="small" label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} sx={fieldSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ color: brand.accent, fontSize: 20 }} /></InputAdornment> }} />
          <TextField fullWidth size="small" select label="Tipo de usuario" name="role" value={form.role} onChange={handleChange} sx={fieldSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><WorkOutlineOutlinedIcon sx={{ color: brand.accent, fontSize: 20 }} /></InputAdornment> }}>
            {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
          <TextField fullWidth size="small" label="Documento" name="document" value={form.document} onChange={handleChange} sx={fieldSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><BadgeOutlinedIcon sx={{ color: brand.accent, fontSize: 20 }} /></InputAdornment> }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <TextField fullWidth size="small" label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} sx={fieldSx}
              InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: brand.accent, fontSize: 20 }} /></InputAdornment> }} />
            <TextField fullWidth size="small" label="Confirmar" name="confirm" type="password" value={form.confirm} onChange={handleChange} sx={fieldSx} />
          </Box>
        </Box>
        <Button
          type="submit" fullWidth variant="contained" size="medium"
          sx={{
            py: 1.2, mt: 2, mb: 1.5,
            bgcolor: brand.accent, '&:hover': { bgcolor: brand.accentHover },
            boxShadow: `0 4px 20px rgba(43,124,184,0.4)`,
          }}
        >
          Crear cuenta
        </Button>
        <Box textAlign="center">
          <Link to="/login" style={{ color: brand.accent, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
}
