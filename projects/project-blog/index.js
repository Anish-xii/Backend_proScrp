import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoutes from './routes/admin.routes.js';
import publicRoutes from './routes/public.routes.js';
import cors from 'cors';

dotenv.config();

connectDB();


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', publicRoutes);         // e.g., GET /api/posts
app.use('/api/admin', adminRoutes);   // e.g., POST /api/admin/posts

app.get('/', (req, res) => {
  res.send('Welcome to the Project Blog!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;