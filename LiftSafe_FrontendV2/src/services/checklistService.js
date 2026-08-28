import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

export const checklistService = {
  calificar: (data) => apiPost('/checklist', data),
  listarPorInspeccion: (id) => apiGet(`/checklist/inspeccion/${id}`),
  obtenerCategorias: () => apiGet('/checklist/categorias'),
  obtenerCumplimiento: (id) => apiGet(`/checklist/cumplimiento/${id}`),
  actualizar: (idDetalle, data) => apiPut(`/checklist/${idDetalle}`, data),
  eliminar: (idDetalle) => apiDelete(`/checklist/${idDetalle}`),
};
