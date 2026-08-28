import { API_BASE_URL } from '../config/api';

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data.detail === 'string'
      ? data.detail
      : data.message || 'Error en la solicitud';
    throw new Error(message);
  }
  return data;
}

function getToken() {
  return sessionStorage.getItem('liftsafe_token') || sessionStorage.getItem('token');
}

function getHeaders(contentType = true) {
  const token = getToken();
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (contentType) headers['Content-Type'] = 'application/json';
  return headers;
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: getHeaders(false) });
  return parseResponse(response);
}

export async function apiPost(path, body) {
  const isFormData = body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: getHeaders(!isFormData),
    body: isFormData ? body : JSON.stringify(body),
  });
  return parseResponse(response);
}

export async function apiPut(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return parseResponse(response);
}

export async function apiDelete(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return parseResponse(response);
}
