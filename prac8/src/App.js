import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/count';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch count from backend on mount
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to connect to backend.');
        setLoading(false);
      });
  }, []);

  // Update backend count
  const updateBackend = async (newCount) => {
    setLoading(true);
    setError('');
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: newCount })
      });
      setCount(newCount);
    } catch {
      setError('Failed to update backend.');
    }
    setLoading(false);
  };

  const increment = () => updateBackend(count + 1);
  const decrement = () => updateBackend(count > 0 ? count - 1 : 0);
  const reset = () => updateBackend(0);

  return (
    <div className="rep-counter-container">
      <h1>Gym Rep Counter</h1>
      {error && <div style={{color:'red', marginBottom:10}}>{error}</div>}
      <div className="rep-display" aria-live="polite">{loading ? '...' : count}</div>
      <div className="button-group">
        <button onClick={decrement} aria-label="Decrease reps" disabled={count === 0 || loading}>-</button>
        <button onClick={increment} aria-label="Increase reps" disabled={loading}>+</button>
      </div>
      <button className="reset-btn" onClick={reset} disabled={count === 0 || loading}>Reset</button>
    </div>
  );
}

export default App;
