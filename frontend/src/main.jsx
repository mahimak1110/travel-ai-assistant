import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatPage from './pages/ChatPage';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatPage />
  </React.StrictMode>,
);
