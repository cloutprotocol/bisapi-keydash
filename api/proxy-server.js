require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.all('/api/*', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://api.bestinslot.xyz/v3${req.url}`,
      headers: {
        ...req.headers,
        'x-api-key': process.env.API_KEY,
      },
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = (req, res) => {
  app(req, res);
};