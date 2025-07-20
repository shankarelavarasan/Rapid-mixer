const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // In a real application, you would do more here, like:
  // - Validate the file type
  // - Save file metadata to a database
  // - Trigger some processing

  res.json({ 
    message: 'File uploaded successfully!',
    filename: req.file.filename,
    path: req.file.path
  });
});

module.exports = router;