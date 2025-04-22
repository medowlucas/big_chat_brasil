import { useState, useEffect } from 'react';
import { ConversationResponse } from '../models/conversation';
import { getConversations, createConversation as createConversationApi } from '../api/conversation';
import { toast } from 'sonner';

export const useConversations = (token: string | null) => {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = async () => {
    if (!token) {
      setError('Token não encontrado');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data: ConversationResponse[] = await getConversations(token);
      setConversations(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      setError(message);
      toast.error(`Erro ao buscar conversas: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (clientId: string) => {
    try {
      await createConversationApi(clientId);
      toast.success('Conversa criada com sucesso!');
      await fetchConversations();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      toast.error(`Erro ao criar conversa: ${message}`);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [token]);

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    createConversation,
  };
};
