document.addEventListener('DOMContentLoaded', () => {
  const calculatorForm = document.getElementById('calculator-form');
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const operationInput = document.getElementById('operation');
  const operationButtons = document.querySelectorAll('.operation-btn');
  const resultDisplay = document.getElementById('result');
  const errorMessage = document.getElementById('error-message');

  // Set default active operation
  const defaultOperation = operationButtons[0];
  defaultOperation.classList.add('active');
  operationInput.value = defaultOperation.dataset.operation;

  // Handle operation button clicks
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      operationButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update hidden input value
      operationInput.value = button.dataset.operation;
    });
  });

  // Handle form submission
  calculatorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous error message
    errorMessage.textContent = '';
    
    // Get input values
    const num1 = num1Input.value.trim();
    const num2 = num2Input.value.trim();
    const operation = operationInput.value;
    
    // Basic client-side validation
    if (num1 === '' || num2 === '') {
      errorMessage.textContent = 'Please enter both numbers';
      return;
    }
    
    if (isNaN(num1) || isNaN(num2)) {
      errorMessage.textContent = 'Please enter valid numbers, not letters or symbols';
      return;
    }
    
    // Special case for division by zero
    if (operation === 'divide' && parseFloat(num2) === 0) {
      errorMessage.textContent = 'Cannot divide by zero';
      return;
    }
    
    try {
      // Send calculation request to server
      const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ num1, num2, operation })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Display result with animation
        resultDisplay.textContent = '...';
        setTimeout(() => {
          resultDisplay.textContent = data.result;
        }, 300);
      } else {
        // Display error from server
        errorMessage.textContent = data.error || 'Something went wrong';
      }
    } catch (error) {
      errorMessage.textContent = 'Error connecting to server';
      console.error('Error:', error);
    }
  });

  // Add input validation for numbers only
  [num1Input, num2Input].forEach(input => {
    input.addEventListener('input', () => {
      // Clear error when user starts typing again
      errorMessage.textContent = '';
      
      // Visual feedback for invalid input
      if (input.value.trim() !== '' && isNaN(input.value)) {
        input.style.borderColor = '#e63946';
      } else {
        input.style.borderColor = '#118ab2';
      }
    });
  });
});