import React, { useState, useEffect } from 'react';

// Start from the provided current local time
const initialTime = new Date('2025-07-04T12:31:30+05:30');

function Welcome() {
  const [currentTime, setCurrentTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Format date as MM/DD/YYYY
  const formattedDate = `${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()}`;
  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US');

  return (
    <div style={{ textAlign: 'left', margin: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ fontWeight: 'bold' }}>Welcome to CHARUSAT!!!!</h1>
      <h2 style={{ fontWeight: 'bold' }}>It is {formattedDate}</h2>
      <h2 style={{ fontWeight: 'bold' }}>It is {formattedTime}</h2>
    </div>
  );
}

export default Welcome;
