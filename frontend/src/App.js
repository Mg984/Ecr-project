import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/message');
      const data = await response.json();
      setMessage(data.message + ' (at ' + new Date(data.timestamp).toLocaleTimeString() + ')');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🚀 My Fullstack App</h1>
      <p>Frontend is running! Test the backend connection:</p>
      
      <button onClick={fetchMessage} disabled={loading}>
        {loading ? 'Loading...' : 'Get Message from Backend'}
      </button>
      
      {message && (
        <div className="message">
          <strong>Response:</strong> {message}
        </div>
      )}
    </div>
  );
}

export default App;