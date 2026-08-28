import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

export const inspeccionesService = {
  misInspecciones: () => apiGet('/inspecciones/mis-inspecciones'),
  crear: (data) => apiPost('/inspecciones/crear', data),
  actualizar: (id, data) => apiPut(`/inspecciones/${id}`, data),
  eliminar: (id) => apiDelete(`/inspecciones/${id}`),
};
