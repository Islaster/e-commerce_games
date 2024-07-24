import express from 'express';
import { upload, uploadImage } from '../controllers/uploadController.js';
import multer from 'multer';

const router = express.Router();

router.post('/', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err); // Debug log
      return res.status(500).send({ error: 'Multer error during upload.' });
    } else if (err) {
      console.error('Unknown error during upload:', err); // Debug log
      return res.status(500).send({ error: 'Unknown error during upload.' });
    }

    // Everything went fine
    uploadImage(req, res);
  });
});

export default router;
