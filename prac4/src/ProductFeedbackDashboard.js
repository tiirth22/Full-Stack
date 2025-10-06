import React, { useState, useEffect } from 'react';
import './ProductFeedbackDashboard.css';

const FEEDBACK_CATEGORIES = ['Excellent', 'Good', 'Average', 'Poor'];

function getFormattedDateTime(dateObj) {
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return `${date} ${time}`;
}

const ProductFeedbackDashboard = () => {
  // Name states
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  // Date/time state
  const [dateTime, setDateTime] = useState(new Date());

  // Feedback counts
  const [feedbackCounts, setFeedbackCounts] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
  });

  // Participant feedback count
  const [participantCount, setParticipantCount] = useState(0);

  // Timer for real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulated crowd feedback
  useEffect(() => {
    const interval = setInterval(() => {
      const category = FEEDBACK_CATEGORIES[Math.floor(Math.random() * FEEDBACK_CATEGORIES.length)];
      setFeedbackCounts(prev => ({ ...prev, [category]: prev[category] + 1 }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle feedback button click
  const handleFeedback = (category) => {
    setFeedbackCounts(prev => ({ ...prev, [category]: prev[category] + 1 }));
    setParticipantCount(count => count + 1);
  };

  // Participant counter controls
  const increment = () => setParticipantCount(count => count + 1);
  const decrement = () => setParticipantCount(count => count - 1);
  const reset = () => setParticipantCount(0);
  const incrementByFive = () => setParticipantCount(count => count + 5);

  return (
    <div className="dashboard-container">
      <div className="greeting-section">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          className="input-field"
        />
        {firstName && surname && (
          <div className="greeting-msg">
            Welcome, {firstName} {surname}!
          </div>
        )}
      </div>

      <div className="datetime-section">
        <span>Current Date & Time: {getFormattedDateTime(dateTime)}</span>
      </div>

      <div className="feedback-panel">
        <h2>Product Feedback</h2>
        <div className="feedback-buttons">
          {FEEDBACK_CATEGORIES.map(cat => (
            <div key={cat} className="feedback-category">
              <button onClick={() => handleFeedback(cat)} className={`feedback-btn ${cat.toLowerCase()}`}>{cat}</button>
              <div className="feedback-count">{feedbackCounts[cat]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="participant-counter">
        <h3>Your Feedback Count: {participantCount}</h3>
        <div className="counter-controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
          <button onClick={incrementByFive}>+5</button>
        </div>
      </div>
    </div>
  );
};

export default ProductFeedbackDashboard;
