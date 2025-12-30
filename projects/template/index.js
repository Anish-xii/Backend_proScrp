import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

connectDB();

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Project Blog!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;