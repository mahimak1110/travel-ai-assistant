import React from 'react';
import ReactMarkdown from 'react-markdown';
import Icon from './Icon';

export default function ChatMessage({ message }) {
  const isAssistant = message.role === 'assistant';
  return (
    <article className={`message-row ${isAssistant ? 'assistant-row' : 'user-row'}`}>
      {isAssistant && <span className="assistant-avatar"><span className="sparkle">✦</span></span>}
      <div className={`message-bubble ${isAssistant ? 'assistant-bubble' : 'user-bubble'}`}>
        {isAssistant ? <ReactMarkdown>{message.content}</ReactMarkdown> : <p>{message.content}</p>}
      </div>
      {!isAssistant && <span className="user-avatar">You</span>}
    </article>
  );
}
