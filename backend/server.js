const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'Backend is healthy!' });
});

app.get('/api/message', (req, res) => {
  res.json({ 
    message: 'Hello from Backend!', 
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});