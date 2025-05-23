import { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../api/messsage';
import {
  MessageResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '../models/messsage';
import { toast } from 'sonner';

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages(conversationId);
      setMessages(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      setError(message);
      toast.error(`Erro ao buscar mensagens: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (
    payload: Omit<SendMessageRequest, 'conversationId'>
  ): Promise<SendMessageResponse | null> => {
    try {
      const fullPayload = { ...payload, conversationId };
      const response = await sendMessage(fullPayload);

      const newMessage: MessageResponse = {
        id: response.id,
        conversationId: conversationId,
        content: payload.content,
        sentBy: {
          id: localStorage.getItem('clientId') || '',
          type: 'user',
        },
        timestamp: response.timestamp,
        priority: payload.priority,
        status: response.status,
        cost: response.cost,
      };

      setMessages(prev => [...prev, newMessage]);

      toast.success('Mensagem enviada com sucesso!');
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      setError(message);
      toast.error(`Erro ao enviar mensagem: ${message}`);
      return null;
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  return {
    messages,
    setMessages,
    loading,
    error,
    sendMessage: handleSendMessage,
    refresh: fetchMessages,
  };
};
