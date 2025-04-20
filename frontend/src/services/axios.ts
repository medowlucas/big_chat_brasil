import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
  },
  (error) => {
    console.error('Erro na requisição:', error)
    return Promise.reject(error)
  }
)

// Interceptador de response (opcional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na resposta da API:', error)
    return Promise.reject(error)
  }
)
