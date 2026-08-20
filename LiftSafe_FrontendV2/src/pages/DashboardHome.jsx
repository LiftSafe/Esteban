import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import AsesorDashboard from './dashboards/AsesorDashboard';
import CoordinadorDashboard from './dashboards/CoordinadorDashboard';
import DirectorTecnicoDashboard from './dashboards/DirectorTecnicoDashboard';
import InspectorDashboard from './dashboards/InspectorDashboard';
import ClientDashboard from './dashboards/ClientDashboard';

const DashboardHome = () => {
  const { user } = useAuth();
  if (!user) return <div>Cargando...</div>;

  switch (user.role) {
    case 'Administrador':
      return <AdminDashboard />;
    case 'Asesor':
      return <AsesorDashboard />;
    case 'Coordinador':
      return <CoordinadorDashboard />;
    case 'Director Técnico':
      return <DirectorTecnicoDashboard />;
    case 'Inspector':
      return <InspectorDashboard />;
    case 'Cliente':
      return <ClientDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default DashboardHome;