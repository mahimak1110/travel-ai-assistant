import { API_BASE_URL } from '../config/environment';

export async function sendChatMessage({ message, conversationId }) {
  const payload = { message };
  if (conversationId !== null && conversationId !== undefined) {
    payload.conversationId = conversationId;
  }

  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(response.status >= 500 ? 'AI service unavailable' : 'Unable to send message');
  }

  const data = await response.json();
  if (!data || typeof data.response !== 'string') {
    throw new Error('Invalid response from AI service');
  }

  return data;
}
