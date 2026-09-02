import { useCallback, useState } from 'react';
import { sendChatMessage } from '../services/chatApi';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    const message = content.trim();
    if (!message || isSending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
    };
    setMessages((current) => [...current, userMessage]);
    setError(null);
    setIsSending(true);

    try {
      const data = await sendChatMessage({ message, conversationId });
      if (data.conversationId) setConversationId(data.conversationId);
      setMessages((current) => [
        ...current,
        {
          id: data.messageId || `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.response,
        },
      ]);
    } catch {
      setError('Unable to connect to the AI service. Please try again.');
    } finally {
      setIsSending(false);
    }
  }, [conversationId, isSending]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, []);

  return { messages, isSending, error, sendMessage, startNewChat, clearError: () => setError(null) };
}
