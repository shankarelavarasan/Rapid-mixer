const { spawn } = require('child_process');
const db = require('../services/database');

const sampleTracks = [
    {
        "id": 1,
        "title": "Upbeat Pop Demo",
        "artist": "Demo Artist",
        "duration": "3:15",
        "bpm": 128,
        "artwork": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        "genre": "Pop",
        "size": "7.5 MB",
        "format": "MP3",
    },
    {
        "id": 2,
        "title": "Chill Hip-Hop",
        "artist": "Sample Beats",
        "duration": "2:58",
        "bpm": 95,
        "artwork": "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        "genre": "Hip-Hop",
        "size": "6.8 MB",
        "format": "MP3",
    },
    {
        "id": 3,
        "title": "Rock Anthem",
        "artist": "Demo Rock",
        "duration": "4:32",
        "bpm": 140,
        "artwork": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
        "genre": "Rock",
        "size": "10.2 MB",
        "format": "WAV",
    },
];

exports.getSampleTracks = (req, res, next) => {
    res.json(sampleTracks);
};

exports.getRecentFiles = (req, res, next) => {
    db.all(`SELECT * FROM recent_files ORDER BY lastAccessed DESC`, [], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.json(rows);
    });
};

exports.uploadAudio = (req, res, next) => {
    if (!req.file) {
        const error = new Error('No file uploaded.');
        error.status = 400;
        return next(error);
    }

    const pythonProcess = spawn('python', ['process_audio.py', req.file.path, 'uploads/stems']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        if (code === 0) {
            const { originalname, path, size } = req.file;
            const format = originalname.split('.').pop();
            db.run(`INSERT INTO recent_files (name, path, size, format) VALUES (?, ?, ?, ?)`,
                [originalname, path, size, format],
                function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({ 
                        message: 'File processed and logged successfully',
                        fileId: this.lastID
                    });
                }
            );
        } else {
            const error = new Error('Error processing audio file.');
            error.status = 500;
            return next(error);
        }
    });
};