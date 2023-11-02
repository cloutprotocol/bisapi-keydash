import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  next();
});

app.use(express.json());

app.all('/api/*', async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});

export default (req: Request, res: Response) => {
  app(req, res);
};