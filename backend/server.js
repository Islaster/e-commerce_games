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
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3"

connectDB();

const app = express();

// Security middleware
app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  crossOriginResourcePolicy: false,
}));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhsot:3001'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Enable CORS for the frontend application
app.use(cors(corsOptions));
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
