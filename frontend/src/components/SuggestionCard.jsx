import React from 'react';
import Icon from './Icon';

export default function SuggestionCard({ icon, children, onClick }) {
  return <button className="suggestion-card" onClick={() => onClick(children)}><span className="suggestion-icon">{icon}</span><span>{children}</span><Icon name="arrow" size={16} /></button>;
}
