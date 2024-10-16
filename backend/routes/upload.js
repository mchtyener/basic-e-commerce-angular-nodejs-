const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'No file uploaded' });
  }
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    filePath: req.file.filename,
  });
});

module.exports = router;
