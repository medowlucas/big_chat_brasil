import axios from 'axios';
import {
  SendMessageRequest,
  SendMessageResponse,
  MessageResponse
} from '../models/messsage';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getMessages = async (conversationId: string): Promise<MessageResponse[]> => {
  const { data } = await API.get(`/conversations/${conversationId}/messages`);
  return data;
};

export const sendMessage = async (payload: SendMessageRequest): Promise<SendMessageResponse> => {
  const { data } = await API.post('/messages', payload);
  return data;
};
