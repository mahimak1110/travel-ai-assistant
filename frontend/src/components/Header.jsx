import React, { useState, useEffect } from 'react';
import Icon from './Icon';

export default function Header({ onNewChat, onToggleSidebar }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <header className="topbar">
            <button className="icon-button menu-button" onClick={onToggleSidebar} aria-label="Open conversations" title="Open conversations">
                <Icon name="menu" />
            </button>
            <div className="brand-mark"><Icon name="compass" size={21} /></div>
            <div className="brand-copy">
                <strong>Travel AI Assistant</strong>
                <span>Your intelligent travel planning companion</span>
            </div>
            <div className="topbar-actions">
                <div className="connection-status"><span className="status-dot" /> <span>AI service online</span></div>

                {/* Theme Toggle Button */}
                <button
                    className="icon-button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
                    title={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
                >
                    <Icon name={isDarkMode ? "sun" : "moon"} size={18} />
                </button>

                <button className="new-chat-top" onClick={onNewChat}><Icon name="plus" size={17} /> New chat</button>
            </div>
        </header>
    );
}