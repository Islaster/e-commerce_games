import "./config.js"
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cors from "cors"
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

connectDB();

const app = express();

// Security middleware
app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  crossOriginResourcePolicy: false,
}));

// Enable CORS for the frontend application
app.use(cors({
  origin: 'https://master--dapper-concha-d7b532.netlify.app'
}));
// Middleware to parse JSON bodies
app.use(express.json());

// Preflight request handling
app.options('*', cors({
  origin: 'https://master--dapper-concha-d7b532.netlify.app',
  optionsSuccessStatus: 200
}));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
