import React from 'react';
import { useState } from 'react';
import Icon from './Icon';

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const submit = () => { if (value.trim() && !disabled) { onSend(value); setValue(''); } };
  const handleKeyDown = (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); } };
  return <div className="composer-wrap"><div className="composer"><textarea value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} disabled={disabled} placeholder="Ask me about your next trip..." rows={1} aria-label="Message" /><button className="send-button" onClick={submit} disabled={!value.trim() || disabled} aria-label="Send message"><Icon name="arrow" size={18} /></button></div><div className="composer-note">AI can make mistakes. Check important travel details before you go.</div></div>;
}
