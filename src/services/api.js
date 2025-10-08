import axios from 'axios';

// Usa variável de ambiente se disponível, senão usa localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:13002',
});

export default api;
