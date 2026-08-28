import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

export const ascensorService = {
  listar: () => apiGet('/ascensores/listado'),
  crear: (data) => apiPost('/ascensores/', data),
  actualizar: (id, data) => apiPut(`/ascensores/${id}`, data),
  eliminar: (id) => apiDelete(`/ascensores/${id}`),
  listarEdificios: () => apiGet('/ascensores/edificios'),
  misAscensores: () => apiGet('/ascensores/mis-ascensores'),
};
