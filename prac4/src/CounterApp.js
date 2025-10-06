
import React, { useState } from 'react';

function CounterApp() {
    const [count, setCount] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count - 1);
    const handleReset = () => setCount(0);
    const handleIncrementFive = () => setCount(count + 5);
  
    return (
      <div style={{ border: '2px solid #222', maxWidth: 480, margin: '20px auto', padding: 30, borderRadius: 4, fontFamily: 'Arial' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: 20 }}>Count: {count}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 30 }}>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
          <button onClick={handleIncrementFive}>Increment 5</button>
        </div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0 20px' }}>Welcome to CHARUSAT!!!</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div>
            <label style={{ fontWeight: 'bold', marginRight: 8 }}>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ padding: '4px 8px', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', marginRight: 8 }}>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ padding: '4px 8px', fontSize: '1rem' }}
            />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 30, fontSize: '1.2rem' }}>
          <div>First Name: <span style={{ fontWeight: 'normal' }}>{firstName}</span></div>
          <div>Last Name: <span style={{ fontWeight: 'normal' }}>{lastName}</span></div>
        </div>
      </div>
    );
  }
  
  export default CounterApp;
  