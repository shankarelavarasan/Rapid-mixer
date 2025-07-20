const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const audioController = require('../../controllers/audioController');

// --- Multer Configuration for file uploads ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Note: The path is relative to the project root where server.js is run
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('audio'), audioController.uploadAudio);

router.get('/recent', audioController.getRecentFiles);

router.get('/samples', audioController.getSampleTracks);

module.exports = router;