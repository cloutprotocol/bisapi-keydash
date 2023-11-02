// proxy-server.js
const express = require('express');
const axios = require('axios');

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

  // Include your API key here (either hardcode it or load it from an environment variable)
  const apiKey = 'a093400c-fa5f-47ec-9b6c-e4d97003ae77'; // Replace with your API key

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