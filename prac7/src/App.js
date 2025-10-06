import './App.css';
import Sidebar from './Sidebar';
import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App${darkMode ? ' dark' : ''}`}> 
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="main-content" style={{ marginLeft: 230, padding: 32, minHeight: '100vh', background: darkMode ? '#181c23' : '#f7f9fa', color: darkMode ? '#f7f7f7' : '#23272f', transition: 'background 0.3s, color 0.3s' }}>
        <h1>Welcome to the Sidebar Navigation Demo</h1>
        <p>Use the sidebar to navigate, search, and toggle dark/light mode.</p>
      </div>
    </div>
  );
}

export default App;
