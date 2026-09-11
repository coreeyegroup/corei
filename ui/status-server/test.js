const express = require('express');
const app = express();
const PORT = 3000;

app.get('/test', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on http://0.0.0.0:${PORT}`);
});
