import axios from 'axios';
import { ConversationResponse } from '../models/conversation';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getConversations = async (clientId: string): Promise<ConversationResponse[]> => {
  const response = await API.get(`/conversations/${clientId}`);
  return Array.isArray(response.data) ? response.data : [];
};

export const createConversation = async (clientId: string): Promise<void> => {
  await API.post('/conversations/new', { clientId });
};
