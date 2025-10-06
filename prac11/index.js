// 1. Import the express module
const express = require('express');

// 2. Create an Express application
const app = express();
const port = 3000;

// 3. Define the '/home' route
app.get('/home', (req, res) => {
  // Send a simple greeting message as the response
  res.send('Welcome to the homepage!');
});

// 4. Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
