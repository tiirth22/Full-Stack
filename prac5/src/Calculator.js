import React, { useState } from 'react';
import './Calculator.css';

const buttonValues = [
  ['/', '*', '+', 'DEL', 'CLEAR'],
  ['1', '2', '3', '-'],
  ['4', '5', '6', '='],
  ['7', '8', '9', '.'],
  ['0']
];

export default function Calculator() {
  const [input, setInput] = useState('');


  const handleClick = (value) => {
    if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (value === 'CLEAR') {
      setInput('');
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(input).toString();
        setInput(result);
      } catch {
        setInput('Error');
      }
    } else {
      if (input === 'Error') setInput(value);
      else setInput(input + value);
    }
  };

  return (
    <div className="calc-container glass-effect" aria-label="Calculator">

      <div className="calc-display" aria-label="Display">{input || '0'}</div>
      <div className="calc-buttons">
        {buttonValues.flat().map((btn, i) => (
          <button
            key={i}
            aria-label={btn === 'DEL' ? 'Delete' : btn === '=' ? 'Equals' : btn}
            className={`calc-btn ${btn === '=' ? 'equals' : ''} ${['/', '*', '+', '-', 'DEL'].includes(btn) ? 'operator' : ''} ${btn === 'CLEAR' ? 'clear-btn' : ''}`}
            onClick={() => handleClick(btn)}
            tabIndex={0}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
