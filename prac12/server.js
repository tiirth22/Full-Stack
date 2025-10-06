const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Calculator API endpoint
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  
  // Validate inputs
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Please enter valid numbers' });
  }
  
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);
  let result;
  
  // Perform calculation based on operation
  switch (operation) {
    case 'add':
      result = number1 + number2;
      break;
    case 'subtract':
      result = number1 - number2;
      break;
    case 'multiply':
      result = number1 * number2;
      break;
    case 'divide':
      if (number2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' });
      }
      result = number1 / number2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }
  
  res.json({ result });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});