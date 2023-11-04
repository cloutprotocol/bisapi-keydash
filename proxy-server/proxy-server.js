// proxy-server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // Choose a port for your proxy server

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  next();
});

app.use(express.json());

app.use('/api', (req, res) => {
  const apiUrl = 'https://api.bestinslot.xyz/v3' + req.url;

  const apiKey = process.env.API_KEY;

  axios({
    method: req.method,
    url: apiUrl,
    headers: {
      'x-api-key': apiKey,
    },
    data: req.body,
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(error.response ? error.response.status : 500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});