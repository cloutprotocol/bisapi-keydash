import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;

const api = axios.create({
  baseURL: 'https://api.bestinslot.xyz/v3',
  headers: {
    'x-api-key': apiKey,
  },
});

export default api;