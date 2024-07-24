import AWS from 'aws-sdk';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

console.log('AWS S3 Configuration:', {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.S3_BUCKET
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Alternative S3 client initialization using @aws-sdk/client-s3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

// Multer-S3 configuration for file uploads
const upload = multer({
  storage: multerS3({
    s3: s3Client, // Use the @aws-sdk/client-s3 S3 client
    bucket: process.env.S3_BUCKET,
    metadata: (req, file, cb) => {
      console.log('File metadata:', file); // Debug log
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      console.log('Generating file key:', file); // Debug log
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
  fileFilter(req, file, cb) {
    console.log('Checking file type:', file); // Debug log
    checkFileType(file, cb);
  },
});

const uploadImage = (req, res) => {
  try {
    console.log('File uploaded successfully:', req.file); // Debug log
    const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}`;
    res.status(200).send({ imageUrl: fileUrl });
  } catch (error) {
    console.error('Error uploading image:', error); // Debug log
    res.status(500).send({ error: 'Failed to upload image.' });
  }
};

export { upload, uploadImage };