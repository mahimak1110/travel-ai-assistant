import React from 'react';
import Icon from './Icon';

const conversations = [
  { title: 'Japan Trip – 10 Days', date: 'Today' },
  { title: 'Italy Vacation', date: 'Yesterday' },
  { title: 'Weekend in Paris', date: 'Aug 29' },
  { title: 'Europe Backpacking', date: 'Aug 24' },
];

export default function Sidebar({ activeTitle, onNewChat, onSelect, onClose }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading"><span>Workspace</span><button className="mobile-close" onClick={onClose}>×</button></div>
      <button className="new-chat-button" onClick={onNewChat}><Icon name="plus" size={18} /> <span>New chat</span><kbd>⌘ K</kbd></button>
      <div className="conversation-label">Recent conversations</div>
      <nav className="conversation-list" aria-label="Recent conversations">
        {conversations.map((conversation) => (
          <button className={`conversation-item ${activeTitle === conversation.title ? 'active' : ''}`} key={conversation.title} onClick={() => onSelect(conversation)}>
            <span className="conversation-icon"><Icon name="compass" size={16} /></span>
            <span className="conversation-details"><strong>{conversation.title}</strong><small>{conversation.date}</small></span>
            <span className="delete-conversation" aria-label={`Delete ${conversation.title}`}><Icon name="trash" size={15} /></span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer"><span className="avatar">MA</span><div><strong>My workspace</strong><small>Free plan</small></div><button className="icon-button" aria-label="Workspace settings"><Icon name="settings" size={17} /></button></div>
    </aside>
  );
}
