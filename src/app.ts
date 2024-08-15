import express from 'express';
import connectDB from './utils/connection';
import dotenv from 'dotenv';
import { shortenUrl, getLinkHistory } from './controllers/urlController';
import authRoutes from './routes/authRoutes';
import { protect } from './middlewares/authMiddleware';
import analyticsRoutes from './routes/analyticsRoutes';
import urlRoutes from './routes/urlRoutes';
import { apiLimiter } from './middlewares/rateLimit';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error('Failed to connect to MongoDB:', err.message);
  } else {
    console.error('Failed to connect to MongoDB:', err);
  }
  process.exit(1); // Exit the process with failure
});

app.get('/', (req, res) => {
  res.send('Hello, Scissor URL Shortener!');
});

app.use('/api/auth', apiLimiter, authRoutes);

// Define the /shorten route
app.post('/shorten', protect, shortenUrl);

app.get('/history', protect, getLinkHistory);

app.use('/', apiLimiter, urlRoutes); // Handles short URL redirects and analytics
app.use('/api/analytics', protect, apiLimiter, analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
