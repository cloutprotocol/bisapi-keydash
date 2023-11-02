import axios from 'axios';

const apiKey = 'a093400c-fa5f-47ec-9b6c-e4d97003ae77';

const api = axios.create({
  baseURL: 'https://api.bestinslot.xyz/v3',
  headers: {
    'x-api-key': apiKey,
  },
});

export default api;