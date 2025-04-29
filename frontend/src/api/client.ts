import axios from 'axios';
import { Client } from '../models/client';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export async function getClientProfile(token: string): Promise<Client> {
  const response = await API.get('/clients/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
