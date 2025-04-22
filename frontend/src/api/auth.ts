import axios from 'axios';
import { AuthRequest, AuthResponse } from '../models/auth';

export const loginRequest = async (authRequest: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${import.meta.env.VITE_API_URL}/auth`,
    authRequest,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return response.data;
};
