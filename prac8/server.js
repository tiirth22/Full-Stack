const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let repCount = 0;

app.use(cors());
app.use(express.json());

app.get('/api/count', (req, res) => {
  res.json({ count: repCount });
});

app.post('/api/count', (req, res) => {
  repCount = req.body.count;
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
