import React, { useState } from 'react';
import Icon from './Icon';

const conversations = [
  { title: 'Japan Trip – 10 Days', date: 'Today' },
  { title: 'Italy Vacation', date: 'Yesterday' },
  { title: 'Weekend in Paris', date: 'Aug 29' },
  { title: 'Europe Backpacking', date: 'Aug 24' },
];

export default function Sidebar({ activeTitle, onNewChat, onSelect, onClose }) {
  const [items, setItems] = useState(conversations);
  const deleteConversation = (title) => setItems((current) => current.filter((conversation) => conversation.title !== title));

  return (
    <aside className="sidebar">
      <div className="sidebar-heading"><span>Workspace</span><button className="mobile-close" onClick={onClose}>×</button></div>
      <button className="new-chat-button" onClick={onNewChat} title="Start a new conversation"><Icon name="plus" size={18} /> <span>New chat</span><kbd>⌘ K</kbd></button>
      <div className="conversation-label">Recent conversations</div>
      <nav className="conversation-list" aria-label="Recent conversations">
        {items.map((conversation) => (
          <div className={`conversation-item ${activeTitle === conversation.title ? 'active' : ''}`} key={conversation.title}>
            <button className="conversation-select" onClick={() => onSelect(conversation)} aria-current={activeTitle === conversation.title ? 'page' : undefined}>
            <span className="conversation-icon"><Icon name="compass" size={16} /></span>
            <span className="conversation-details"><strong>{conversation.title}</strong><small>{conversation.date}</small></span>
            </button>
            <button className="delete-conversation" onClick={() => deleteConversation(conversation.title)} aria-label={`Delete ${conversation.title}`} title={`Delete ${conversation.title}`}><Icon name="trash" size={15} /></button>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer"><span className="avatar">MA</span><div><strong>My workspace</strong><small>Free plan</small></div></div>
    </aside>
  );
}
