import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';
import SuggestionCard from '../components/SuggestionCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import Icon from '../components/Icon';
import { useChat } from '../hooks/useChat';

const suggestions = [
  ['✈️', 'Plan a trip to Japan'],
  ['🏨', 'Find hotels in Paris'],
  ['🌤️', "What's the best time to visit Italy?"],
  ['🗺️', 'Create a 7-day Europe itinerary'],
  ['💰', 'Plan a trip under €1500'],
];

export default function ChatPage() {
  const { messages, isSending, error, sendMessage, startNewChat, clearError } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState(null);
  const hasMessages = messages.length > 0;
  const newChat = () => { startNewChat(); setActiveTitle(null); setSidebarOpen(false); };

  return <div className="app-shell">
    <Header onNewChat={newChat} onToggleSidebar={() => setSidebarOpen(true)} />
    <div className={`app-body ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar activeTitle={activeTitle} onNewChat={newChat} onClose={() => setSidebarOpen(false)} onSelect={(conversation) => { setActiveTitle(conversation.title); setSidebarOpen(false); }} />
      {sidebarOpen && <button className="drawer-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close conversations" />}
      <main className="chat-area">
        <div className="chat-scroll">
          {!hasMessages ? <section className="welcome">
            <div className="welcome-icon"><Icon name="compass" size={29} /></div>
            <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
            <h1>Where would you like to go?</h1>
            <p className="welcome-subtitle">Ask me anything about your next trip.</p>
            <div className="suggestions">{suggestions.map(([icon, text]) => <SuggestionCard key={text} icon={icon} onClick={sendMessage}>{text}</SuggestionCard>)}</div>
          </section> : <section className="messages" aria-live="polite">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}{isSending && <LoadingIndicator />}</section>}
        </div>
        <div className="chat-footer">
          {error && <ErrorMessage message={error} onRetry={() => { const last = [...messages].reverse().find((message) => message.role === 'user'); if (last) sendMessage(last.content); }} onDismiss={clearError} />}
          <MessageInput onSend={sendMessage} disabled={isSending} />
        </div>
      </main>
    </div>
  </div>;
}
