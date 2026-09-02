import React from 'react';

export default function ErrorMessage({ message, onRetry, onDismiss }) {
  return <div className="error-message" role="alert"><span>{message}</span><div><button onClick={onRetry}>Try again</button><button onClick={onDismiss} aria-label="Dismiss error">×</button></div></div>;
}
