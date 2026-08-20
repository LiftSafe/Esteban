import { Box } from '@mui/material';
import logo from '../../../.cursor/projects/empty-window/assets/c__Users_mendi_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_logo-2cf7c112-e143-47c0-b146-2648a580955e.png';

export default function Logo({ width = 180, sx = {} }) {
  return (
    <Box
      component="img"
      src={logo}
      alt="LiftSafe - Sistema de Inspecciones"
      sx={{ width, height: 'auto', display: 'block', mx: 'auto', ...sx }}
    />
  );
}
