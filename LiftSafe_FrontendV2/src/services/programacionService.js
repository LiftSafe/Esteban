import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

export const programacionService = {
  asignar: (data) => apiPost('/programacion', data),
  listar: () => apiGet('/programacion'),
  reasignar: (id, data) => apiPut(`/programacion/${id}/reasignar`, data),
  cancelar: (id, motivo) => apiPut(`/programacion/${id}/cancelar?motivo=${encodeURIComponent(motivo)}`),
  eliminar: (id) => apiDelete(`/programacion/${id}`),
};
