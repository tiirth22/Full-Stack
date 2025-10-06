// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
const port = 5000;

// Set up the view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to display the main income form
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// Route to handle the form submission and calculate total income
app.post('/calculate', (req, res) => {
  // Get the income values from the form
  const { income1, income2 } = req.body;

  // Convert inputs to numbers
  const numIncome1 = parseFloat(income1);
  const numIncome2 = parseFloat(income2);

  // Validate the inputs to ensure they are numbers
  if (isNaN(numIncome1) || isNaN(numIncome2)) {
    // If validation fails, re-render the form with an error message
    return res.render('index', { error: 'Please enter valid numbers for both incomes.' });
  }

  // Calculate the total income
  const totalIncome = numIncome1 + numIncome2;

  // Render the result page with the calculated total
  res.render('result', { totalIncome });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
